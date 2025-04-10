# Panduan Kontribusi untuk ID-Profanity-Filter

Terima kasih telah mempertimbangkan untuk berkontribusi pada proyek ID-Profanity-Filter! Panduan ini akan menjelaskan proses kontribusi, terutama untuk menambahkan kata kotor baru ke dalam database.

## Cara Berkontribusi

### 1. Fork & Clone Repositori

- Fork repositori ini ke akun GitHub Anda
- Clone repositori fork Anda ke komputer lokal:
  ```bash
  git clone https://github.com/SideeID/id-profanity-filter.git
  cd id-profanity-filter
  ```

### 2. Install Dependensi

```bash
npm install
```

### 3. Buat Branch Baru

```bash
git checkout -b add-kata-kotor-daerah
```

## Struktur Kata Kotor

Kata-kata kotor dalam proyek ini dikelompokkan berdasarkan dua dimensi:

### Berdasarkan Daerah Asal

Lokasi file: `src/constants/regions/`

Kata-kata dikelompokkan berdasarkan daerah asalnya di Indonesia, seperti:
- `general.ts` - Kata-kata umum di Indonesia
- `jawa.ts` - Kata-kata dari Jawa
- `sunda.ts` - Kata-kata dari Sunda
- `betawi.ts` - Kata-kata dari Betawi
- `batak.ts` - Kata-kata dari Batak
- ... dan daerah lainnya

### Berdasarkan Kategori

Lokasi file: `src/constants/categories/`

Kata-kata juga dikelompokkan berdasarkan jenisnya:
- `sexual.ts` - Kata-kata berbau seksual
- `insult.ts` - Kata-kata penghinaan
- `profanity.ts` - Umpatan umum
- `slur.ts` - Kata-kata merendahkan berdasarkan identitas
- `drugs.ts` - Kata-kata terkait narkoba
- `disgusting.ts` - Kata-kata menjijikkan
- `blasphemy.ts` - Kata-kata penistaan agama

## Cara Menambahkan Kata Kotor Baru

### 1. Menambahkan ke File Daerah

Pilih file daerah yang sesuai di `src/constants/regions/` atau buat file baru jika daerah tersebut belum ada. Format entri kata kotor harus mengikuti interface `ProfanityWord`:

```typescript
{
  word: 'kata_kotor',        // Kata kotor dalam bentuk dasarnya
  category: 'insult',        // Kategori kata (sexual, insult, profanity, slur, drugs, disgusting, blasphemy)
  region: 'nama_daerah',     // Daerah asal kata
  severity: 0.7,             // Tingkat keparahan (0-1)
  aliases: ['alias1', 'alias2'], // Variasi atau alias kata (opsional)
  description: 'Deskripsi kata', // Penjelasan singkat tentang kata (opsional)
  context: 'Konteks penggunaan' // Informasi konteks penggunaan (opsional)
}
```

Contoh menambahkan kata ke file daerah (misalnya `bali.ts`):

```typescript
import { ProfanityWord } from '../../types';

export const bali: ProfanityWord[] = [
  // ... kata-kata yang sudah ada
  {
    word: 'cicing',
    category: 'profanity',
    region: 'bali',
    severity: 0.6,
    aliases: ['cicying'],
    description: 'Secara harfiah berarti anjing dalam Bahasa Bali',
    context: 'Umpatan umum dalam Bahasa Bali'
  },
  // ... tambahkan kata lainnya
];

export const baliWords = bali.map(item => item.word);

export default bali;
```

### 2. Menambahkan ke File Kategori (Opsional)

Jika Anda menambahkan kata baru, perbarui juga file kategori yang sesuai (`src/constants/categories/`). Kata-kata tersebut akan otomatis terambil saat library dibuild, tetapi terkadang kategori perlu diperbarui.

### 3. Update File indeks Daerah/Kategori (jika ada daerah baru)

Jika Anda menambahkan daerah baru, pastikan untuk memperbarui file indeks:
- `src/constants/regions/index.ts`
- `src/constants/wordList.ts`

### 4. Jalankan Tes (jika ada)

```bash
npm test
```

### 5. Build Library

```bash
npm run build
```

### 6. Commit dan Push Perubahan Anda

```bash
git add .
git commit -m "Menambahkan kata kotor daerah X"
git push origin add-kata-kotor-daerah
```

### 7. Buat Pull Request

Buat Pull Request dari branch Anda ke repositori utama.

## Pedoman Penambahan Kata

1. **Validasi Kata**: Pastikan kata tersebut benar-benar dianggap kasar di daerah yang dimaksud.
2. **Metadata**: Tambahkan metadata yang cukup, terutama tingkat keparahan dan kategori.
3. **Konteks**: Tambahkan komentar konteks jika diperlukan untuk menjelaskan kata tersebut.
4. **Bentuk Dasar**: Tambahkan kata dalam bentuk dasarnya, variasi dapat ditambahkan dalam `aliases`.
5. **Kategorisasi**: Kategorikan kata dengan benar (seksual, hinaan, umpatan, dll).
6. **Hindari Duplikasi**: Periksa apakah kata tersebut sudah ada sebelum menambahkannya.

## Format Commit

Gunakan format commit yang konsisten:
- `Add: Menambahkan kata X dari daerah Y`
- `Update: Memperbaiki metadata kata X`
- `Fix: Memperbaiki bug pada ...`

## Informasi Tambahan

Untuk pertanyaan atau diskusi, silakan buat issue di GitHub atau hubungi maintainer proyek. Terima kasih atas kontribusi Anda!