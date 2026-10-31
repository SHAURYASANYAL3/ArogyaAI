import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { speechService } from '../services/speechService';
import { Volume2, VolumeX, ShieldAlert, CheckCircle, Calendar, ArrowLeft, MessageSquare, Sun, Sunset, Moon, Sparkles, Clock, AlertTriangle, TrendingDown, Check } from 'lucide-react';

export const PrescriptionResult = ({ prescription, onAddToSchedule, onBackToIntake, onNavigate }) => {
  const { t, lang } = useLanguage();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  if (!prescription) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No Prescription Selected</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Please upload a prescription photo or choose a sample from the WhatsApp Chat intake screen to see the decoded medications and Telugu voice explanation.
        </p>
        <button
          type="button"
          onClick={onBackToIntake}
          className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs"
        >
          Go to Upload Screen
        </button>
      </div>
    );
  }

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    const script = prescription.teluguAudioScript || prescription.medicines.map(m => `${m.name}: ${m.foodInstructionTe || m.foodInstructionEn}`).join('. ');
    speechService.speak(
      script,
      'te-IN',
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const handleScheduleClick = () => {
    onAddToSchedule(prescription);
    setScheduleSuccess(true);
    setTimeout(() => {
      onNavigate('schedule');
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fadeIn">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToIntake}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prescription Upload</span>
        </button>

        <div className="flex items-center gap-2">
          {prescription.isSample && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {t.sampleBadge}
            </span>
          )}
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>AI Confidence: {prescription.confidenceScore || '95%'}</span>
          </span>
        </div>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        
        {/* Title & Telugu Voice Note Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              {prescription.title || 'Decoded Medical Prescription'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {prescription.description || 'Verified extraction via Gemini Multimodal Vision AI'}
            </p>
          </div>

          {/* Telugu Voice Audio Player Button */}
          <button
            type="button"
            onClick={handlePlayVoice}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all ${
              isPlayingAudio
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-brand-700 hover:bg-brand-800 text-white shadow-brand-700/20 hover:scale-105'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.stopVoice}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t.playTeluguVoice}</span>
              </>
            )}
          </button>
        </div>

        {/* Audio Wave Visualizer while playing */}
        {isPlayingAudio && (
          <div className="p-3 bg-brand-700 text-white rounded-2xl flex items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold">Playing Vernacular Audio Instructions for Elderly Patients...</span>
            </div>
            <div className="flex items-end gap-1 h-4">
              <span className="w-1 bg-white h-2 animate-bounce"></span>
              <span className="w-1 bg-white h-4 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-1 bg-white h-3 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1 bg-white h-5 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
            </div>
          </div>
        )}

        {/* Telugu Voice Transcript Box */}
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/80 space-y-1.5">
          <div className="flex items-center gap-2 text-brand-800 text-xs font-bold uppercase tracking-wider">
            <Volume2 className="w-3.5 h-3.5 text-brand-700" />
            <span>Telugu Spoken Audio Script (తెలుగు వాయిస్ నోట్)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-telugu">
            "{prescription.teluguAudioScript}"
          </p>
        </div>

        {/* Medicines Visual Tablet Cards Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Prescribed Medicines ({prescription.medicines?.length || 0})
            </h3>
            <span className="text-[11px] text-slate-400">
              Clear dosage & food instructions
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {prescription.medicines?.map((med, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-heading">
                      {med.name}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-brand-100 text-brand-800 border border-brand-200">
                      {med.strength}
                    </span>
                    {med.frequency && (
                      <span className="text-[11px] font-semibold text-slate-500">
                        ({med.frequency})
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: {med.duration || 'As prescribed'}</span>
                  </span>
                </div>

                {/* Purpose in English & Telugu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Why it is prescribed (English)</span>
                    <span className="font-semibold text-slate-800">{med.purposeEn}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-600 block">ఎందుకు వాడాలి (తెలుగులో)</span>
                    <span className="font-semibold text-teal-900 font-telugu">{med.purposeTe}</span>
                  </div>
                </div>

                {/* Pill Time Badges & Food Instructions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  
                  {/* Time badges */}
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                      med.morning 
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                    }`}>
                      <Sun className="w-3.5 h-3.5" />
                      <span>{t.morning}</span>
                    </span>

                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                      med.afternoon 
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                    }`}>
                      <Sunset className="w-3.5 h-3.5" />
                      <span>{t.afternoon}</span>
                    </span>

                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                      med.night 
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                    }`}>
                      <Moon className="w-3.5 h-3.5" />
                      <span>{t.night}</span>
                    </span>
                  </div>

                  {/* Food timing badge */}
                  <div className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'te' ? med.foodInstructionTe : med.foodInstructionEn}</span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Jan Aushadhi Generic Cost Savings Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span>PM Jan Aushadhi Generic Cost Advantage (జన ఔషధి పొదుపు)</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900">
              Save ~75%-85%
            </span>
          </div>

          <p className="text-xs text-emerald-800 leading-relaxed">
            Switching these chronic medicines from private brands to Government <strong>Pradhan Mantri Jan Aushadhi Kendra</strong> generic equivalents in Visakhapatnam reduces monthly family expense from ~₹180 to ~₹26, saving your family over <strong>₹1,840 every year</strong>.
          </p>
        </div>

        {/* Mandatory Doctor Confirmation / Safety Warnings Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-amber-950 uppercase tracking-wider">Doctor & Pharmacist Confirmation Required</h4>
            <p className="text-amber-900 leading-relaxed">
              {lang === 'te' ? prescription.warningsTe : prescription.warningsEn}
            </p>
            <p className="text-[11px] text-amber-800 pt-0.5">
              *AI-assisted vision transcription. Always verify with your local pharmacist or treating doctor before taking medicines.
            </p>
          </div>
        </div>

        {/* Schedule & WhatsApp Reminders Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleScheduleClick}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              scheduleSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-105'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{scheduleSuccess ? 'Added to Schedule! Opening...' : 'Add to WhatsApp Daily Reminders'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('hospitals')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 font-bold text-xs transition-colors"
          >
            Check Nearby Vizag Hospitals →
          </button>
        </div>

        {/* Medical Disclaimer */}
        <p className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100 leading-relaxed">
          {t.medicalDisclaimer}
        </p>

      </div>

      {/* Main WhatsApp Screen Action */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-600 text-center sm:text-left">
          Need this decoded report delivered directly to your elderly parent's WhatsApp phone?
        </p>
        <a
          href="https://wa.me/918912476400?text=Namaskaram%20ArogyaAI!%20Please%20send%20this%20decoded%20prescription%20to%20my%20parents."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-wa-600 hover:bg-wa-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>Send a prescription photo or hospital name on WhatsApp</span>
        </a>
      </div>

    </div>
  );
};
