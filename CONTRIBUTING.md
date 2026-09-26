# Panduan kontribusi

Panduan ini menjelaskan alur kerja untuk mengembangkan kode dan menambahkan kata baru ke dalam database kata kotor `id-profanity-filter`.

## Memulai pengembangan

1. Fork repositori ini ke akun GitHub Anda, lalu clone secara lokal:
   ```bash
   git clone https://github.com/username/id-profanity-filter.git
   cd id-profanity-filter
   ```

2. Pasang dependensi:
   ```bash
   bun install
   # atau
   npm install
   ```

3. Buat branch baru untuk fitur atau perbaikan Anda:
   ```bash
   git checkout -b feature/tambah-kata-daerah
   ```

## Struktur data kata

Kata-kata kotor dalam proyek ini dikelompokkan ke dalam dua dimensi:

### 1. Berdasarkan daerah asal (`src/constants/regions/`)
File daerah saat ini mencakup:
- `general.ts`: kata umum nasional
- `jawa.ts`: bahasa Jawa
- `sunda.ts`: bahasa Sunda
- `betawi.ts`: dialek Betawi
- `batak.ts`: bahasa Batak
- `minang.ts`: bahasa Minang
- `bali.ts`: bahasa Bali
- `madura.ts`: bahasa Madura
- `aceh.ts`: bahasa Aceh

### 2. Berdasarkan kategori (`src/constants/categories/`)
- `sexual.ts`: istilah seksual vulgar
- `insult.ts`: hinaan dan caci maki
- `profanity.ts`: umpatan umum
- `slur.ts`: kata diskriminatif / pelecehan SARA
- `drugs.ts`: istilah narkoba
- `disgusting.ts`: hal jorok atau menjijikkan
- `blasphemy.ts`: penistaan agama

## Menambahkan kata kotor baru

Setiap entri kata kotor harus mengikuti interface `ProfanityWord`:

```typescript
{
  word: 'kata_dasar',          // Kata kotor dalam bentuk dasar
  category: 'insult',          // Kategori kata
  region: 'jawa',              // Daerah asal kata
  severity: 0.7,               // Tingkat keparahan dari 0.0 sampai 1.0
  aliases: ['alias1', 'alias2'], // Variasi penulisan atau singkatan lazim (opsional)
  description: 'Penjelasan',   // Arti kata (opsional)
  context: 'Konteks kata'      // Situasi penggunaan kata (opsional)
}
```

### Langkah penambahan kata

1. Tambahkan objek kata ke file daerah terkait di `src/constants/regions/<daerah>.ts`.
2. Jika kata termasuk ke kategori tertentu, pastikan kata juga tercatat di `src/constants/categories/<kategori>.ts`.
3. Pastikan kata didaftarkan pada `wordObjects` di `src/constants/wordList.ts` jika menambahkan file daerah baru.

## Pengujian dan build

Sebelum membuat pull request, jalankan pengujian dan linter untuk memastikan tidak ada regresi:

```bash
# Jalankan test suite
bun test
# atau
npm test

# Jalankan linter
bun run lint
# atau
npm run lint

# Pastikan build bundle berhasil
bun run build
# atau
npm run build
```

## Pedoman kurasi kata

- **Bentuk dasar**: Masukkan kata dalam bentuk dasar (tanpa imbuhan). Variasi ejaan dapat dimasukkan ke dalam `aliases`.
- **Hindari alias terlalu pendek yang ambigu**: Jangan menambahkan alias 1 atau 2 huruf jika kata tersebut merupakan kata umum atau singkatan lazim dalam bahasa Indonesia (misalnya `we`, `sl`, `cd`) untuk mencegah false positive.
- **Skor keparahan realistis**:
  - `0.1 - 0.4`: Celaan ringan atau umpatan santai sehari-hari
  - `0.5 - 0.7`: Hinaan kasar atau umpatan bernada marah
  - `0.8 - 1.0`: Kata seksual vulgar eksplisit, penistaan, atau slur diskriminatif berat
- **Cek duplikasi**: Pastikan kata belum ada di file daerah lain sebelum menambahkan.

## Mengajukan perubahan

Commit perubahan Anda dengan pesan yang jelas dan deskriptif:

```bash
git add -A
git commit -m "feat(words): tambah kata kasar dari bahasa Jawa"
git push origin feature/tambah-kata-daerah
```

Lalu buat pull request ke branch `main` repositori utama dengan deskripsi kata apa saja yang ditambahkan beserta artinya.