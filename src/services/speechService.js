// Native Web Speech Synthesis for Spoken Telugu & English Audio Readout
const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

export const speechService = {
  speak(text, lang = 'te-IN', onStart, onEnd, onError) {
    if (!synth) {
      onError?.('Speech synthesis not supported in this browser.');
      return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.88; // Slower cadence for elderly listeners
    utterance.pitch = 1.0;

    const voices = synth.getVoices() || [];
    const teluguVoice = voices.find(v => v.lang.toLowerCase().includes('te') || v.name.toLowerCase().includes('telugu'));
    const indianVoice = voices.find(v => v.lang.toLowerCase().includes('en-in') || v.name.toLowerCase().includes('india'));

    if (lang.startsWith('te') && teluguVoice) {
      utterance.voice = teluguVoice;
      utterance.lang = teluguVoice.lang;
    } else if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = (e) => {
      console.warn('Speech playback notice:', e);
      onEnd?.();
    };

    synth.speak(utterance);
  },

  stop() {
    synth?.cancel();
  }
};
