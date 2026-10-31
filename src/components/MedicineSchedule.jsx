import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { speechService } from '../services/speechService';
import { Check, Clock, Volume2, Sun, Sunset, Moon, Bell, MessageSquare, Share2, User, Heart, Activity, CheckCircle2 } from 'lucide-react';

export const MedicineSchedule = ({ schedule, onToggleDoseTaken, onNavigate }) => {
  const { t, lang } = useLanguage();
  const [isPlayingTestAudio, setIsPlayingTestAudio] = useState(false);
  const [activeProfile, setActiveProfile] = useState('father'); // 'father' | 'mother'

  // Filter schedule based on active profile or display all with profile tag
  const totalDoses = schedule.length;
  const takenCount = schedule.filter(item => item.taken).length;
  const percentage = totalDoses > 0 ? Math.round((takenCount / totalDoses) * 100) : 0;

  const handleSimulateWhatsAppPing = () => {
    setIsPlayingTestAudio(true);
    const audioText = lang === 'te' 
      ? 'నమస్కారం! ఇది మీ ఆరోగ్యAI వాట్సాప్ రిమైండర్. ఉదయం బీపీ మరియు షుగర్ మాత్రలు వేసుకునే సమయం అయింది. దయచేసి టిఫిన్ తర్వాత మందులు వేసుకోండి.'
      : 'Namaskaram! This is your ArogyaAI WhatsApp reminder. It is time to take your morning BP and Diabetes medicines after breakfast.';
    
    speechService.speak(
      audioText,
      lang === 'te' ? 'te-IN' : 'en-IN',
      () => setIsPlayingTestAudio(true),
      () => setIsPlayingTestAudio(false),
      () => setIsPlayingTestAudio(false)
    );
  };

  // Generate real WhatsApp sharing text
  const profileLabel = activeProfile === 'father' 
    ? (lang === 'te' ? 'నాన్నగారు (Father)' : 'Father (Father - BP/Diabetes)') 
    : (lang === 'te' ? 'అమ్మగారు (Mother)' : 'Mother (Mother - Thyroid/Vitamins)');

  const whatsappShareText = encodeURIComponent(
    `*ఆరోగ్యAI (ArogyaAI) - నేటి మందుల షెడ్యూల్*\n` +
    `పేషెంట్: ${profileLabel}\n` +
    `తేదీ: ${new Date().toLocaleDateString('te-IN')}\n\n` +
    (schedule.length === 0 
      ? 'ప్రస్తుతం మందులు షెడ్యూల్ చేయబడలేదు.' 
      : schedule.map((item, i) => 
          `${i + 1}. *${item.name}* (${item.strength})\n` +
          `⏰ సమయం: ${item.scheduledTime} (${item.foodInstructionTe || item.foodInstructionEn})\n` +
          `స్థితి: ${item.taken ? '✅ వేసుకున్నారు (Taken)' : '⏳ ఇంకా వేసుకోలేదు (Due)'}`
        ).join('\n\n')
    ) +
    `\n\n_పంపినవారు: ArogyaAI WhatsApp Health Ally, Visakhapatnam_`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fadeIn">
      
      {/* Schedule Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-[11px] font-bold border border-brand-200 mb-2">
              <Bell className="w-3.5 h-3.5 text-brand-700 animate-bounce" />
              <span>WhatsApp Daily Audio Alerts Active</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 font-heading">
              {t.todaysSchedule}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Automated daily Telugu voice pings sent to your registered WhatsApp number for elderly parents in Vizag.
            </p>
          </div>

          {/* Adherence Progress Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center sm:text-right flex-shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Today's Adherence</span>
            <div className="flex items-baseline justify-center sm:justify-end gap-1.5 mt-0.5">
              <span className="text-2xl font-black text-brand-700 font-heading">{takenCount}/{totalDoses}</span>
              <span className="text-xs font-bold text-slate-600">Doses Taken ({percentage}%)</span>
            </div>
            <div className="w-36 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden mx-auto sm:ml-auto sm:mr-0">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Multi-Patient Profile Selector */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Patient Profile:</span>
            </span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveProfile('father')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeProfile === 'father'
                    ? 'bg-white text-brand-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                నాన్నగారు (Father)
              </button>
              <button
                type="button"
                onClick={() => setActiveProfile('mother')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeProfile === 'mother'
                    ? 'bg-white text-brand-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                అమ్మగారు (Mother)
              </button>
            </div>
          </div>

          {/* Share on WhatsApp Button */}
          <a
            href={`https://api.whatsapp.com/send?text=${whatsappShareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-wa-600 hover:bg-wa-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Schedule on WhatsApp</span>
          </a>
        </div>

        {/* WhatsApp Test Voice Reminder Trigger */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            Want to test how the Telugu audio reminder sounds on your parents' phone?
          </p>
          <button
            type="button"
            onClick={handleSimulateWhatsAppPing}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all ${
              isPlayingTestAudio 
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingTestAudio ? 'Playing Telugu Audio Note...' : 'Simulate WhatsApp Voice Ping (టెస్ట్ చేయండి)'}</span>
          </button>
        </div>
      </div>

      {/* AyuVani Integrated Vitals Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Activity className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-950 font-heading">
                  Morning Vitals Tracker (ఆరోగ్య సూచీలు)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Normal • ఆదర్శం
                </span>
              </div>
              <p className="text-xs text-emerald-800/80">
                Recorded post morning walk. Controlled under Telmisartan 40mg.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 self-start sm:self-auto">
            Today 07:45 AM • Beach Road, Vizag
          </span>
        </div>

        {/* 4 Key Vitals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Blood Pressure
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 font-heading">124/82</span>
              <span className="text-[10px] font-semibold text-slate-500">mmHg</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Target &lt; 130/85</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Fasting Glucose
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 font-heading">112</span>
              <span className="text-[10px] font-semibold text-slate-500">mg/dL</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Controlled</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Pulse Rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 font-heading">72</span>
              <span className="text-[10px] font-semibold text-slate-500">bpm</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <Heart className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>Resting Regular</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Oxygen (SpO2)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 font-heading">98%</span>
              <span className="text-[10px] font-semibold text-slate-500">Room Air</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Optimal</span>
            </span>
          </div>

        </div>
      </div>

      {/* Doses Timeline List */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          Scheduled Doses for Today ({profileLabel})
        </h3>

        {schedule.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
            <Clock className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No Active Medicines in Schedule</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Scan a prescription or pick a sample prescription from the Home screen to automatically populate your parent's daily dosing schedule.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('chat')}
              className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Scan a Prescription Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {schedule.map((item) => (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  item.taken
                    ? 'bg-emerald-50/50 border-emerald-200 opacity-90'
                    : 'bg-white border-slate-200 hover:border-brand-500 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-xl flex items-center justify-center font-bold text-xs ${
                    item.timeSlot === 'morning' ? 'bg-amber-100 text-amber-800' :
                    item.timeSlot === 'afternoon' ? 'bg-orange-100 text-orange-800' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {item.timeSlot === 'morning' ? <Sun className="w-5 h-5" /> :
                     item.timeSlot === 'afternoon' ? <Sunset className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-slate-900 font-heading">
                        {item.name}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {item.strength}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {item.scheduledTime}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-600">
                      {lang === 'te' ? item.purposeTe : item.purposeEn} • <span className="text-emerald-700 font-bold">{lang === 'te' ? item.foodInstructionTe : item.foodInstructionEn}</span>
                    </p>
                  </div>
                </div>

                {/* Mark as Taken Button */}
                <button
                  type="button"
                  onClick={() => onToggleDoseTaken(item.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    item.taken
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-105'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{item.taken ? t.pillTaken : t.markTaken}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Screen Action */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-600 text-center sm:text-left">
          Caregiver WhatsApp Alerts synced with your phone number (+91 98*** *****).
        </p>
        <a
          href="https://wa.me/918912476400?text=Namaskaram%20ArogyaAI!%20Update%20my%20parent%20daily%20schedule."
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
