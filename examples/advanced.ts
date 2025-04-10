import { IDProfanityFilter, idFilter } from '../src/index';

/**
 * Contoh Penggunaan Lanjutan ID-Profanity-Filter
 * ============================================
 * File ini menunjukkan fitur-fitur lanjutan dari library.
 */

console.log('=== Contoh Penggunaan Lanjutan ID-Profanity-Filter ===\n');

// ===== Contoh 1: Menggunakan preset filter =====
const filter = new IDProfanityFilter();
filter.usePreset('strict');

console.log('=== Contoh Preset ===\n');

const teks1 = 'Saya sangat kesal dengan dia, benar-benar anjing!';
console.log('Teks asli:', teks1);
console.log('Preset Strict:', filter.filter(teks1).filtered);

// Ganti ke preset childSafe dengan grawlix random
filter.usePreset('childSafe', { useRandomGrawlix: true });
console.log('Preset ChildSafe + Grawlix:', filter.filter(teks1).filtered);

// Ganti ke preset light (hanya filter kata paling sensitif)
filter.usePreset('light');
console.log('Preset Light:', filter.filter(teks1).filtered);

// ===== Contoh 2: Deteksi Variasi Penulisan =====
console.log('\n=== Contoh Deteksi Variasi Penulisan ===\n');

filter.setOptions({
  detectLeetSpeak: true,
  indonesianVariation: true,
  detectSplit: true,
});

const teks2 =
  'b4b1 adalah binatang yang kotor, sama seperti a-n-j-i-n-g dan d-j-a-r-i-k.';
console.log('Teks dengan variasi:', teks2);
console.log('Hasil filter:', filter.filter(teks2).filtered);

const leetAnalisis = filter.analyze(teks2);
console.log('Kata terdeteksi:', leetAnalisis.matches);

// ===== Contoh 3: Deteksi Kesamaan Kata =====
console.log('\n=== Contoh Deteksi Kesamaan Kata ===\n');

filter.enableSimilarityDetection(0.8);

const teks3 = 'Dia benar-benar anjiing dan gooblok!';
console.log('Teks dengan typo:', teks3);

const similarAnalisis = filter.analyze(teks3);
console.log('Kata terdeteksi:', similarAnalisis.matches);
console.log('Analisis kesamaan:', similarAnalisis.similarWords);
console.log('Hasil filter:', filter.filter(teks3).filtered);

// ===== Contoh 4: Analisis dengan Konteks =====
console.log('\n=== Contoh Analisis dengan Konteks ===\n');

const teks4 =
  'Para kritikus film sangat marah dengan kualitas filmnya, mereka menyebut sutradara itu anjing karena mengecewakan penonton dan membuang-buang anggaran.';
console.log('Teks panjang:', teks4);

const konteksAnalisis = filter.analyzeWithContext(teks4, 4);
console.log('Analisis konteks:');
konteksAnalisis.forEach((item) => {
  console.log(`- Kata: ${item.word}`);
  console.log(`  Konteks: "${item.context}"`);
  console.log(`  Posisi: ${item.position.start}-${item.position.end}`);
});

// ===== Contoh 5: Batch Analisis =====
console.log('\n=== Contoh Batch Analisis ===\n');

const tekstBatch = [
  'Film ini sangat bagus, ceritanya menarik sekali!',
  'Dasar goblok, sialan kamu!',
  'Anjing emang filmnya, sampah banget.',
  'Saya setuju dengan pendapat kritikus tentang film tersebut.',
];

console.log('Batch teks untuk dianalisis:');
tekstBatch.forEach((t, i) => console.log(`${i + 1}. ${t}`));

const batchHasil = filter.batchAnalyze(tekstBatch);
console.log('\nHasil Batch Analisis:');
console.log(`- Total teks: ${batchHasil.totalTexts}`);
console.log(`- Teks dengan kata kotor: ${batchHasil.profaneTexts}`);
console.log(`- Teks bersih: ${batchHasil.cleanTexts}`);
console.log(`- Rata-rata keparahan: ${batchHasil.averageSeverity.toFixed(2)}`);
console.log(`- Kategori terbanyak: ${batchHasil.topCategories.join(', ')}`);
console.log(`- Daerah terbanyak: ${batchHasil.topRegions.join(', ')}`);
console.log('- Kata-kata terbanyak:');
batchHasil.mostFrequentWords.forEach((word) => {
  console.log(`  * ${word.word}: ${word.count} kali`);
});

// ===== Contoh 6: Opsi Kustomisasi Lengkap =====
console.log('\n=== Contoh Kustomisasi Lengkap ===\n');

filter.setOptions({
  replaceWith: '@',
  fullWordCensor: false,
  keepFirstAndLast: true,
  detectLeetSpeak: true,
  indonesianVariation: true,
  detectSimilarity: true,
  similarityThreshold: 0.75,
  detectSplit: true,
  useRandomGrawlix: false,
  categories: ['sexual', 'profanity'],
  regions: ['general', 'jawa'],
  severityThreshold: 0.5,
});

const teks6 = 'Dasar b4b1 sialan, kamu ini memang anjiing ya!';
console.log('Teks asli:', teks6);
console.log('Hasil kustomisasi lengkap:', filter.filter(teks6).filtered);
