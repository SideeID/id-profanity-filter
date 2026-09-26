<div align="center">
  <img alt="SideID - Profanity Filter" src="https://socialify.git.ci/SideeID/id-profanity-filter/image?custom_description=Library+JavaScript%2FTypeScript+untuk+mendeteksi%2C+menyensor%2C+dan+menganalisis+kata-kata+kotor+dalam+Indonesia+dan+daerah.&description=1&font=Inter&forks=1&language=1&name=1&owner=1&pattern=Circuit+Board&stargazers=1&theme=Auto">
</div>

---

<div align="center">
  <a href="https://www.npmjs.com/package/@sideid/id-profanity-filter">
    <img src="https://img.shields.io/npm/v/@sideid/id-profanity-filter.svg" alt="NPM Version">
  </a>
  <a href="https://github.com/SideeID/id-profanity-filter">
    <img src="https://img.shields.io/github/license/SideeID/id-profanity-filter" alt="GitHub License">
  </a>
</div>

# id-profanity-filter

Library JavaScript dan TypeScript untuk mendeteksi, menyensor, dan menganalisis kata kotor dalam bahasa Indonesia serta berbagai bahasa daerah.

## Fitur

- Deteksi kata kotor dan umpatan dalam bahasa Indonesia dan dialek daerah (Jawa, Sunda, Batak, Betawi, Minang, Bali, Madura, Aceh)
- Sensor fleksibel: ganti karakter (`*`, `#`), grawlix acak (`#@$%&!`), sensor penuh, atau pertahankan huruf pertama dan terakhir
- Deteksi variasi penulisan: leetspeak (`4nj1ng`), kata terpisah (`a-n-j-i-n-g`), dan typo via Levenshtein distance
- Analisis teks: skor keparahan (0-1), kategorisasi, analisis per kalimat, pencarian konteks sekitar, dan batch analysis
- Mendukung whitelist kata dan daftar kata kustom (`wordList`)
- Preset siap pakai: `strict`, `moderate`, `light`, dan `childSafe`
- Dukungan penuh TypeScript dengan tipe data lengkap

## Instalasi

```bash
npm install @sideid/id-profanity-filter
# atau
bun add @sideid/id-profanity-filter
# atau
pnpm add @sideid/id-profanity-filter
```

## Penggunaan dasar

### Menggunakan class IDProfanityFilter

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

const filter = new IDProfanityFilter();
const teks = 'Dasar anjing kamu, jangan banyak bacot!';

// Cek apakah teks mengandung kata kotor
if (filter.isProfane(teks)) {
  // Sensor kata kotor
  const hasil = filter.filter(teks);
  console.log(hasil.filtered);
  // Output: "Dasar ****** kamu, jangan banyak *****!"
  console.log(hasil.censored);
  // Output: 2

  // Analisis detail
  const analisis = filter.analyze(teks);
  console.log(analisis.categories);
  // Output: ["profanity", "insult"]
  console.log(analisis.regions);
  // Output: ["general", "jawa"]
  console.log(analisis.severityScore);
  // Output: 0.36
}
```

### Menggunakan fungsi statis (idFilter)

Jika tidak memerlukan konfigurasi instance khusus, gunakan helper `idFilter`:

```typescript
import { idFilter } from '@sideid/id-profanity-filter';

const teks = 'Dasar anjing kamu, jangan banyak bacot!';

// Filter langsung
const hasil = idFilter.filter(teks);
console.log(hasil.filtered);

// Cek cepat
console.log(idFilter.isProfane(teks)); // true
```

### Menggunakan preset

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

const filter = new IDProfanityFilter();

// Gunakan preset childSafe dengan grawlix acak
filter.usePreset('childSafe', { useRandomGrawlix: true });

const hasil = filter.filter('Dasar anjing kamu!');
console.log(hasil.filtered);
// Output: "Dasar #@$%& kamu!"
```

## Dokumentasi API

### Kelas `IDProfanityFilter`

#### `constructor(options?: FilterOptions)`
Membuat instance filter baru dengan opsi default atau kustom.

#### `filter(text: string): FilterResult`
Menyensor kata kotor dalam teks. Mengembalikan objek:
- `filtered`: string hasil sensor
- `censored`: jumlah kata yang disensor
- `replacements`: daftar objek penggantian (`original`, `censored`, `metadata`)

#### `isProfane(text: string): boolean`
Mengembalikan `true` jika teks mengandung kata kotor.

#### `analyze(text: string): AnalysisResult`
Menganalisis teks secara menyeluruh. Mengembalikan objek:
- `hasProfanity`: boolean
- `matches`: string kata kotor yang cocok
- `matchDetails`: array objek `ProfanityWord` lengkap
- `categories`: kategori unik yang ditemukan
- `regions`: daerah asal kata yang ditemukan
- `severityScore`: skor keparahan kata (0 - 1)
- `similarWords`: kata yang mirip (jika `detectSimilarity` aktif)

#### `batchAnalyze(texts: string[])`
Menganalisis kumpulan teks sekaligus dan mengembalikan statistik agregat (total kata, teks bersih, rata-rata keparahan, kata paling sering muncul).

#### `analyzeBySentence(text: string)`
Memecah teks per kalimat dan menganalisis masing-masing kalimat secara independen.

#### `analyzeWithContext(text: string, contextWindowSize: number = 5)`
Mengambil kata kotor beserta konteks kata-kata di sekitarnya.

#### `setOptions(options: Partial<FilterOptions>)`
Memperbarui konfigurasi filter yang sedang berjalan.

#### `resetOptions(options: FilterOptions = {})`
Mengembalikan konfigurasi filter ke opsi default (dapat ditimpa dengan opsi baru).

