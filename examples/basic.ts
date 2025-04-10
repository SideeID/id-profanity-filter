/**
 * Contoh penggunaan dasar ID-Profanity-Filter
 */
import IDProfanityFilter from '../src/index';

// Contoh penggunaan sederhana

// 1. Buat instance filter
const filter = new IDProfanityFilter();

// 2. Contoh teks dengan kata kasar
const text = 'Dasar anjing kamu, jangan banyak bacot!';

// 3. Cek apakah teks mengandung kata kotor
const hasProfanity = filter.isProfane(text);
console.log('Teks mengandung kata kotor:', hasProfanity);

// 4. Filter kata kotor
const filteredResult = filter.filter(text);
console.log('Teks asli:', text);
console.log('Teks tersensor:', filteredResult.filtered);
console.log('Jumlah kata yang disensor:', filteredResult.censored);
console.log('Kata-kata yang disensor:', filteredResult.replacements);

// 5. Analisis teks
const analysis = filter.analyze(text);
console.log('\nHasil Analisis:');
console.log('- Mengandung kata kotor:', analysis.hasProfanity);
console.log('- Kata kotor yang ditemukan:', analysis.matches);
console.log('- Kategori kata kotor:', analysis.categories);
console.log('- Daerah asal kata kotor:', analysis.regions);
console.log('- Skor keparahan:', analysis.severityScore);

// 6. Gunakan opsi kustom
filter.setOptions({
  replaceWith: '#',
  fullWordCensor: false,
});

console.log('\nHasil filter dengan opsi kustom:');
console.log(filter.filter(text).filtered);

// 7. Tambahkan kata ke whitelist (pengecualian)
filter.addToWhitelist('anjing');
console.log('\nHasil filter setelah "anjing" di-whitelist:');
console.log(filter.filter(text).filtered);

// 8. Gunakan fungsi utilitas langsung
import { idFilter } from '../src/index';

console.log('\nPenggunaan utilitas langsung:');
console.log(idFilter.filter(text, { replaceWith: '@' }).filtered);
