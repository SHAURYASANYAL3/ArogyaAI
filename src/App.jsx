import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { ChatIntake } from './components/ChatIntake';
import { PrescriptionResult } from './components/PrescriptionResult';
import { HospitalTracker } from './components/HospitalTracker';
import { MedicineSchedule } from './components/MedicineSchedule';
import { AboutScreen } from './components/AboutScreen';
import { ApiKeyModal } from './components/ApiKeyModal';
import { INITIAL_HOSPITALS, DEMO_PRESCRIPTIONS, INITIAL_STATS } from './data/sampleData';
import { analyzePrescriptionWithGemini } from './services/geminiService';

function ArogyaApp() {
  const { t } = useLanguage();

  // Navigation State
  const [activeScreen, setActiveScreen] = useState('chat'); // chat | decoded | hospitals | schedule | about
  
  // API Key State
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('arogya_gemini_key') || '');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Active Prescription State
  const [activePrescription, setActivePrescription] = useState(() => {
    const saved = localStorage.getItem('arogya_current_rx');
    return saved ? JSON.parse(saved) : DEMO_PRESCRIPTIONS[0];
  });

  // Hospitals State (15 Vizag Hospitals)
  const [hospitals, setHospitals] = useState(() => {
    const saved = localStorage.getItem('arogya_hospitals');
    return saved ? JSON.parse(saved) : INITIAL_HOSPITALS;
  });

  // Scheduled Doses State (Default AyuVani 4-dose daily regimen)
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('arogya_schedule');
    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'dose-1',
        name: 'Telmisartan',
        strength: '40mg',
        purposeEn: 'Blood Pressure Control (Hypertension)',
        purposeTe: 'రక్తపోటు (బీపీ) అదుపు కోసం',
        scheduledTime: '08:00 AM',
        timeSlot: 'morning',
        foodInstructionEn: 'After breakfast',
        foodInstructionTe: 'ఉదయం టిఫిన్ తర్వాత',
        taken: true
      },
      {
        id: 'dose-2',
        name: 'Metformin ER',
        strength: '500mg',
        purposeEn: 'Blood Sugar Control (Type-2 Diabetes)',
        purposeTe: 'షుగర్ అదుపు కోసం',
        scheduledTime: '08:30 AM',
        timeSlot: 'morning',
        foodInstructionEn: '15 mins before food',
        foodInstructionTe: 'భోజనానికి 15 నిమిషాల ముందు',
        taken: true
      },
      {
        id: 'dose-3',
        name: 'Ashwagandha Rasayana',
        strength: '1 Spoon',
        purposeEn: 'AYUSH Vitality & Stress Reduction',
        purposeTe: 'ఒత్తిడి తగ్గింపు మరియు రోగనిరోధక శక్తి (ఆయుష్)',
        scheduledTime: '05:30 PM',
        timeSlot: 'afternoon',
        foodInstructionEn: 'With lukewarm milk',
        foodInstructionTe: 'గోరువెచ్చని పాలతో',
        taken: false
      },
      {
        id: 'dose-4',
        name: 'Calcium + Vit D3',
        strength: '500mg',
        purposeEn: 'Bone Density & Joint Strength',
        purposeTe: 'ఎముకల బలం మరియు కీళ్ల ఆరోగ్యం కోసం',
        scheduledTime: '09:00 PM',
        timeSlot: 'night',
        foodInstructionEn: 'After dinner',
        foodInstructionTe: 'రాత్రి భోజనం తర్వాత',
        taken: false
      }
    ];
  });

  // Tracked Stats State
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('arogya_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  // Vision AI Loading & Error State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [lastUploadedPayload, setLastUploadedPayload] = useState(null);

  // Defensive LocalStorage Sync with Quota Protection
  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Storage quota exceeded or restricted for key: ${key}`, err);
      // If prescription payload has large base64 data, strip it and persist structured metadata
      if (key === 'arogya_current_rx' && value && typeof value === 'object') {
        try {
          const { base64Image, previewUrl, ...sanitized } = value;
          localStorage.setItem(key, JSON.stringify(sanitized));
        } catch {
          // In-memory fallback
        }
      }
    }
  };

  // Sync state to localStorage safely
  useEffect(() => {
    if (activePrescription) {
      safeSetItem('arogya_current_rx', activePrescription);
    }
  }, [activePrescription]);

  useEffect(() => {
    safeSetItem('arogya_hospitals', hospitals);
  }, [hospitals]);

  useEffect(() => {
    safeSetItem('arogya_schedule', schedule);
  }, [schedule]);

  useEffect(() => {
    safeSetItem('arogya_stats', stats);
  }, [stats]);

  // Handle Prescription Image Analysis
  const handleAnalyzeImage = async (base64Image, filename) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setLastUploadedPayload({ base64Image, filename });

    try {
      const extracted = await analyzePrescriptionWithGemini({
        base64Image,
        textSnippet: filename,
        apiKey
      });

      const newRx = {
        id: `rx-${Date.now()}`,
        title: `Uploaded: ${filename || 'Doctor Prescription'}`,
        description: 'Processed via Gemini Multimodal Vision OCR',
        ...extracted,
        isSample: false
      };

      setActivePrescription(newRx);
      setIsAnalyzing(false);
      
      // Update statistics
      setStats(prev => ({
        ...prev,
        prescriptionsDecoded: prev.prescriptionsDecoded + 1
      }));

      // Navigate to Decoded Result Screen
      setActiveScreen('decoded');
    } catch (err) {
      setIsAnalyzing(false);
      setAnalysisError(err.message || 'Unable to analyze prescription image. Please try again.');
    }
  };

  // Select a pre-loaded sample prescription
  const handleSelectPrescription = (rx) => {
    setActivePrescription(rx);
    setActiveScreen('decoded');
  };

  // Add Decoded Prescription Medicines to Daily Schedule
  const handleAddToSchedule = (rx) => {
    if (!rx.medicines) return;

    const newDoses = [];
    rx.medicines.forEach((med, i) => {
      if (med.morning) {
        newDoses.push({
          id: `dose-${Date.now()}-${i}-m`,
          name: med.name,
          strength: med.strength,
          purposeEn: med.purposeEn,
          purposeTe: med.purposeTe,
          scheduledTime: '08:30 AM',
          timeSlot: 'morning',
          foodInstructionEn: med.foodInstructionEn,
          foodInstructionTe: med.foodInstructionTe,
          taken: false
        });
      }
      if (med.afternoon) {
        newDoses.push({
          id: `dose-${Date.now()}-${i}-a`,
          name: med.name,
          strength: med.strength,
          purposeEn: med.purposeEn,
          purposeTe: med.purposeTe,
          scheduledTime: '01:30 PM',
          timeSlot: 'afternoon',
          foodInstructionEn: med.foodInstructionEn,
          foodInstructionTe: med.foodInstructionTe,
          taken: false
        });
      }
      if (med.night) {
        newDoses.push({
          id: `dose-${Date.now()}-${i}-n`,
          name: med.name,
          strength: med.strength,
          purposeEn: med.purposeEn,
          purposeTe: med.purposeTe,
          scheduledTime: '08:30 PM',
          timeSlot: 'night',
          foodInstructionEn: med.foodInstructionEn,
          foodInstructionTe: med.foodInstructionTe,
          taken: false
        });
      }
    });

    setSchedule(prev => [...prev, ...newDoses]);
    setStats(prev => ({
      ...prev,
      activeRemindedPatients: prev.activeRemindedPatients + 1
    }));
  };

  // Toggle dose taken
  const handleToggleDoseTaken = (doseId) => {
    setSchedule(prev => prev.map(item => item.id === doseId ? { ...item, taken: !item.taken } : item));
  };

  // Desk Call counter
  const handleCallDesk = () => {
    setStats(prev => ({
      ...prev,
      hospitalDeskQueries: prev.hospitalDeskQueries + 1
    }));
  };

  // Live Ground Status Reporter Handler
  const handleUpdateHospitalStatus = (hospId, newStatus, newTime) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === hospId) {
        return {
          ...h,
          aarogyasriStatus: newStatus,
          verifiedTime: newTime
        };
      }
      return h;
    }));
  };

  // Clear data handler
  const handleClearData = () => {
    if (window.confirm(t.clearConfirm)) {
      localStorage.removeItem('arogya_current_rx');
      localStorage.removeItem('arogya_hospitals');
      localStorage.removeItem('arogya_schedule');
      localStorage.removeItem('arogya_stats');
      
      setActivePrescription(DEMO_PRESCRIPTIONS[0]);
      setHospitals(INITIAL_HOSPITALS);
      setSchedule([]);
      setStats(INITIAL_STATS);
      alert('Local demo data has been successfully reset.');
    }
  };

  // Save API key
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('arogya_gemini_key', key);
    } else {
      localStorage.removeItem('arogya_gemini_key');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-700 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Main Screen Body */}
      <main className="flex-1 pb-24 lg:pb-16">
        {activeScreen === 'chat' && (
          <ChatIntake
            onSelectPrescription={handleSelectPrescription}
            onNavigate={setActiveScreen}
            onAnalyzeImage={handleAnalyzeImage}
            isAnalyzing={isAnalyzing}
            analysisError={analysisError}
            onRetry={() => {
              if (lastUploadedPayload) {
                handleAnalyzeImage(lastUploadedPayload.base64Image, lastUploadedPayload.filename);
              }
            }}
          />
        )}

        {activeScreen === 'decoded' && (
          <PrescriptionResult
            prescription={activePrescription}
            onAddToSchedule={handleAddToSchedule}
            onBackToIntake={() => setActiveScreen('chat')}
            onNavigate={setActiveScreen}
          />
        )}

        {activeScreen === 'hospitals' && (
          <HospitalTracker
            hospitals={hospitals}
            onCallDesk={handleCallDesk}
            onUpdateHospitalStatus={handleUpdateHospitalStatus}
          />
        )}

        {activeScreen === 'schedule' && (
          <MedicineSchedule
            schedule={schedule}
            onToggleDoseTaken={handleToggleDoseTaken}
            onNavigate={setActiveScreen}
          />
        )}

        {activeScreen === 'about' && (
          <AboutScreen
            stats={stats}
            onClearData={handleClearData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">
          ArogyaAI — Team Alpha Developer • Visakhapatnam, Andhra Pradesh
        </p>
        <p className="text-[11px] text-slate-400">
          Built for families managing chronic care and Aarogyasri health scheme navigation. Informational guidance only.
        </p>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ArogyaApp />
    </LanguageProvider>
  );
}