#### `usePreset(presetName: string, additionalOptions?: Partial<FilterOptions>)`
Menerapkan preset filter (`strict`, `moderate`, `light`, `childSafe`).

#### `setWordList(wordList: string[])`
Mengatur daftar kata kustom yang akan digunakan oleh filter.

#### `addToWhitelist(word: string)` / `removeFromWhitelist(word: string)`
Menambahkan atau menghapus kata dari whitelist pengecualian.

#### `enableIndonesianVariations()`
Mengaktifkan deteksi variasi ejaan bahasa Indonesia (misalnya ejaan lama atau substitusi huruf lazim).

#### `enableSplitWordDetection()`
Mengaktifkan deteksi kata yang dipisah dengan spasi atau tanda baca (contoh: `a-n-j-i-n-g`).

#### `enableSimilarityDetection(threshold = 0.8, useLevenshtein = false, maxDistance = 2)`
Mengaktifkan deteksi kemiripan kata untuk menangkap typo atau variasi penulisan.

### Opsi Filter (`FilterOptions`)

| Properti | Tipe | Default | Deskripsi |
|---|---|---|---|
| `replaceWith` | `string` | `'*'` | Karakter pengganti kata yang disensor |
| `fullWordCensor` | `boolean` | `true` | Sensor seluruh karakter kata |
| `keepFirstAndLast` | `boolean` | `false` | Pertahankan huruf pertama dan terakhir saat sensor (`a****g`) |
| `useRandomGrawlix` | `boolean` | `false` | Gunakan karakter simbol acak (`#@$%&!`) |
| `detectLeetSpeak` | `boolean` | `true` | Deteksi variasi angka/simbol (`b4b1`, `4nj1ng`) |
| `detectSplit` | `boolean` | `false` | Deteksi kata dengan pemisah (`b-a-b-i`) |
| `indonesianVariation` | `boolean` | `false` | Deteksi variasi ejaan Indonesia |
| `detectSimilarity` | `boolean` | `false` | Deteksi kata typo atau mirip |
| `similarityThreshold` | `number` | `0.8` | Batas minimum kemiripan (0 - 1) |
| `useLevenshtein` | `boolean` | `false` | Gunakan algoritma Levenshtein distance |
| `maxLevenshteinDistance` | `number` | `2` | Jarak edit maksimum Levenshtein |
| `checkSubstring` | `boolean` | `false` | Deteksi kata kotor di dalam substring kata lain |
| `wordList` | `string[]` | `[]` | Daftar kata kustom (menggantikan daftar bawaan) |
| `whitelist` | `string[]` | `[]` | Daftar kata yang diabaikan dari filter |
| `categories` | `ProfanityCategory[]` | - | Filter hanya kategori tertentu |
| `regions` | `Region[]` | - | Filter hanya daerah tertentu |
| `severityThreshold` | `number` | `0` | Batas keparahan minimum kata (0 - 1) |

## Contoh penggunaan lanjutan

### Daftar kata kustom

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

const filter = new IDProfanityFilter({
  wordList: ['jelek', 'payah', 'curang'],
  replaceWith: '#',
});

const teks = 'Kualitas layanannya sangat jelek dan payah!';
const hasil = filter.filter(teks);

console.log(hasil.filtered);
// Output: "Kualitas layanannya sangat ##### dan #####!"
```

### Deteksi typo dan Levenshtein distance

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

const filter = new IDProfanityFilter();
filter.enableLevenshteinDetection(0.8, 2);

const teks = 'Dia benar-benar anjiing sekali!';
const hasil = filter.filter(teks);

console.log(hasil.filtered);
// Output: "Dia benar-benar ******* sekali!"
```

### Whitelist kontekstual

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

const filter = new IDProfanityFilter();
filter.addToWhitelist('anjing');

const teks = 'Anjing peliharaan saya setia sekali.';
console.log(filter.isProfane(teks)); // false
```

### Analisis per kalimat

```typescript
import IDProfanityFilter from '@sideid/id-profanity-filter';

const filter = new IDProfanityFilter();
const teks = 'Filmnya bagus sekali. Tapi pemainnya seperti anjing, aktingnya buruk.';

const hasilKalimat = filter.analyzeBySentence(teks);
hasilKalimat.forEach((item) => {
  console.log(`${item.sentence} -> ${item.hasProfanity ? 'Kotor' : 'Bersih'}`);
});
// "Filmnya bagus sekali." -> Bersih
// "Tapi pemainnya seperti anjing, aktingnya buruk." -> Kotor
```

## Cakupan daerah dan kategori

### Bahasa daerah
- `general`: Bahasa Indonesia umum
- `jawa`: Bahasa Jawa
- `sunda`: Bahasa Sunda
- `betawi`: Dialek Betawi
- `batak`: Bahasa Batak
- `minang`: Bahasa Minang
- `bali`: Bahasa Bali
- `madura`: Bahasa Madura
- `aceh`: Bahasa Aceh

### Kategori kata
- `sexual`: Istilah atau aktivitas seksual vulgar
- `insult`: Penghinaan atau caci maki
- `profanity`: Umpatan kasar umum
- `slur`: Kata merendahkan SARA / identitas
- `drugs`: Istilah obat-obatan terlarang
- `disgusting`: Kata jorok atau menjijikkan
- `blasphemy`: Umpatan penistaan agama

## Kontribusi

Panduan untuk menambahkan kata baru atau mengembangkan library dapat dilihat di [CONTRIBUTING.md](CONTRIBUTING.md).

## Lisensi

Proyek ini menggunakan lisensi [MIT](LICENSE).
