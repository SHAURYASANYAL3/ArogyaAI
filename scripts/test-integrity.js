// Automated Production Integrity Check for ArogyaAI / AyuVani
import { INITIAL_HOSPITALS, DEMO_PRESCRIPTIONS, GENERIC_PRICE_INDEX, PM_JAN_AUSHADHI_VIZAG_KENDRAS } from '../src/data/sampleData.js';
import { DICTIONARY } from '../src/data/dictionary.js';

let failed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- RUNNING AROGYAAI INTEGRITY CHECKS ---');

// 1. Hospital Ground Directory
assert(INITIAL_HOSPITALS.length >= 10, `Hospitals directory contains at least 10 entries (found ${INITIAL_HOSPITALS.length})`);
const invalidPhone = INITIAL_HOSPITALS.find(h => !h.phone || h.phone.length < 8);
assert(!invalidPhone, 'All hospitals have valid reachable contact phone numbers');
const activeGovt = INITIAL_HOSPITALS.find(h => h.id === 'hosp-kgh' && h.aarogyasriStatus.includes('Govt'));
assert(!!activeGovt, 'KGH government tertiary center is empanelled and active');

// 2. Prescriptions
assert(DEMO_PRESCRIPTIONS.length >= 2, `Demo prescriptions loaded (found ${DEMO_PRESCRIPTIONS.length})`);
DEMO_PRESCRIPTIONS.forEach((rx, idx) => {
  assert(rx.medicines.length > 0, `Prescription #${idx + 1} has valid medicines`);
  assert(typeof rx.teluguAudioScript === 'string' && rx.teluguAudioScript.length > 20, `Prescription #${idx + 1} has complete Telugu audio script`);
});

// 3. PM Jan Aushadhi & Generic Savings
assert(PM_JAN_AUSHADHI_VIZAG_KENDRAS.length >= 4, `Jan Aushadhi store locations verified (found ${PM_JAN_AUSHADHI_VIZAG_KENDRAS.length})`);
assert(GENERIC_PRICE_INDEX.length >= 5, `Generic medicine price index verified (found ${GENERIC_PRICE_INDEX.length})`);
const invalidSavings = GENERIC_PRICE_INDEX.find(item => item.brandPrice <= item.janAushadhiPrice);
assert(!invalidSavings, 'All generic medicines show real positive savings compared to branded counterparts');

// 4. Bilingual Dictionary Parity
const enKeys = Object.keys(DICTIONARY.en);
const teKeys = Object.keys(DICTIONARY.te);
assert(enKeys.length > 0 && teKeys.length > 0, 'Dictionary contains both English and Telugu translations');
const missingInTe = enKeys.filter(k => !(k in DICTIONARY.te));
assert(missingInTe.length === 0, `Telugu dictionary has full parity with English (missing: ${missingInTe.join(', ') || 'none'})`);

console.log('-----------------------------------------');
if (failed > 0) {
  console.error(`🚨 INTEGRITY CHECK FAILED with ${failed} errors.`);
  process.exit(1);
} else {
  console.log('🎉 ALL PRODUCTION INTEGRITY CHECKS PASSED.');
  process.exit(0);
}
