import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Phone, CheckCircle2, XCircle, Clock, MapPin, Building2, Filter, ShieldCheck, MessageSquare, AlertCircle, Siren, Edit3, Check, X } from 'lucide-react';

export const HospitalTracker = ({ hospitals, onCallDesk, onUpdateHospitalStatus }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | paused
  const [selectedArea, setSelectedArea] = useState('all');
  
  // Reporting Modal State
  const [reportingHospital, setReportingHospital] = useState(null);
  const [reportStatus, setReportStatus] = useState('Active');
  const [reportSuccess, setReportSuccess] = useState(false);

  const areas = ['all', ...Array.from(new Set(hospitals.map(h => h.area)))];

  const filteredHospitals = hospitals.filter(h => {
    const matchesSearch = 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && h.aarogyasriStatus.toLowerCase().includes('active')) ||
      (statusFilter === 'paused' && h.aarogyasriStatus.toLowerCase().includes('paused'));

    const matchesArea = selectedArea === 'all' || h.area === selectedArea;

    return matchesSearch && matchesStatus && matchesArea;
  });

  const handleOpenReportModal = (hosp) => {
    setReportingHospital(hosp);
    setReportStatus(hosp.aarogyasriStatus.includes('Active') ? 'Paused (Quota Full)' : 'Active');
    setReportSuccess(false);
  };

  const handleSaveReport = () => {
    if (!reportingHospital) return;
    const now = new Date();
    const timeStr = `Today ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    if (onUpdateHospitalStatus) {
      onUpdateHospitalStatus(reportingHospital.id, reportStatus, timeStr);
    }
    
    setReportSuccess(true);
    setTimeout(() => {
      setReportingHospital(null);
      setReportSuccess(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fadeIn">
      
      {/* Emergency Helpline Strip */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-rose-800 font-bold">
          <Siren className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>Andhra Pradesh 24/7 Medical Emergency Helplines:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:108"
            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold inline-flex items-center gap-1 shadow-xs transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>108 (Free Ambulance)</span>
          </a>
          <a
            href="tel:104"
            className="px-3 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold border border-rose-300 inline-flex items-center gap-1 transition-colors"
          >
            <Phone className="w-3 h-3 text-rose-700" />
            <span>104 (Health Advice)</span>
          </a>
          <a
            href="tel:18004251818"
            className="px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-300 inline-flex items-center gap-1 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            <span>1800 425 1818 (Aarogyasri Trust)</span>
          </a>
        </div>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-Time Desk Audit • Visakhapatnam District</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 font-heading">
              Vizag Hospital Aarogyasri Status Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
              Check whether private network hospitals in Visakhapatnam are actively processing Aarogyasri government health scheme admissions today before you travel.
            </p>
          </div>

          <div className="text-right sm:text-left flex-shrink-0">
            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Hospitals Monitored</span>
            <span className="text-2xl font-black text-brand-700 font-heading">15 Facilities</span>
          </div>
        </div>

        {/* ABHA & Aarogyasri Desk Readiness Tip */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">
              డాక్యుమెంట్ చెక్‌లిస్ట్ (Hospital Desk Requirements for Cashless Care):
            </p>
            <p className="text-amber-800 leading-relaxed">
              క్యాష్‌లెస్ అడ్మిషన్ కోసం <strong>White Ration Card (బియ్యం కార్డు)</strong> లేదా <strong>Aarogyasri Card</strong>, పేషెంట్ ఆధార్ కార్డు మరియు <strong>ABHA ID</strong> వెంట తీసుకువెళ్లండి.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-12 gap-3 border-t border-slate-100">
          
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hospital name, area, or specialty (e.g., Maharanipeta, Cardiac, Knee)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium text-slate-700"
            >
              <option value="all">All Scheme Statuses</option>
              <option value="active">Active Admitting Only ✓</option>
              <option value="paused">Paused / Quota Full ✕</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium text-slate-700"
            >
              <option value="all">All Vizag Areas</option>
              {areas.filter(a => a !== 'all').map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Hospital List Cards */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredHospitals.length} of {hospitals.length} monitored hospitals</span>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Ground-verified via daily telephone & counter audit
          </span>
        </div>

        {filteredHospitals.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No Hospitals Match Your Query</h4>
            <p className="text-xs text-slate-400">Try adjusting your area filter or search keyword.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); setSelectedArea('all'); }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHospitals.map((hosp) => {
              const isActive = hosp.aarogyasriStatus.toLowerCase().includes('active');
              return (
                <div
                  key={hosp.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    
                    {/* Status Badge & Verified Time */}
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {isActive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        <span>Aarogyasri: {hosp.aarogyasriStatus}</span>
                      </span>

                      <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-300" />
                        <span>{hosp.verifiedTime}</span>
                      </span>
                    </div>

                    {/* Hospital Name & Area */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug font-heading">
                        {hosp.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                        <span>{hosp.area}, Visakhapatnam</span>
                      </p>
                    </div>

                    {/* Specialties Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hosp.specialties?.map((spec, i) => (
                        <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {spec}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions: Direct Desk Dial & Report Status Update */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenReportModal(hosp)}
                      className="text-[11px] font-bold text-slate-500 hover:text-brand-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Update this desk status based on real ground report"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Report Status (అప్‌డేట్)</span>
                    </button>

                    <a
                      href={`tel:${hosp.phone}`}
                      onClick={() => onCallDesk && onCallDesk(hosp)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                        isActive
                          ? 'bg-brand-700 hover:bg-brand-800 text-white'
                          : 'bg-slate-800 hover:bg-slate-900 text-white'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t.dialDesk}</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Action Banner */}
      <div className="p-5 bg-gradient-to-r from-wa-700 to-emerald-800 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-base font-heading">
            Heading to a hospital in Vizag right now?
          </h4>
          <p className="text-xs text-teal-100">
            Message the hospital name on WhatsApp for instant counter guidance and pre-auth document verification.
          </p>
        </div>

        <a
          href="https://wa.me/918912476400?text=Namaskaram%20ArogyaAI!%20I%20am%20visiting%20a%20hospital%20in%20Vizag%20under%20Aarogyasri."
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl bg-white text-wa-700 hover:bg-teal-50 font-bold text-xs shadow-md flex items-center gap-2 flex-shrink-0 transition-transform hover:scale-105"
        >
          <MessageSquare className="w-4 h-4 fill-wa-700" />
          <span>Send a prescription photo or hospital name on WhatsApp</span>
        </a>
      </div>

      {/* Live Desk Status Report Modal */}
      {reportingHospital && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Update Hospital Desk Status
              </h3>
              <button
                type="button"
                onClick={() => setReportingHospital(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 block uppercase">Facility</span>
              <p className="text-sm font-bold text-slate-800">{reportingHospital.name} ({reportingHospital.area})</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Current Ground Status observed at Aarogyasri desk:
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setReportStatus('Active')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    reportStatus === 'Active'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Active Admitting</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportStatus('Paused (Quota Full)')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    reportStatus !== 'Active'
                      ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Paused / Full</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportingHospital(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveReport}
                disabled={reportSuccess}
                className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                {reportSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Status Updated!</span>
                  </>
                ) : (
                  <span>Publish Ground Update</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
