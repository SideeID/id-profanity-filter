// full-example.js
const { IDProfanityFilter, idFilter } = require('./dist');

/**
 * Contoh Penggunaan Lengkap ID-Profanity-Filter
 * ============================================
 * File ini mencakup semua contoh penggunaan utama library.
 */

console.log('============ CONTOH PENGGUNAAN DASAR ============\n');

const filter = new IDProfanityFilter();

const teks =
  'Dasar kontol kontol kntl babi asu ngentod kamu, jangan banyak bacot! perek';

// ===== 1. Cek apakah teks mengandung kata kotor =====
const hasProfanity = filter.isProfane(teks);
console.log('1. Apakah teks mengandung kata kotor?', hasProfanity);

// ===== 2. Filter kata kotor (mengganti dengan sensor) =====
const hasil = filter.filter(teks);
console.log('\n2. Hasil filter:');
console.log('- Teks asli:', teks);
console.log('- Teks tersensor:', hasil.filtered);
console.log('- Jumlah kata yang disensor:', hasil.censored);
console.log('- Detail penggantian:', hasil.replacements);

// ===== 3. Analisis konten =====
const analisis = filter.analyze(teks);
console.log('\n3. Hasil analisis:');
console.log('- Mengandung kata kotor:', analisis.hasProfanity);
console.log('- Kata kotor yang ditemukan:', analisis.matches);
console.log('- Kategori kata kotor:', analisis.categories);
console.log('- Daerah asal kata kotor:', analisis.regions);
console.log('- Skor keparahan:', analisis.severityScore.toFixed(2));

// console.log('\n============ PENGGUNAAN PRESET ============\n');

// // ===== 4. Menggunakan preset filter =====
// console.log('4. Menggunakan preset filter:');

// // Preset strict
// filter.usePreset('strict');
// console.log('- Preset strict:', filter.filter(teks).filtered);

// // Preset childSafe
// filter.usePreset('childSafe');
// console.log('- Preset childSafe:', filter.filter(teks).filtered);

// // Preset light
// filter.usePreset('light');
// console.log('- Preset light:', filter.filter(teks).filtered);

console.log('\n============ KUSTOMISASI FILTER ============\n');

// ===== 5. Kustomisasi filter =====
console.log('5. Kustomisasi filter:');

filter.setOptions({
  replaceWith: '#', // Menggunakan # sebagai karakter pengganti
  fullWordCensor: false, // Hanya menyensor sebagian kata
  keepFirstAndLast: true, // Menyimpan huruf pertama dan terakhir
});

console.log('- Filter dengan opsi kustom:', filter.filter(teks).filtered);

// Mendeteksi variasi penulisan
filter.setOptions({
  detectLeetSpeak: true,
  indonesianVariation: true,
  detectSplit: true,
  detectSimilarity: true,
  useLevenshtein: true,
  similarityThreshold: 0.85,
  maxLevenshteinDistance: 2,
});

const teks2 =
  'Dasar b4b1 kamu, j4nc0k! Ngent0d! k-o-n-t-o-l! k o n t o l k-0nt0l! anjiing kontool kwontol';
console.log('- Teks asli dengan variasi:', teks2);
console.log('- Hasil filter variasi:', filter.filter(teks2).filtered);

// ===== 6. Menggunakan whitelist =====
console.log('\n6. Menggunakan whitelist:');

filter.addToWhitelist('anjing');
const tekstBinatang =
  'Anjing itu hewan peliharaan yang setia, tidak seperti bajingan itu';

console.log('- Teks dengan "anjing" dalam konteks binatang:', tekstBinatang);
console.log(
  '- Hasil filter dengan whitelist:',
  filter.filter(tekstBinatang).filtered,
);

// ===== 7. Menggunakan daftar kata kustom =====
console.log('\n7. Menggunakan daftar kata kustom:');

const customBadWords = ['jelek', 'buruk', 'sampah', 'payah'];

// Reset filter dan gunakan daftar kustom
filter.setOptions({
  wordList: customBadWords,
  replaceWith: '*',
});

const teksKustom = 'Film ini jelek dan payah sekali!';
console.log('- Teks asli:', teksKustom);
console.log('- Hasil filter kustom:', filter.filter(teksKustom).filtered);

console.log('\n============ ANALISIS LANJUTAN ============\n');

// ===== 8. Analisis per kalimat =====
console.log('8. Analisis per kalimat:');

filter.setOptions({}); // Reset ke default
const kalimat =
  'Saya sangat suka filmnya. Tapi pemainnya seperti anjing, aktingnya buruk.';
console.log('- Kalimat:', kalimat);

const kalimatAnalisis = filter.analyzeBySentence(kalimat);
console.log('- Hasil analisis per kalimat:');
kalimatAnalisis.forEach((hasil, index) => {
  console.log(`  Kalimat ${index + 1}: "${hasil.sentence}"`);
  console.log(`  Mengandung kata kotor: ${hasil.hasProfanity}`);
  if (hasil.hasProfanity) {
    console.log(`  Kata kotor: ${hasil.matches.join(', ')}`);
  }
});

// ===== 9. Analisis batch untuk komentar =====
console.log('\n9. Analisis batch:');

const komentar = [
  'Film ini sangat bagus, ceritanya menarik sekali!',
  'Dasar goblok, sialan kamu!',
  'Anjing emang filmnya, sampah banget.',
];

console.log('- Batch teks:');
komentar.forEach((k, i) => console.log(`  ${i + 1}. "${k}"`));

const hasilBatch = filter.batchAnalyze(komentar);
console.log('- Hasil analisis batch:');
console.log(`  - Total teks: ${hasilBatch.totalTexts}`);
console.log(`  - Teks mengandung kata kotor: ${hasilBatch.profaneTexts}`);
console.log(`  - Teks bersih: ${hasilBatch.cleanTexts}`);
console.log(`  - Kategori teratas: ${hasilBatch.topCategories.join(', ')}`);
console.log(`  - Daerah teratas: ${hasilBatch.topRegions.join(', ')}`);
console.log('  - Kata kotor terbanyak:');
hasilBatch.mostFrequentWords.forEach((word) => {
  console.log(`    * "${word.word}": ${word.count} kali`);
});

// ===== 10. Filter berdasarkan kategori dan daerah =====
console.log('\n10. Filter berdasarkan kategori dan daerah:');

// Filter untuk kata dari daerah Jawa saja
const filterJawa = new IDProfanityFilter({
  regions: ['jawa'], // Hanya filter kata dari Jawa
});

const contohTeksJawa = 'Dasar jancok, asu, bangsat, bacot!';
console.log('- Teks asli:', contohTeksJawa);
console.log(
  '- Filter khusus kata Jawa:',
  filterJawa.filter(contohTeksJawa).filtered,
);

// Filter untuk kategori sexual saja
const filterSexual = new IDProfanityFilter({
  categories: ['sexual'], // Hanya filter kata kategori seksual
});

const contohTeksSexual =
  'Kata kotor seperti anjing dan goblok tidak disensor, tapi bokep disensor.';
console.log('- Teks asli:', contohTeksSexual);
console.log(
  '- Filter khusus kategori sexual:',
  filterSexual.filter(contohTeksSexual).filtered,
);

console.log('\n============ SELESAI ============');
