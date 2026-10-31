import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DEMO_PRESCRIPTIONS, CHATGPT_VS_AROGYA } from '../data/sampleData';
import { compressImage } from '../services/geminiService';
import { PatientHeader } from './PatientHeader';
import { Camera, Upload, MessageSquare, ArrowRight, Sparkles, Building2, Calendar, AlertCircle, RefreshCw, FileText, CheckCircle2, ShieldCheck, HelpCircle, Check, X } from 'lucide-react';

export const ChatIntake = ({ onSelectPrescription, onNavigate, onAnalyzeImage, isAnalyzing, analysisError, onRetry }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file) => {
    setSelectedFile(file);
    try {
      const compressed = await compressImage(file);
      if (compressed) {
        setPreviewUrl(compressed);
        onAnalyzeImage(compressed, file.name);
        return;
      }
    } catch (e) {
      console.warn('Canvas compression skipped, reading as standard DataURL:', e);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      onAnalyzeImage(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-brand-600/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-teal-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Ground Pilot: Visakhapatnam, Andhra Pradesh</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight">
            {t.heroHeadline}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {t.heroSub}
          </p>

          {/* Top Quick Actions (3 Buttons) */}
          <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>{t.scanPrescription}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('hospitals')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-bold backdrop-blur-md transition-all hover:scale-105"
            >
              <Building2 className="w-4 h-4 text-teal-300" />
              <span>{t.checkAarogyasri}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('schedule')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-bold backdrop-blur-md transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>{t.todaysSchedule}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patient Profile & ABHA / White Ration Card Header Widget */}
      <PatientHeader onNavigate={onNavigate} />

      {/* WHY IT MATTERS: 3 Empirical Data Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-rose-600 font-heading">39.4%–43.4%</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">National Health Accounts</span>
          </div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Out-of-Pocket Health Spending</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Medical expenditures drive millions of Indian families into poverty every year.
          </p>
          <a
            href="https://pib.gov.in/PressReleasePage.aspx?PRID=1959775"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] font-semibold text-brand-700 hover:underline pt-1"
          >
            MoHFW / PIB Government Report ↗
          </a>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-amber-600 font-heading">₹2,500+ Cr</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">Andhra Pradesh</span>
          </div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Aarogyasri Hospital Halts</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Private network hospitals in AP repeatedly paused cashless admissions over unpaid dues.
          </p>
          <a
            href="https://www.thehindu.com/news/national/andhra-pradesh/private-network-hospitals-suspend-services-under-aarogyasri-over-pending-dues/article68261386.ece"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] font-semibold text-brand-700 hover:underline pt-1"
          >
            The Hindu News Investigation ↗
          </a>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-brand-700 font-heading">50%+</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">Clinical Audit</span>
          </div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Prescription Illegibility</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Over half of outpatient paper scripts have dosing ambiguity, leading to chemist brand substitution.
          </p>
          <a
            href="https://journals.lww.com/ijms/fulltext/2020/09020/evaluation_of_prescription_writing_errors_in.12.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] font-semibold text-brand-700 hover:underline pt-1"
          >
            Indian Journal of Pharmacology ↗
          </a>
        </div>

      </div>

      {/* WHY NOT CHATGPT / GENERIC AI: Ground Reality Defense Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-[11px] font-bold border border-brand-200 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
              <span>Differentiating Fact: Why General LLMs & Google Lens Fail on the Ground</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
              Why Not Just Use ChatGPT or Google Lens? (సాధారణ AI ఎందుకు సరిపోదు?)
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
              Generic AI models hallucinate illegible dosages, speak robotic textbook Telugu, and are completely blind to live hospital admission desk suspensions in Andhra Pradesh.
            </p>
          </div>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white self-start sm:self-auto flex-shrink-0">
            Ground Truth vs General AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          {CHATGPT_VS_AROGYA.slice(0, 3).map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5 flex flex-col justify-between">
              <h4 className="font-bold text-xs text-slate-900 font-heading flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-600"></span>
                <span>{item.capability}</span>
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-rose-200 text-rose-900 space-y-0.5">
                  <span className="text-[10px] font-bold text-rose-600 uppercase block">ChatGPT / Google Lens</span>
                  <p className="text-[11px] leading-relaxed">{item.chatgpt}</p>
                </div>
                
                <div className="p-2.5 rounded-xl bg-brand-50/80 border border-brand-200 text-brand-950 space-y-0.5">
                  <span className="text-[10px] font-bold text-brand-700 uppercase block">ArogyaAI (Our Platform)</span>
                  <p className="text-[11px] font-medium leading-relaxed">{item.arogya}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Upload Box & WhatsApp Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Prescription Camera & File Drop */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Step 1 — Upload or Snap Prescription</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 font-heading mt-1">
              Decode Handwritten Medical Slip
            </h2>
            <p className="text-xs text-slate-500">
              Upload any phone camera photo of your prescription. Our vision model extracts medicines and converts them into spoken Telugu audio.
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Dropzone Card */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-brand-600 bg-brand-50/60 scale-[1.01]'
                : 'border-slate-300 hover:border-brand-500 hover:bg-slate-50/80 bg-slate-50/40'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto mb-3">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              Tap to capture camera photo or upload image
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPG, PNG or camera snapshots from your phone
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Prescription Photo</span>
            </div>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center gap-3 text-teal-900">
              <RefreshCw className="w-5 h-5 animate-spin text-teal-700" />
              <div className="text-xs">
                <p className="font-bold">Analyzing Prescription with Gemini Multimodal Vision...</p>
                <p className="text-teal-700 text-[11px]">Extracting medicine names, dosages, and synthesizing Telugu audio note...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {analysisError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-900">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span className="text-xs font-medium">{analysisError}</span>
              </div>
              <button
                type="button"
                onClick={onRetry}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Try Pre-loaded Samples (1-Click Test) */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Or Try 1-Click Clinical Demo Samples:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEMO_PRESCRIPTIONS.map((rx) => (
                <button
                  key={rx.id}
                  type="button"
                  onClick={() => onSelectPrescription(rx)}
                  className="text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-brand-500 hover:bg-brand-50/30 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-brand-700 mb-0.5">
                    <span>{rx.title.split(':')[0]}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Sample</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-800 line-clamp-1">
                    {rx.title.split(':')[1] || rx.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {rx.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: WhatsApp Conversational Preview & Main Action */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          
          {/* WhatsApp Window Header */}
          <div className="bg-wa-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-wa-700 font-bold flex items-center justify-center font-heading text-lg">
                ఆ
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">ArogyaAI WhatsApp Bot</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-teal-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Online • Vizag Healthcare Desk</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded-full text-white">
              Official Demo
            </span>
          </div>

          {/* WhatsApp Chat Body */}
          <div className="p-4 chat-bg space-y-3.5 min-h-[340px] flex flex-col justify-end text-xs">
            
            {/* User message */}
            <div className="self-end max-w-[85%] wa-bubble-user text-slate-800 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900">
                <FileText className="w-3.5 h-3.5 text-emerald-800" />
                <span>prescription_anakapalle.jpg</span>
              </div>
              <p className="text-[11px] text-slate-800 leading-relaxed font-sans">
                "Please explain my father's BP & Diabetes medicine schedule in Telugu."
              </p>
              <span className="text-[9px] text-slate-500 float-right font-medium">09:35 AM ✓✓</span>
            </div>

            {/* Bot response */}
            <div className="self-start max-w-[90%] wa-bubble-bot text-slate-900 p-3.5 space-y-2 border border-slate-200/60">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <span className="font-bold text-brand-800 text-xs">ArogyaAI Assistant</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                  96% Confidence
                </span>
              </div>

              {/* Audio player simulation bar */}
              <div className="p-2.5 rounded-xl bg-brand-50/90 border border-brand-200 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectPrescription(DEMO_PRESCRIPTIONS[0])}
                  className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-xs shadow-xs hover:scale-105 active:scale-95 transition-transform"
                  title="Play Telugu Voice Note"
                >
                  ▶
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-brand-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-700 w-2/3"></div>
                  </div>
                  <span className="text-[10px] text-brand-800 font-medium mt-0.5 block font-telugu">
                    వాయిస్ నోట్ వినండి (Telugu Audio • 0:24)
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-800 leading-relaxed font-telugu">
                నమస్కారం! డాక్టర్ గారు 2 మందులు రాశారు: టెల్మిసార్టన్ 40mg (BP కోసం) మరియు మెట్‌ఫార్మిన్ 500mg (షుగర్ కోసం).
              </p>

              <button
                type="button"
                onClick={() => onSelectPrescription(DEMO_PRESCRIPTIONS[0])}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold text-center block shadow-xs transition-colors"
              >
                View Full Decoded Rx Card →
              </button>
            </div>

          </div>

          {/* Persistent Screen Main Action */}
          <div className="p-4 bg-white border-t border-slate-200">
            <a
              href="https://wa.me/918912476400?text=Namaskaram%20ArogyaAI!%20I%20have%20a%20doctor%20prescription%20to%20decode."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-wa-600 hover:bg-wa-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Send a prescription photo or hospital name on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
