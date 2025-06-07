<div align="center">
  <img alt="SideID - Profanity Filter" src="https://socialify.git.ci/SideeID/id-profanity-filter/image?custom_description=Library+JavaScript%2FTypeScript+untuk+mendeteksi%2C+menyensor%2C+dan+menganalisis+kata-kata+kotor+dalam+Indonesia+dan+daerah.&description=1&font=Inter&forks=1&language=1&name=1&owner=1&pattern=Circuit+Board&stargazers=1&theme=Auto">
</div>

---

<div align="center">
  <a href="https://www.npmjs.com/package/@sideid/id-profanity-filter">
    <img src="https://img.shields.io/npm/v/@sideid/id-profanity-filter.svg" alt="NPM Version">
  </a>
  <a href="https://www.npmjs.com/package/@sideid/id-profanity-filter">
    <img src="https://img.shields.io/npm/dt/@sideid/id-profanity-filter?label=npm&color=%23CB3837" alt="NPM Downloads">
  </a>
  <a href="https://github.com/SideeID/id-profanity-filter">
    <img src="https://img.shields.io/github/languages/code-size/SideeID/id-profanity-filter" alt="GitHub Code Size">
  </a>
  <a href="https://github.com/SideeID/id-profanity-filter">
    <img src="https://img.shields.io/github/license/SideeID/id-profanity-filter" alt="GitHub License">
  </a>
  <a href="https://github.com/SideeID/id-profanity-filter">
    <img src="https://img.shields.io/github/stars/SideeID/id-profanity-filter" alt="GitHub Stars">
  </a>
  <a href="https://github.com/SideeID/id-profanity-filter">
    <img src="https://img.shields.io/github/forks/SideeID/id-profanity-filter" alt="GitHub Forks">
  </a>
</div>

## Fitur Utama

- 🔍 **Deteksi Kata Kotor** - Mendeteksi kata-kata kasar/kotor dalam teks Bahasa Indonesia
- ⚠️ **Analisis Konten** - Menganalisis tingkat keparahan dan kategori kata kotor
- 🔒 **Penyensoran** - Menyensor kata-kata kotor dengan berbagai opsi kustomisasi
- 🗺️ **Dukungan Bahasa Daerah** - Mencakup kata-kata dari berbagai daerah di Indonesia (Jawa, Sunda, Batak, dll)
- 🧠 **Deteksi Cerdas** - Mendeteksi variasi ejaan, kata terpisah, dan kesamaan kata
- 🔠 **Deteksi Levenshtein** - Mendeteksi kata kotor yang dimodifikasi dengan typo atau sengaja disamarkan
- 🛡️ **Preset** - Preset filter siap pakai untuk berbagai kebutuhan
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
console.log(hasil.filtered); // Output: "Dasar ***** kamu, jangan banyak *****!"
console.log(hasil.censored); // Output: 2 (jumlah kata yang disensor)

// Analisis konten
const analisis = filter.analyze(teks);
console.log(analisis.severityScore); // Output: 0.65 (contoh skor keparahan)
console.log(analisis.categories); // Output: ["profanity", "insult"]
```

### Menggunakan Preset

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

// Buat instance filter dengan preset
const filter = new IDProfanityFilter();
filter.usePreset('strict');

// Atau dengan opsi tambahan
filter.usePreset('childSafe', {
  replaceWith: '#',
  useRandomGrawlix: true,
});

const teks = 'Dasar anjing kamu, jangan banyak bacot!';
const hasil = filter.filter(teks);
console.log(hasil.filtered); // Output: "Dasar #@$%& kamu, jangan banyak $!@#%!"
```

### Utilitas Langsung

Anda juga dapat menggunakan fungsi utilitas langsung tanpa membuat instance:

