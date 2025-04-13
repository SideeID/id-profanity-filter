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
  keepFirstAndLast: boolean = false
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
  checkSubstring: boolean = false
): boolean {
  const normalizedText = normalizeText(text);

  return wordList.some((word) => {
    const normalizedWord = normalizeText(word);
    return checkSubstring
      ? normalizedText.includes(normalizedWord)
      : new RegExp(`\\b${escapeRegExp(normalizedWord)}\\b`, 'i').test(normalizedText);
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
      'i'
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

/**
 * Mengganti sebagian kata dengan masking
 * (berguna untuk email, nomor telepon, dll)
 *
 * @param text Teks untuk dimasking
 * @param visibleStart Jumlah karakter yang terlihat di awal
 * @param visibleEnd Jumlah karakter yang terlihat di akhir
 * @param maskChar Karakter masking
 * @returns Teks yang telah dimasking
 */
export function maskText(
  text: string,
  visibleStart: number = 1,
  visibleEnd: number = 1,
  maskChar: string = '*'
): string {
  if (!text) return '';
  if (text.length <= visibleStart + visibleEnd) return text;

  const start = text.substring(0, visibleStart);
  const middle = maskChar.repeat(text.length - visibleStart - visibleEnd);
  const end = text.substring(text.length - visibleEnd);

  return start + middle + end;
}

/**
 * menguabh sting menjadi bentuk leet speak
 * (untuk testing filter bypass)
 *
 * @param text Teks yang akan diubah
 * @return Teks yang telah diubah ke leet speak
 */
export function toLeetSpeak(text: string): string {
  const leetMap: Record<string, string[]> = {
    a: ['4', '@'],
    b: ['8', '6'],
    c: ['<', '(', '{'],
    e: ['3'],
    g: ['9'],
    i: ['1', '!'],
    l: ['1', '|'],
    o: ['0'],
    s: ['5', '$'],
    t: ['7', '+'],
    z: ['2'],
  };

  return text
    .split('')
    .map((char) => {
      const lowerChar = char.toLowerCase();
      return leetMap[lowerChar] || char;
    })
    .join('');
}

/**
 * memisahkan teks menajdi kelimat
 *
 * @param text Teks yang akan dipisahkan
 * @return Array kalimat yang telah dipisahkan
 */
export function splitIntoSentences(text: string): string[] {
  // split berdasarkan titik, seru, taya yagn diikuti spasi atau akhir string
  return text.split(/(?<=[.!?])\s+|(?<=[.!?])$/).filter((sentence) => sentence.trim().length > 0);
}

/**
 * mengambil kata-kata di sekitar indeks tertentu
 *
 * @param text Teks yang akan diambil
 * @param index Indeks dalam teks
 * @param windowSize jumlah kata di sekitar indeks
 * @return Kata-kata di sekitar indeks
 */
export function getContextAroundIndex(text: string, index: number, windowSize: number = 5): string {
  if (!text || index < 0 || index >= text.length) return '';

  const words = text.split(/\s+/);

  let currentPosition = 0;
  let targetWordIndex = -1;

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length;
    if (index >= currentPosition && index < currentPosition + wordLength) {
      targetWordIndex = i;
      break;
    }
    // Tambahkan panjang kata dan spasi
    currentPosition += wordLength + 1;
  }

  if (targetWordIndex === -1) return '';

  // Ambil kata-kata di sekitar
  const startIndex = Math.max(0, targetWordIndex - windowSize);
  const endIndex = Math.min(words.length, targetWordIndex + windowSize + 1);

  return words.slice(startIndex, endIndex).join(' ');
}
