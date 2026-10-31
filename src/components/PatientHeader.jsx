import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AbhaCardModal } from './AbhaCardModal';
import { ShieldCheck, CreditCard, ChevronDown, ChevronUp, CheckCircle2, QrCode, FileText, Phone } from 'lucide-react';

export const PatientHeader = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAbhaModalOpen, setIsAbhaModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
      
      {/* Top Main Patient Strip */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Patient Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
            <span>రవ</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                రమేష్ వర్మ <span className="text-slate-500 font-medium text-sm">(Ramesh Varma, 68M)</span>
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>ABHA Active</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
              <span>ABHA: <strong className="text-slate-700 font-mono">12-3456-7890-1234@abdm</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Dist: <strong className="text-slate-700">Visakhapatnam, AP</strong></span>
            </p>
          </div>
        </div>

        {/* Scheme & Card Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* White Ration Card (BPL - బియ్యం కార్డు) */}
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-700 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block leading-none">
                White Ration Card (బియ్యం కార్డు)
              </span>
              <span className="text-xs font-bold text-slate-800 font-mono">
                WAP 0321 8945 2012
              </span>
            </div>
          </div>

          {/* Aarogyasri Trust ₹25L Coverage */}
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block leading-none">
                Aarogyasri Cashless Cover
              </span>
              <span className="text-xs font-black text-emerald-900 font-heading">
                ₹25,00,000 Limit (Active)
              </span>
            </div>
          </div>

          {/* ABDM QR Card Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsAbhaModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105 active:scale-95"
            title="Open ABDM QR Digital Health Card"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>ABDM QR Card</span>
          </button>

          {/* Expand Details Trigger */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors ml-auto md:ml-0"
            title="Toggle ABHA & Scheme Details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Expanded Accordion: ABDM Digital Locker & Scheme Verification Details */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60 animate-fadeIn space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-700" />
                <span>Linked Hospital Records (ABDM)</span>
              </span>
              <p className="text-xs font-bold text-slate-800">
                King George Hospital (KGH) & Care Hospital
              </p>
              <p className="text-[11px] text-slate-600">
                2 Consultations, 1 Echo Doppler, 3 Lipid Profiles synced via ABHA Gateway.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Aarogyasri Pre-Auth Status</span>
              </span>
              <p className="text-xs font-bold text-emerald-800">
                Instant Desk Verification Ready
              </p>
              <p className="text-[11px] text-slate-600">
                BPL White Rice Card validated. Zero out-of-pocket required for 3,257+ listed procedures.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Family Caregiver Sync</span>
              </span>
              <p className="text-xs font-bold text-slate-800">
                WhatsApp Linked (+91 98*** *****)
              </p>
              <p className="text-[11px] text-slate-600">
                Daily audio dosage alerts and missed pill alerts automatically routed to caregiver.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ABDM Official QR Card Modal */}
      <AbhaCardModal
        isOpen={isAbhaModalOpen}
        onClose={() => setIsAbhaModalOpen(false)}
      />

    </div>
  );
};