```typescript
import { idFilter } from '@sideid/id-profanity-filter';

const teks = 'Dasar anjing kamu, jangan banyak bacot!';
const hasil = idFilter.filter(teks);
console.log(hasil.filtered); // Output: "Dasar ***** kamu, jangan banyak *****!"

// Menggunakan preset dengan API fungsi statis
const presetResult = idFilter.filter(
  teks,
  idFilter.getPresetOptions('moderate'),
);
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
  - `similarWords`: Kata-kata yang mirip dengan kata kotor (jika deteksi kesamaan diaktifkan)

##### `batchAnalyze(texts: string[])`

Menganalisis batch teks sekaligus dan memberikan ringkasan.

- **Hasil**: Objek yang berisi ringkasan analisis

##### `analyzeBySentence(text: string)`

Menganalisis teks per-kalimat.

- **Hasil**: Array dari hasil analisis per-kalimat

##### `analyzeWithContext(text: string, contextWindowSize?: number)`

Menganalisis teks dengan konteks di sekitar kata kotor.

- **Hasil**: Array dari kata kotor dengan konteks di sekitarnya

##### `usePreset(presetName: string, additionalOptions?: Partial<FilterOptions>)`

Menggunakan preset filter yang telah ditentukan.

- **presetName**: Nama preset ('strict', 'moderate', 'light', 'childSafe', dll)
- **additionalOptions**: Opsi tambahan untuk override preset (opsional)

##### `setOptions(options: Partial<FilterOptions>)`

Mengubah opsi filter.

##### `setWordList(wordList: string[])`

Menetapkan daftar kata kustom.

##### `addToWhitelist(word: string)`

Menambahkan kata ke whitelist (akan diabaikan dalam filter).

##### `removeFromWhitelist(word: string)`

Menghapus kata dari whitelist.

##### `enableIndonesianVariations()`

Mengaktifkan deteksi variasi ejaan Bahasa Indonesia.

##### `enableSplitWordDetection()`

Mengaktifkan deteksi kata yang dipisah.

##### `enableSimilarityDetection(threshold: number = 0.8, useLevenshtein: boolean = false, maxLevenshteinDistance: number = 2)`

Mengaktifkan deteksi berdasarkan kesamaan kata.

- **threshold**: Ambang batas kesamaan (0-1, default: 0.8)
- **useLevenshtein**: Gunakan algoritma Levenshtein untuk deteksi (default: false)
- **maxLevenshteinDistance**: Jarak edit maksimum yang diizinkan (default: 2)

##### `enableLevenshteinDetection(threshold: number = 0.8, maxDistance: number = 2)`

Mengaktifkan deteksi berbasis jarak Levenshtein.

- **threshold**: Ambang batas kesamaan (0-1, default: 0.8)
- **maxDistance**: Jarak edit maksimum yang diizinkan (default: 2)

### Opsi Filter

```typescript
interface FilterOptions {
  // Opsi dasar
  wordList?: string[]; // List kata yang ingin difilter
  replaceWith?: string; // Karakter pengganti untuk kata yang disensor
  fullWordCensor?: boolean; // Apakah menyensor seluruh kata atau sebagian
  detectLeetSpeak?: boolean; // Deteksi variasi penulisan (mis: a=4, e=3)
  whitelist?: string[]; // Kata-kata yang dikecualikan dari filter
  checkSubstring?: boolean; // Memeriksa substring (lebih ketat)
  categories?: ProfanityCategory[]; // Kategori kata yang difilter
  regions?: Region[]; // Daerah asal kata yang difilter
  severityThreshold?: number; // Tingkat keparahan minimum (0-1)

  // Opsi lanjutan
  useRandomGrawlix?: boolean; // Gunakan karakter acak untuk sensor (#@$%&!)
  keepFirstAndLast?: boolean; // Simpan huruf pertama dan terakhir (a***g)
  indonesianVariation?: boolean; // Deteksi variasi ejaan Bahasa Indonesia
  detectSimilarity?: boolean; // Deteksi kata berdasarkan kesamaan
  similarityThreshold?: number; // Ambang batas kesamaan (0-1)
  detectSplit?: boolean; // Deteksi kata yang dipisah (a-n-j-i-n-g)
  useLevenshtein?: boolean; // Gunakan algoritma Levenshtein untuk deteksi kesamaan
  maxLevenshteinDistance?: number; // Jarak edit maksimum untuk deteksi Levenshtein
}
```

## Preset Filter

Library ini menyediakan beberapa preset yang dapat digunakan:

### Preset Filter

- **strict**: Filter paling ketat, mendeteksi semua jenis kata kotor
- **moderate**: Filter tingkat menengah, mengabaikan kata-kata dengan tingkat keparahan rendah
- **light**: Filter ringan, hanya untuk kata-kata paling sensitif
- **childSafe**: Filter untuk konten anak-anak, sangat ketat

### Preset Kategori

- **sexual**: Hanya memfilter kata-kata berbau seksual
- **insults**: Hanya memfilter kata-kata penghinaan
- **profanity**: Hanya memfilter umpatan umum

### Preset Regional

- **general**: Hanya memfilter kata-kata umum di Indonesia
- **jawa**: Hanya memfilter kata-kata dari Jawa
- **sunda**: Hanya memfilter kata-kata dari Sunda
- **betawi**: Hanya memfilter kata-kata dari Betawi
- **batak**: Hanya memfilter kata-kata dari Batak

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

  // Opsi lanjutan
  useRandomGrawlix: true, // Gunakan #@$%&! sebagai karakter pengganti
  keepFirstAndLast: true, // Simpan huruf pertama dan terakhir (a***g)
  indonesianVariation: true, // Deteksi variasi ejaan Indonesia
  detectSimilarity: true, // Deteksi kata yang mirip
  similarityThreshold: 0.8, // Ambang batas kesamaan
  detectSplit: true, // Deteksi kata yang dipisah
  useLevenshtein: true, // Gunakan algoritma Levenshtein
  maxLevenshteinDistance: 2, // Jarak Levenshtein maksimum
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

### Deteksi Variasi Ejaan dan Kata Terpisah

```typescript
// Aktifkan deteksi variasi ejaan dan kata terpisah
const filter = new IDProfanityFilter({
  indonesianVariation: true,
  detectSplit: true,
  detectLeetSpeak: true,
});

