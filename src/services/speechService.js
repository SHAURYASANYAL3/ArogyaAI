// Speech Synthesis Service for Spoken Telugu & English Audio Readout

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.voices = [];

    if (this.synth) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return [];
    this.voices = this.synth.getVoices() || [];
    return this.voices;
  }

  hasTeluguVoice() {
    const voices = this.loadVoices();
    return voices.some(v => 
      v.lang.toLowerCase().includes('te') || 
      v.name.toLowerCase().includes('telugu')
    );
  }

  speak(text, lang = 'te-IN', onStart, onEnd, onError) {
    if (!this.synth) {
      if (onError) onError('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.88; // Slower cadence for elderly listeners
    utterance.pitch = 1.0;

    const voices = this.loadVoices();

    // Prioritize Telugu voice, then Indian English, then default
    const teluguVoice = voices.find(v => 
      v.lang.toLowerCase().includes('te') || 
      v.name.toLowerCase().includes('telugu')
    );

    const indianVoice = voices.find(v => 
      v.lang.toLowerCase().includes('en-in') || 
      v.name.toLowerCase().includes('india')
    );

    if (lang.startsWith('te') && teluguVoice) {
      utterance.voice = teluguVoice;
      utterance.lang = teluguVoice.lang;
    } else if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isPlaying = false;
      console.warn('Speech synthesis playback notice:', e);
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
    }
  }
}

export const speechService = new SpeechService();
