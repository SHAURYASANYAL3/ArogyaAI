import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ShieldCheck, QrCode, Download, Share2, CheckCircle2, User, Building2, CreditCard, Heart } from 'lucide-react';

export const AbhaCardModal = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-700 text-white">
              <QrCode className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              ABDM Digital Health Card (ఆయుష్మాన్ భారత్ హెల్త్ కార్డ్)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-6">
          
          {/* Authentic ABDM Health Card UI */}
          <div className="rounded-2xl border-2 border-slate-300 overflow-hidden shadow-md bg-gradient-to-b from-white via-slate-50 to-emerald-50/30">
            
            {/* Government Tricolor Top Bar */}
            <div className="h-2 w-full flex">
              <div className="flex-1 bg-amber-500"></div>
              <div className="flex-1 bg-white"></div>
              <div className="flex-1 bg-emerald-600"></div>
            </div>

            {/* Header Identity */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-white">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  National Health Authority • Govt. of India
                </span>
                <span className="text-xs font-black text-brand-900 font-heading">
                  Ayushman Bharat Health Account (ABHA)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified</span>
              </span>
            </div>

            {/* Card Content Grid */}
            <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Photo & QR */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center font-bold text-xs shadow-inner">
                  <User className="w-8 h-8 text-slate-300" />
                  <span className="text-[10px] text-slate-400 mt-0.5">68 Yrs / M</span>
                </div>
                
                {/* Simulated Scannable QR code */}
                <div className="w-20 h-20 p-1.5 bg-white border border-slate-300 rounded-xl flex items-center justify-center">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-2-2h2v2h-2v-2zm4-4h2v2h-2v-2z"/>
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                  Scan & Share
                </span>
              </div>

              {/* Patient & Scheme Details */}
              <div className="space-y-2.5 text-xs flex-1 w-full">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Name / పేరు</span>
                  <span className="text-base font-black text-slate-900 font-heading">రమేష్ వర్మ (Ramesh Varma)</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">ABHA Number</span>
                    <span className="font-mono font-bold text-slate-800">12-3456-7890-1234</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">ABHA Address</span>
                    <span className="font-mono font-bold text-brand-700">ramesh@abdm</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">White Ration Card</span>
                    <span className="font-mono font-bold text-slate-800">WAP 0321 8945 2012</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 font-bold">
                    <span className="text-[10px] uppercase">Dr. YSR Aarogyasri Cover</span>
                    <span className="text-[11px]">₹25,00,000 (100% Cashless)</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>District: <strong>Visakhapatnam, AP</strong></span>
                  <span>Blood Group: <strong className="text-rose-600">O +ve</strong></span>
                </div>
              </div>

            </div>

            {/* Bottom Hospital Gate Instructions */}
            <div className="px-4 py-2.5 bg-brand-50/80 border-t border-brand-200/60 text-[11px] text-brand-900 flex items-center justify-between">
              <span>Show this at KGH, Care, or SevenHills Aarogya Mithra counter</span>
              <span className="font-bold text-brand-700">Zero Wait Time ↗</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download / Print Health Card</span>
            </button>

            <a
              href="https://wa.me/?text=Namaskaram!%20Here%20is%20my%20ABDM%20Health%20Card%20and%20Aarogyasri%20Number%20for%20cashless%20admission:%20ABHA%2012-3456-7890-1234@abdm%20(Ramesh%20Varma)."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-wa-600 hover:bg-wa-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
