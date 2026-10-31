import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquare, FileText, Building2, Calendar, Info, Globe, Key, Menu, X } from 'lucide-react';

export const Navbar = ({ activeScreen, setActiveScreen, onOpenApiKeyModal }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'chat', label: t.navIntake, icon: MessageSquare },
    { id: 'decoded', label: t.navDecoded, icon: FileText },
    { id: 'hospitals', label: t.navHospitals, icon: Building2 },
    { id: 'schedule', label: t.navSchedule, icon: Calendar },
    { id: 'about', label: t.navAbout, icon: Info }
  ];

  const handleNav = (id) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => handleNav('chat')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-brand-700 to-brand-800 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              <span className="font-heading">ఆ</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
                  Arogya<span className="text-brand-700">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded-md border border-brand-200">
                  Vizag Pilot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Andhra Health & Aarogyasri Navigator
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-brand-800 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* ABHA Linkage Status Pill */}
            <div 
              onClick={() => handleNav('chat')}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold text-emerald-800 cursor-pointer transition-colors"
              title="ABDM ABHA Health ID Linked: 12-3456-7890-1234@abdm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>ABHA: 12-3456-7890-1234@abdm</span>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              title="Switch language between English and Telugu"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-brand-700" />
              <span>{lang === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>

            {/* API Key Modal Trigger */}
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              title="Configure Gemini API Key"
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors hidden sm:block"
            >
              <Key className="w-4 h-4 text-amber-600" />
            </button>

            {/* Persistent WhatsApp Call-To-Action */}
            <a
              href="https://wa.me/918912476400?text=Namaskaram%20ArogyaAI!%20I%20want%20to%20decode%20a%20prescription%20and%20check%20Aarogyasri%20hospitals%20in%20Vizag."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-wa-600 hover:bg-wa-700 text-white text-xs font-bold shadow-md shadow-wa-600/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{t.sendOnWhatsApp}</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1.5 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-800 border border-brand-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-700' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => { onOpenApiKeyModal(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 px-3 py-2 rounded-lg bg-slate-100"
            >
              <Key className="w-4 h-4 text-amber-600" />
              <span>Gemini API Settings</span>
            </button>
            
            <a
              href="https://wa.me/918912476400"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-wa-600 text-white text-xs font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}

      {/* Mobile Floating Bottom Dock (Stitch & UI-UX Pro Max UX Pattern) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'text-brand-700 font-bold scale-105' 
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-700 stroke-[2.5]' : 'text-slate-400 stroke-2'}`} />
              <span className="text-[10px] mt-0.5 leading-none line-clamp-1">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
