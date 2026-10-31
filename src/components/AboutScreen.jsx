import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CHATGPT_VS_AROGYA, PM_JAN_AUSHADHI_VIZAG_KENDRAS } from '../data/sampleData';
import { ShieldAlert, Users, Award, Landmark, TrendingUp, Trash2, MessageSquare, ExternalLink, Sparkles, Building2, HeartHandshake, MapPin, Phone, Clock, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export const AboutScreen = ({ stats, onClearData }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fadeIn">
      
      {/* Pitch Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white shadow-xl space-y-4 border border-brand-700/50">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-white/20 text-teal-200 backdrop-blur-md">
            Alpha Developer • Visakhapatnam
          </span>
          <span className="text-xs font-semibold text-slate-300">
            October 2026 Innovation Model
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
          ArogyaAI: Ground Truth & Telugu Voice Care
        </h1>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
          ArogyaAI is a zero-install WhatsApp health ally that confirms real-time Aarogyasri hospital desk acceptance in Andhra Pradesh before you travel and turns prescription photos into spoken Telugu daily medication reminders.
        </p>

        {/* What makes us different */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1 mt-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
            What Makes Us Different:
          </span>
          <p className="text-xs sm:text-sm text-teal-50 font-medium leading-relaxed">
            "None provide real-time ground verification of private hospital scheme desk acceptance paired with native Telugu voice prescription instructions."
          </p>
        </div>
      </div>

      {/* Live Tracked Stats Strip */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          Platform Activity & Traction Metrics (Visakhapatnam Pilot)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block">Prescriptions Decoded</span>
            <span className="text-2xl font-black text-slate-900 font-heading mt-1 block">
              {stats.prescriptionsDecoded} <span className="text-xs font-semibold text-emerald-600">Scripts</span>
            </span>
            <span className="text-[10px] text-slate-400">Gemini Vision OCR extraction</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block">Active Reminded Patients (WARP)</span>
            <span className="text-2xl font-black text-brand-700 font-heading mt-1 block">
              {stats.activeRemindedPatients} <span className="text-xs font-semibold text-teal-600">Patients</span>
            </span>
            <span className="text-[10px] text-slate-400">Weekly active reminded caregivers</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block">Aarogyasri Hospital Desk Queries</span>
            <span className="text-2xl font-black text-amber-600 font-heading mt-1 block">
              {stats.hospitalDeskQueries} <span className="text-xs font-semibold text-amber-600">Lookups</span>
            </span>
            <span className="text-[10px] text-slate-400">15 Vizag hospitals tracked daily</span>
          </div>
        </div>
      </div>

      {/* The Problem & Evidence */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
            The Healthcare Problem in Andhra Pradesh
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Families in Andhra Pradesh face medical debt and confusion because they cannot verify whether private hospitals are actively accepting Aarogyasri cards before admission and struggle to manage daily medicines from illegible prescriptions.
          </p>
        </div>

        {/* 3 Real Evidence Citations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xl font-black text-rose-600 font-heading">39.4%–43.4%</span>
            <h4 className="text-xs font-bold text-slate-800">Out-of-Pocket Expenditure</h4>
            <p className="text-xs text-slate-600">
              Out-of-pocket spending forms 39.4%–43.4% of total health expenditure in India.
            </p>
            <a
              href="https://pib.gov.in/PressReleasePage.aspx?PRID=1959775"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-brand-700 hover:underline inline-flex items-center gap-1"
            >
              <span>MoHFW NHA Report</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xl font-black text-amber-600 font-heading">₹2,500+ Cr</span>
            <h4 className="text-xs font-bold text-slate-800">Hospital Scheme Pauses</h4>
            <p className="text-xs text-slate-600">
              AP private network hospitals repeatedly halted cashless Aarogyasri admissions over ₹2,500+ Cr unpaid dues.
            </p>
            <a
              href="https://www.thehindu.com/news/national/andhra-pradesh/private-network-hospitals-suspend-services-under-aarogyasri-over-pending-dues/article68261386.ece"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-brand-700 hover:underline inline-flex items-center gap-1"
            >
              <span>The Hindu Investigation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xl font-black text-teal-700 font-heading">50%+</span>
            <h4 className="text-xs font-bold text-slate-800">Prescription Ambiguity</h4>
            <p className="text-xs text-slate-600">
              Over 50% of outpatient paper prescriptions have illegibility or dosing ambiguity.
            </p>
            <a
              href="https://journals.lww.com/ijms/fulltext/2020/09020/evaluation_of_prescription_writing_errors_in.12.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-brand-700 hover:underline inline-flex items-center gap-1"
            >
              <span>Indian J. Pharmacology</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Business Model Summary */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-800 uppercase tracking-wider block text-[11px]">Primary Users (Free)</span>
            <p className="text-slate-600">
              Working adult caregivers (ages 25–40) in Visakhapatnam managing healthcare and chronic medicines for aging parents.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-brand-800 uppercase tracking-wider block text-[11px]">Who Pays Later (B2B2C)</span>
            <p className="text-slate-600">
              Local private hospitals, nursing homes, and diagnostic lab chains via B2B2C lead facilitation (₹350/inpatient lead) and diagnostic test referral commissions (10%–15%). Free for patients.
            </p>
          </div>
        </div>
      </div>

      {/* WHY GENERAL AI (CHATGPT / GOOGLE LENS) CANNOT SOLVE THIS */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-[11px] font-bold border border-brand-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
            <span>Competitive Defense & Moat</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 font-heading">
            Why Generic AI (ChatGPT / Google Lens) Fails on the Ground
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Judges and investors often ask: <em>"Can't someone just upload this prescription to ChatGPT or Google Lens?"</em> Here is why general-purpose foundation models fail in Andhra Pradesh:
          </p>
        </div>

        <div className="space-y-3">
          {CHATGPT_VS_AROGYA.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-heading flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-700"></span>
                <span>{item.capability}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-white border border-rose-200 text-rose-950 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-700 font-bold uppercase text-[10px]">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>ChatGPT / Google Lens</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">{item.chatgpt}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-300 text-emerald-950 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ArogyaAI (Our Ground Platform)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-800">{item.arogya}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VISAKHAPATNAM PM JAN AUSHADHI KENDRAS DIRECTORY */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Government Affiliated Generic Drug Access</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 font-heading">
              Pradhan Mantri Jan Aushadhi Kendras in Visakhapatnam
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verified physical generic medicine counters across Vizag providing 75%–85% price discounts on chronic medications.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-600 text-white self-start sm:self-auto flex-shrink-0">
            4 Vizag Outlets
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {PM_JAN_AUSHADHI_VIZAG_KENDRAS.map((kendra) => (
            <div key={kendra.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-500 transition-all space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">{kendra.name}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 flex-shrink-0">
                  {kendra.distance}
                </span>
              </div>
              <p className="text-xs text-slate-600 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-700 flex-shrink-0 mt-0.5" />
                <span>{kendra.address}</span>
              </p>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{kendra.timing}</span>
                </span>
                <a href={`tel:${kendra.phone}`} className="font-bold text-brand-700 hover:underline inline-flex items-center gap-1 text-[11px]">
                  <Phone className="w-3 h-3" />
                  <span>{kendra.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Data & Reset */}
      <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-800">Manage Stored Local Data</h4>
          <p className="text-xs text-slate-500">
            All your scanned prescriptions and daily schedules are kept securely in browser localStorage.
          </p>
        </div>

        <button
          type="button"
          onClick={onClearData}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-slate-200 hover:border-rose-300 text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
        >
          <Trash2 className="w-4 h-4 text-rose-600" />
          <span>{t.clearData}</span>
        </button>
      </div>

      {/* Screen Main Action */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-600 text-center sm:text-left">
          Have questions or want to partner with the Alpha Developer team in Visakhapatnam?
        </p>
        <a
          href="https://wa.me/918912476400?text=Namaskaram%20Alpha%20Developer%20team!%20I%20would%20like%20to%20learn%20more%20about%20ArogyaAI."
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
