import { IDProfanityFilter, idFilter } from '../src/index';

/**
 * Contoh Penggunaan Dasar ID-Profanity-Filter
 * ==========================================
 * File ini menunjukkan fungsi dasar dari library.
 */

console.log('=== Contoh Penggunaan Dasar ID-Profanity-Filter ===\n');

// ===== Contoh 1: Inisialisasi dasar =====
const filter = new IDProfanityFilter();

const teks = 'Dasar anjing kamu, jangan banyak bacot!';
console.log('Teks asli:', teks);

// Cek apakah teks mengandung kata kotor
const hasProfanity = filter.isProfane(teks);
console.log('Mengandung kata kotor?', hasProfanity);

// Filter kata kotor (sensorisasi)
const hasil = filter.filter(teks);
console.log('Teks disensor:', hasil.filtered);
console.log('Jumlah kata disensor:', hasil.censored);
console.log('Detail penggantian:', hasil.replacements);

console.log('\n=== Contoh Analisis Dasar ===\n');

// Analisis konten
const analisis = filter.analyze(teks);
console.log('Mengandung kata kotor?', analisis.hasProfanity);
console.log('Kata-kata kotor yang ditemukan:', analisis.matches);
console.log('Kategori kata kotor:', analisis.categories);
console.log('Daerah asal kata:', analisis.regions);
console.log('Tingkat keparahan:', analisis.severityScore.toFixed(2));

console.log('\n=== Contoh Fungsi Statis ===\n');

// Menggunakan fungsi statis
const staticResult = idFilter.filter(teks);
console.log('Teks disensor (fungsi statis):', staticResult.filtered);

// ===== Contoh 2: Mengubah karakter pengganti =====
filter.setOptions({ replaceWith: '#' });
console.log('\nTeks disensor dengan #:', filter.filter(teks).filtered);

// ===== Contoh 3: Hanya menyensor sebagian kata =====
filter.setOptions({
  replaceWith: '*',
  fullWordCensor: false,
  keepFirstAndLast: true,
});
console.log(
  '\nTeks disensor sebagian (first & last):',
  filter.filter(teks).filtered,
);

// ===== Contoh 4: Metode analisis lain =====
const kalimat =
  'Saya sangat suka filmnya. Tapi pemainnya seperti anjing, aktingnya buruk.';
console.log('\nContoh kalimat untuk analisis per-kalimat:', kalimat);

const kalimatAnalisis = filter.analyzeBySentence(kalimat);
console.log('\nAnalisis per-kalimat:');
kalimatAnalisis.forEach((hasil, index) => {
  console.log(`Kalimat ${index + 1}: ${hasil.sentence}`);
  console.log(`- Mengandung kata kotor: ${hasil.hasProfanity}`);
  if (hasil.hasProfanity) {
    console.log(`- Kata kotor: ${hasil.matches.join(', ')}`);
  }
});
