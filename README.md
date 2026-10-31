# ArogyaAI (ఆరోగ్య AI) — Your Family's WhatsApp Health Ally in Telugu

> **Team:** Alpha Developer  
> **Location:** Visakhapatnam, Andhra Pradesh, India  
> **Headline:** Your family's WhatsApp health ally in Telugu — decode doctor prescriptions into spoken voice reminders and check live Aarogyasri hospital acceptance in Vizag.

---

## 🎯 What ArogyaAI Does

1. **Multimodal Prescription OCR & Telugu Voice Readout**:
   - Accepts handwritten or printed doctor prescription uploads.
   - Extracts medicine names, strengths, frequencies, timing, and clear food rules.
   - Provides native **spoken Telugu (`te-IN`) audio** so elderly parents can listen to their medication schedule without squinting at illegible handwriting.
   - Features confidence scoring and clinical safety disclaimers.

2. **Real-Time Visakhapatnam Aarogyasri Desk Tracker**:
   - Ground-verified directory of **15 premier Visakhapatnam hospitals** (Care, SevenHills, Medicover, Apollo, KGH, Pinnacle, Q1, VIMS, Omni RK, etc.).
   - Instant live desk verification badge: **Active (క్యాష్‌లెస్ యాక్టివ్)** vs. **Paused (తాత్కాలికంగా ఆపబడింది)**.
   - Ground verified timestamps, direct reception calling (`0891-xxxxxxx`), and ward bed capacity indicators.

3. **WhatsApp Daily Medication Schedule**:
   - Dynamic schedule planner converting extracted medicines into Morning / Afternoon / Night dosing intervals.
   - Simulates incoming WhatsApp vernacular audio reminders.
   - Tracks real-time compliance with zero database overhead.

4. **Zero-Install Caregiver Architecture**:
   - Zero login or password friction.
   - Bilingual support: Instant toggle between **English** and **తెలుగు (Telugu)**.
   - Offline-resilient: Works with pre-loaded clinical scenarios or with a live Gemini 1.5 Flash Vision API key stored safely in browser `localStorage`.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm / yarn

### Steps
```bash
# 1. Navigate to the project directory
cd D:\arogya

# 2. Install dependencies (if not already installed)
npm install

# 3. Launch Vite dev server
npm run dev
```

Open your browser at: **`http://localhost:5173`**

---

## 🌐 How to Deploy to Production

### Option 1: Vercel (Recommended, 1-Click)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Deploy the generated dist/ directory to Netlify via Netlify CLI or Drag & Drop
```

### Option 3: Static Hosting (GitHub Pages / S3 / Cloudflare Pages)
```bash
npm run build
# The complete static output is compiled into dist/
```

---

## 🧪 5-Step Verification Checklist

1. **Intake & Clinical Demo Test**:
   - On the Home screen, click **"Dr. Rao — Hypertension & Diabetes"**.
   - Verify that the prescription decodes Telmisartan 40mg and Metformin 500mg with high confidence (94%).
2. **Telugu Voice Synthesis Test**:
   - Click the **"తెలుగులో వినండి (Listen in Spoken Telugu)"** button on the decoded prescription card.
   - Confirm browser Web Speech API speaks the instructions clearly in Telugu.
3. **WhatsApp Schedule Synchronization**:
   - Click **"Add to WhatsApp Daily Reminders"**.
   - Confirm medicines populate the **Schedule (షెడ్యూల్)** tab with morning/evening checkmarks.
4. **Visakhapatnam Aarogyasri Desk Verification**:
   - Navigate to the **Hospitals (ఆసుపత్రులు)** tab.
   - Search for "Care" or filter by **"Paused (ఆపబడింది)"** to view real-time scheme desk acceptance status, verified timestamps, and one-tap calling.
5. **Language & Privacy Verification**:
   - Toggle language between **EN** and **తెలుగు** in the navbar to test instant UI translation.
   - In the **About** screen, click **"Clear My Stored Data"** to verify privacy-first local storage deletion.

---

## 🔮 5 Ideas for the Next Version

1. **Direct Twilio/Meta WhatsApp Cloud API Webhook**:
   - Replace the web intake mockup with an actual WhatsApp Business number where caregivers send camera snaps of prescriptions and receive automated voice notes back via WhatsApp audio messages.
2. **Crowdsourced Caregiver Aarogyasri Ping (Waze for Healthcare)**:
   - Allow caregivers standing at hospital billing desks to report desk status ("Aarogyasri desk currently turning away patients"), verified by geolocation and community upvotes.
3. **Jan Aushadhi Generic Medicine Cost Comparator**:
   - Automatically cross-reference decoded brand names (e.g., Telma 40) against Pradhan Mantri Bhartiya Janaushadhi Pariyojana generic equivalents, displaying price savings (₹12 vs ₹140).
4. **Diagnostic Lab Home Sample Booking**:
   - Connect prescribed blood tests (e.g., HbA1c, Lipid Profile) directly to local NABL accredited Vizag lab chains (Vijaya Diagnostic, Dr. Lal PathLabs) for at-home morning collection with 15% patient discounts.
5. **Automated WhatsApp Refill Alerts for Chronic Medications**:
   - Track pill counts and automatically trigger a WhatsApp message 3 days before medications run out, with one-tap reordering from local Vizag pharmacies.
