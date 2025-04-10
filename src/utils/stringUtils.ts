/**
 * Menyensor kata dengan karakter pengganti
 *
 * @param word Kata yang akan disensor
 * @param replaceChar Karakter pengganti (default: '*')
 * @param keepFirstAndLast Apakah harus menyimpan huruf pertama dan terakhir
 * @returns Kata yang telah disensor
 */
export function censorWord(
  word: string,
  replaceChar: string = '*',
  keepFirstAndLast: boolean = false,
): string {
  if (word.length <= 2) {
    return replaceChar.repeat(word.length);
  }

  if (keepFirstAndLast) {
    return `${word[0]}${replaceChar.repeat(word.length - 2)}${word[word.length - 1]}`;
  }

  return replaceChar.repeat(word.length);
}

/**
 * Menormalisasi string untuk keperluan pembandingan
 *
 * @param text Teks yang akan dinormalisasi
 * @returns Teks yang telah dinormalisasi
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalisasi Unicode
    .replace(/[\u0300-\u036f]/g, '') // Hapus diacritic marks
    .replace(/[^\w\s]/g, '') // Hapus karakter non-alphanumeric
    .trim(); // Hapus whitespace di awal dan akhir
}

/**
 * Mendeteksi apakah string berisi sebagian atau keseluruhan kata dalam wordList
 *
 * @param text Teks yang akan diperiksa
 * @param wordList Daftar kata yang dicari
 * @param checkSubstring Apakah harus memeriksa substring
 * @returns Boolean apakah teks mengandung kata-kata dalam wordList
 */
export function containsAnyWord(
  text: string,
  wordList: string[],
  checkSubstring: boolean = false,
): boolean {
  const normalizedText = normalizeText(text);

  return wordList.some((word) => {
    const normalizedWord = normalizeText(word);
    return checkSubstring
      ? normalizedText.includes(normalizedWord)
      : new RegExp(`\\b${escapeRegExp(normalizedWord)}\\b`, 'i').test(
          normalizedText,
        );
  });
}

/**
 * Memerikasa apakah stirng merupakan kode untuk kata kotor
 * (Menangkap kasus seperti disensor dengan titik atau garis: a**ing, b*bi, dll)
 *
 * @param text Teks yang akan diperika
 * @param wordList daftar kata kotor
 * @return Boolean apakah teks mengandung kata kotor
 */
export function containsEuphemism(text: string, wordList: string[]): boolean {
  return wordList.some((word) => {
    if (word.length <= 2) return false;

    const firstChar = word[0];
    const lastChar = word[word.length - 1];
    const pattern = new RegExp(
      `\\b${escapeRegExp(firstChar)}[*@#\\-_.!?\\s]{${word.length - 2}}${escapeRegExp(lastChar)}\\b`,
      'i',
    );

    return pattern.test(text);
  });
}

/**
 * Mendeteksi upaya menghindari filter dengan pemisahan kata
 * (Tangkap kasus seperti: a n j i n g, b-a-b-i, dll)
 *
 * @param text Teks yang akan diperiksa
 * @param wordList Daftar kata kotor
 * @returns Boolean apakah teks mengandung upaya menghindari filter
 */
export function detectSplitWords(text: string, wordList: string[]): boolean {
  const compressedText = text.replace(/[\s\-_.!?*]/g, '').toLowerCase();

  return wordList.some((word) => compressedText.includes(normalizeText(word)));
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}