// Uji dengan variasi ejaan
const teks1 = 'Dasar kamu ini sangat bodoh, benar-benar b0d0h dan b-o-d-o-h!';
const hasil1 = filter.filter(teks1);
console.log(hasil1.filtered);
// Output: "Dasar kamu ini sangat *****, benar-benar ***** dan *********!"

// Uji dengan ejaan Indonesia yang berbeda
const teks2 = 'Dia sangat djail dan djudes dengan temannya';
const hasil2 = filter.filter(teks2);
console.log(hasil2.filtered);
// Output: "Dia sangat ***** dan ****** dengan temannya"
```

### Deteksi Berdasarkan Kesamaan (Similarity Detection)

```typescript
// Aktifkan deteksi kesamaan standar
const filter = new IDProfanityFilter();
filter.enableSimilarityDetection(0.75); // Set threshold kesamaan ke 0.75

const teks = 'Dia benar-benar anjiing dan gooblok!';
const analisis = filter.analyze(teks);

console.log(analisis.similarWords);
/* Output:
[
  { word: "anjiing", original: "anjing", similarity: 0.83 },
  { word: "gooblok", original: "goblok", similarity: 0.85 }
]
*/

const hasil = filter.filter(teks);
console.log(hasil.filtered);
// Output: "Dia benar-benar ****** dan *******!"
```

### Deteksi dengan Algoritma Levenshtein Distance

```typescript
// Aktifkan deteksi menggunakan algoritma Levenshtein Distance
const filter = new IDProfanityFilter();
filter.enableLevenshteinDetection(0.85, 2);
// Threshold 0.85, maksimal 2 karakter berbeda

const teks = 'Dia benar-benar konntol dan anjiing sekali!';
const hasil = filter.filter(teks);

console.log(hasil.filtered);
// Output: "Dia benar-benar ******* dan ****** sekali!"

// Atau menggunakan opsi langsung:
const filterCustom = new IDProfanityFilter({
  detectSimilarity: true,
  useLevenshtein: true,
  similarityThreshold: 0.85,
  maxLevenshteinDistance: 2,
});

// Mendeteksi typo atau variasi disengaja
const teksVariasi = 'kontool kamu kwontol anjiing';
console.log(filterCustom.filter(teksVariasi).filtered);
// Output: "******* kamu ******* ******"
```

### Variasi Sensor Kata

```typescript
// Sensor standar (asterisk)
const filter1 = new IDProfanityFilter();
console.log(filter1.filter('Dasar anjing kamu!').filtered);
// Output: "Dasar ***** kamu!"

// Sensor dengan grawlix random
const filter2 = new IDProfanityFilter({ useRandomGrawlix: true });
console.log(filter2.filter('Dasar anjing kamu!').filtered);
// Output: "Dasar #@$%& kamu!"

// Sensor dengan menyimpan huruf pertama dan terakhir
const filter3 = new IDProfanityFilter({
  fullWordCensor: false,
  keepFirstAndLast: true,
});
console.log(filter3.filter('Dasar anjing kamu!').filtered);
// Output: "Dasar a***g kamu!"
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

### Analisis Konteks

```typescript
const filter = new IDProfanityFilter();
const teks =
  'Saya sangat marah dengan sikapnya, dia benar-benar anjing dan bajingan!';

// Analisis konteks
const konteks = filter.analyzeWithContext(teks, 3);
console.log(konteks);

/* Output:
[
  {
    word: "anjing",
    context: "benar-benar anjing dan bajingan",
    position: { start: 43, end: 62 }
  },
  {
    word: "bajingan",
    context: "anjing dan bajingan!",
    position: { start: 54, end: 63 }
  }
]
*/
```

### Analisis Per-Kalimat

```typescript
const filter = new IDProfanityFilter();
const teks =
  'Filmnya bagus sekali. Tetapi pemainnya seperti anjing, sangat buruk aktingnya.';

// Analisis per-kalimat
const kalimat = filter.analyzeBySentence(teks);
console.log(
  kalimat.map(
    (k) =>
      k.sentence + (k.hasProfanity ? ' (Mengandung kata kotor)' : ' (Bersih)'),
  ),
);

/* Output:
[
  "Filmnya bagus sekali. (Bersih)",
  "Tetapi pemainnya seperti anjing, sangat buruk aktingnya. (Mengandung kata kotor)"
]
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

### Menambahkan Kata Baru

Jika Anda ingin menambahkan kata baru ke database, silakan buat pull request dengan mengubah file yang sesuai di `src/constants/categories/` atau `src/constants/regions/`.

Format untuk menambahkan kata baru:

```json
{
  "word": "kata_kotor", // Kata yang akan difilter
  "category": "insult", // Kategori kata
  "region": "general", // Daerah asal kata
  "severity": 0.7, // Tingkat keparahan (0-1)
  "aliases": ["k4t4_kotor", "kata_k0t0r"], // Alias atau variasi umum
  "description": "Deskripsi tentang kata", // Penjelasan tentang kata (opsional)
  "context": "Konteks penggunaan kata" // Konteks penggunaan (opsional)
}
```

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak & Dukungan

Jika Anda memiliki pertanyaan atau saran, silakan buka issue di repositori GitHub kami.
