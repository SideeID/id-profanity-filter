import { IDProfanityFilter, idFilter, FilterOptions } from '../src/index';

/**
 * Contoh Penggunaan ID-Profanity-Filter dengan Daftar Kustom
 * =======================================================
 * File ini menunjukkan cara menggunakan library dengan daftar kata kustom.
 */

console.log('=== Contoh Penggunaan dengan Daftar Kata Kustom ===\n');

// ===== Contoh 1: Menggunakan daftar kata kustom =====
// Daftar kata kotor kustom
const customBadWords = ['jelek', 'buruk', 'sampah', 'payah', 'lemah', 'amatir'];

// Buat instance dengan daftar kata kustom
const filter = new IDProfanityFilter({
  wordList: customBadWords,
  replaceWith: '#',
});

const teks1 = 'Film itu sangat jelek dan payah, sepertinya dibuat oleh amatir.';
console.log('Teks asli:', teks1);
console.log('Hasil filter kustom:', filter.filter(teks1).filtered);

// ===== Contoh 2: Menggabungkan daftar kata kustom dengan daftar bawaan =====
console.log('\n=== Menggabungkan Daftar Kata ===\n');

// Reset filter ke pengaturan default
filter.setOptions({});

// Tambahkan kata-kata kustom tapi tetap deteksi kata-kata bawaan
const teks2 = 'Film itu sangat jelek dan payah, dibuat oleh anjing amatir.';
console.log('Teks asli:', teks2);

// Analisis hanya dengan kata bawaan
console.log('Analisis standar:');
const standarAnalisis = filter.analyze(teks2);
console.log('- Kata terdeteksi:', standarAnalisis.matches);

// Tambahkan kata kustom
filter.setWordList([...customBadWords]);
console.log('\nAnalisis dengan kata kustom ditambahkan:');
const customAnalisis = filter.analyze(teks2);
console.log('- Kata terdeteksi:', customAnalisis.matches);

// ===== Contoh 3: Whitelist untuk pengecualian kontekstual =====
console.log('\n=== Penggunaan Whitelist ===\n');

// Kita ingin kata "anjing" diperbolehkan jika dalam konteks binatang
filter.setOptions({});
filter.addToWhitelist('anjing');

const teks3a = 'Anjing adalah hewan peliharaan yang setia.';
const teks3b = 'Dasar anjing kamu, tidak punya perasaan!';

console.log('Teks dengan konteks binatang:', teks3a);
console.log('Terdeteksi sebagai kata kotor?', filter.isProfane(teks3a));

// Tambahkan kembali "anjing" ke daftar kata kotor
filter.removeFromWhitelist('anjing');
console.log('\nSetelah dihapus dari whitelist:');
console.log('Terdeteksi sebagai kata kotor?', filter.isProfane(teks3a));

// ===== Contoh 4: Membuat preset kustom =====
console.log('\n=== Membuat Preset Kustom ===\n');

// Kita bisa membuat preset filter kustom
const myCustomPreset: FilterOptions = {
  replaceWith: '●', // Karakter pengganti
  fullWordCensor: false,
  keepFirstAndLast: true,
  detectLeetSpeak: true,
  indonesianVariation: true,
  detectSplit: false,
  useRandomGrawlix: false,
  categories: ['insult', 'profanity'],
  severityThreshold: 0.3,
  whitelist: ['anjing'], // Untuk konteks binatang
};

const teks4 = 'Anjing itu lucu, tidak seperti si goblok dan bego itu.';
console.log('Teks asli:', teks4);

// Gunakan preset kustom
filter.setOptions(myCustomPreset);
console.log('Hasil preset kustom:', filter.filter(teks4).filtered);

// ===== Contoh 5: Filter berdasarkan kategori atau daerah saja =====
console.log('\n=== Filter Berdasarkan Kategori atau Daerah ===\n');

// Filter hanya kata dari kategori "sexual"
filter.setOptions({
  categories: ['sexual'],
  wordList: [], // Reset daftar kata kustom
});

const teks5 =
  'Ngewe dan bokep itu kata kotor, bego dan anjing tidak terfilter.';
console.log('Teks asli:', teks5);
console.log('Filter hanya kategori sexual:', filter.filter(teks5).filtered);

// Filter hanya kata dari daerah "jawa"
filter.setOptions({
  categories: [],
  regions: ['jawa'],
});

const teks5b = 'Kata jancuk dan cuk dari Jawa, anjing adalah kata umum.';
console.log('\nTeks asli:', teks5b);
console.log('Filter hanya daerah jawa:', filter.filter(teks5b).filtered);

// ===== Contoh 6: Custom wordList dengan metadata =====
console.log('\n=== Custom wordList dengan Metadata ===\n');

// Ini contoh jika Anda ingin membuat daftar kata lengkap dengan metadata
const customWordsWithMetadata = [
  {
    word: 'jelek',
    category: 'insult' as any,
    region: 'general' as any,
    severity: 0.4,
    aliases: ['jelex', 'jlk'],
  },
  {
    word: 'payah',
    category: 'insult' as any,
    region: 'general' as any,
    severity: 0.3,
    aliases: ['pyh', 'payaah'],
  },
];

// Namun untuk filter sederhana, cukup gunakan kata-kata saja
filter.setOptions({
  wordList: customWordsWithMetadata.map((w) => w.word),
});

const teks6 = 'Performanya sangat jelek dan payah sekali.';
console.log('Teks asli:', teks6);
console.log('Filter dengan wordList kustom:', filter.filter(teks6).filtered);
