# ID-Profanity-Filter

![License](https://img.shields.io/npm/l/@sideid/id-profanity-filter)
![Version](https://img.shields.io/npm/v/@sideid/id-profanity-filter)
![Downloads](https://img.shields.io/npm/dt/@sideid/id-profanity-filter)

Library JavaScript/TypeScript untuk mendeteksi, menyensor, dan menganalisis kata-kata kotor dalam Bahasa Indonesia dan bahasa daerah.

## Fitur Utama

- 🔍 **Deteksi Kata Kotor** - Mendeteksi kata-kata kasar/kotor dalam teks Bahasa Indonesia
- ⚠️ **Analisis Konten** - Menganalisis tingkat keparahan dan kategori kata kotor
- 🔒 **Penyensoran** - Menyensor kata-kata kotor dengan berbagai opsi kustomisasi
- 🗺️ **Dukungan Bahasa Daerah** - Mencakup kata-kata dari berbagai daerah di Indonesia (Jawa, Sunda, Batak, dll)
- 🔧 **Kustomisasi** - Opsi untuk menambahkan whitelist dan daftar kata kustom

## Instalasi

```bash
npm install @sideid/id-profanity-filter
# atau
yarn add @sideid/id-profanity-filter
# atau
pnpm add @sideid/id-profanity-filter
```

## Penggunaan Dasar

### JavaScript / TypeScript

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

// Buat instance filter
const filter = new IDProfanityFilter();

// Cek apakah teks mengandung kata kotor
const teks = 'Dasar anjing kamu, jangan banyak bacot!';
const hasProfanity = filter.isProfane(teks);

console.log(hasProfanity); // Output: true

// Filter kata kotor (sensorisasi)
const hasil = filter.filter(teks);
console.log(hasil.filtered); // Output: "Dasar **** kamu, jangan banyak ****!"
console.log(hasil.censored); // Output: 2 (jumlah kata yang disensor)

// Analisis konten
const analisis = filter.analyze(teks);
console.log(analisis.severityScore); // Output: 0.65 (contoh skor keparahan)
console.log(analisis.categories); // Output: ["profanity", "insult"]
```

### Utilitas Langsung

Anda juga dapat menggunakan fungsi utilitas langsung tanpa membuat instance:

```typescript
import { idFilter } from '@sideid/id-profanity-filter';

const teks = 'Dasar anjing kamu, jangan banyak bacot!';
const hasil = idFilter.filter(teks);
console.log(hasil.filtered); // Output: "Dasar **** kamu, jangan banyak ****!"
```

## Dokumentasi API

### Kelas `IDProfanityFilter`

#### Konstruktor

```typescript
constructor(options?: FilterOptions)
```

- **options**: Opsi konfigurasi filter (opsional)

#### Metode

##### `filter(text: string): FilterResult`

Menyensor kata kotor dalam teks.

- **Hasil**: Objek `FilterResult` dengan properti:
  - `filtered`: String teks yang sudah disensor
  - `censored`: Jumlah kata yang disensor
  - `replacements`: Array berisi detail kata yang disensor

##### `isProfane(text: string): boolean`

Memeriksa apakah teks mengandung kata kotor.

- **Hasil**: Boolean `true` jika teks mengandung kata kotor, `false` jika tidak

##### `analyze(text: string): AnalysisResult`

Menganalisis teks untuk mendapatkan informasi detail tentang kata kotor yang ditemukan.

- **Hasil**: Objek `AnalysisResult` dengan properti:
  - `hasProfanity`: Apakah teks mengandung kata kotor
  - `matches`: Array kata kotor yang ditemukan
  - `matchDetails`: Array objek kata kotor dengan metadata
  - `categories`: Kategori kata kotor yang ditemukan
  - `regions`: Daerah asal kata kotor yang ditemukan
  - `severityScore`: Skor keparahan (0-1)

##### `batchAnalyze(texts: string[])`

Menganalisis batch teks sekaligus dan memberikan ringkasan.

- **Hasil**: Objek yang berisi ringkasan analisis

##### `analyzeBySentence(text: string)`

Menganalisis teks per-kalimat.

- **Hasil**: Array dari hasil analisis per-kalimat

##### `analyzeWithContext(text: string, contextWindowSize?: number)`

Menganalisis teks dengan konteks di sekitar kata kotor.

- **Hasil**: Array dari kata kotor dengan konteks di sekitarnya

##### `setOptions(options: Partial<FilterOptions>)`

Mengubah opsi filter.

##### `setWordList(wordList: string[])`

Menetapkan daftar kata kustom.

##### `addToWhitelist(word: string)`

Menambahkan kata ke whitelist (akan diabaikan dalam filter).

##### `removeFromWhitelist(word: string)`

Menghapus kata dari whitelist.

### Opsi Filter

```typescript
interface FilterOptions {
  wordList?: string[]; // List kata yang ingin difilter
  replaceWith?: string; // Karakter pengganti untuk kata yang disensor
  fullWordCensor?: boolean; // Apakah menyensor seluruh kata atau sebagian
  detectLeetSpeak?: boolean; // Deteksi variasi penulisan (mis: a=4, e=3)
  whitelist?: string[]; // Kata-kata yang dikecualikan dari filter
  checkSubstring?: boolean; // Memeriksa substring (lebih ketat)
  categories?: ProfanityCategory[]; // Kategori kata yang difilter
  regions?: Region[]; // Daerah asal kata yang difilter
  severityThreshold?: number; // Tingkat keparahan minimum (0-1)
}
```

## Contoh Penggunaan Lanjutan

### Kustomisasi Opsi Filter

```typescript
const filter = new IDProfanityFilter({
  replaceWith: '#', // Menggunakan # sebagai karakter pengganti
  fullWordCensor: false, // Hanya menyensor sebagian kata
  detectLeetSpeak: true, // Mendeteksi variasi seperti "b4b1" untuk "babi"
  categories: ['sexual', 'slur'], // Hanya filter kategori tertentu
  regions: ['jawa', 'general'], // Hanya filter dari daerah tertentu
  severityThreshold: 0.7, // Hanya filter kata dengan tingkat keparahan ≥ 0.7
});

// Atau mengubah opsi setelah inisialisasi
filter.setOptions({
  replaceWith: '@',
  fullWordCensor: true,
});
```

### Menggunakan Whitelist

```typescript
const filter = new IDProfanityFilter();

// Menambahkan kata ke whitelist (akan diabaikan)
filter.addToWhitelist('anjing');

const teks =
  'Anjing itu hewan peliharaan yang setia, tidak seperti bajingan itu';
const hasil = filter.filter(teks);

console.log(hasil.filtered);
// Output: "Anjing itu hewan peliharaan yang setia, tidak seperti ******* itu"
```

### Analisis Konten Mendalam

```typescript
const filter = new IDProfanityFilter();
const teks = 'Dasar anjing sialan! Kamu ini memang bego dan goblok.';

// Analisis teks
const analisis = filter.analyze(teks);
console.log(analisis);

/* Output:
{
  hasProfanity: true,
  matches: ['anjing', 'sialan', 'bego', 'goblok'],
  matchDetails: [
    { word: 'anjing', category: 'profanity', region: 'general', severity: 0.7, ... },
    { word: 'bego', category: 'insult', region: 'general', severity: 0.5, ... },
    ...
  ],
  categories: ['profanity', 'insult'],
  regions: ['general'],
  severityScore: 0.64
}
*/
```

### Analisis Batch

```typescript
const filter = new IDProfanityFilter();
const komentar = [
  'Film ini sangat bagus, ceritanya menarik sekali!',
  'Dasar goblok, sialan kamu!',
  'Anjing emang filmnya, sampah banget.',
];

const hasil = filter.batchAnalyze(komentar);
console.log(hasil);

/* Output:
{
  totalTexts: 3,
  profaneTexts: 2,
  cleanTexts: 1,
  averageSeverity: 0.62,
  topCategories: ['profanity', 'insult'],
  topRegions: ['general'],
  mostFrequentWords: [
    { word: 'anjing', count: 1 },
    { word: 'goblok', count: 1 },
    { word: 'sialan', count: 1 },
    { word: 'sampah', count: 1 }
  ]
}
*/
```

## Dukungan Regional

Library ini mendukung kata-kata kotor dari berbagai daerah di Indonesia:

- 🇮🇩 **General** - Kata-kata yang umum di seluruh Indonesia
- 🏝️ **Jawa** - Kata-kata dari bahasa Jawa
- 🏞️ **Sunda** - Kata-kata dari bahasa Sunda
- 🏙️ **Betawi** - Kata-kata dari bahasa Betawi
- 🌋 **Batak** - Kata-kata dari bahasa Batak

Dan daerah lainnya yang terus bertambah.

## Kategori Kata

Kata-kata dikelompokkan berdasarkan kategori:

- `sexual`: Kata-kata berbau seksual
- `insult`: Kata-kata penghinaan
- `profanity`: Umpatan umum
- `slur`: Perkataan merendahkan berdasarkan identitas
- `drugs`: Terkait narkoba
- `disgusting`: Kata-kata menjijikkan
- `blasphemy`: Penistaan agama

## Berkontribusi

Kami sangat menghargai kontribusi Anda! Untuk berkontribusi, silakan lihat [panduan kontribusi](CONTRIBUTING.md).

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak & Dukungan

Jika Anda memiliki pertanyaan atau saran, silakan buka issue di repositori GitHub kami.
