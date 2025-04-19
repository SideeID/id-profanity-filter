import { escapeRegExp } from './stringUtils';
import { RegexOptions } from '../types';

/**
 * Membuat pola regex untuk mencocokkan kata
 *
 * @param word Kata yang akan dibuat pola regex-nya
 * @param options Opsi untuk pembuatan regex
 * @returns Objek RegExp
 */
export function createWordRegex(word: string, options: RegexOptions = {}): RegExp {
  const {
    wholeWord = true,
    caseSensitive = false,
    leetSpeak = true,
    detectSplit = false,
    indonesianVariation = false,
  } = options;

  // Escape karakter khusus regex
  let pattern = escapeRegExp(word);

  // Tambahkan variasi leet speak jika diminta
  if (leetSpeak) {
    pattern = addLeetSpeakVariations(pattern);
  }

  // Tambahkan variasi ejaan Bahasa Indonesia jika diminta
  if (indonesianVariation) {
    pattern = addIndonesianVariations(pattern);
  }

  // Tambahkan kemungkinan split jika diminta
  if (detectSplit) {
    pattern = addSplitVariations(pattern);
  }

  // Tambahkan boundary untuk whole word jika diminta
  if (wholeWord) {
    pattern = `\\b${pattern}\\b`;
  }

  // Buat regex dengan flag case-insensitive jika diminta
  return new RegExp(pattern, caseSensitive ? 'g' : 'gi');
}

/**
 * Menambahkan variasi leet speak ke pola regex
 *
 * Contoh:
 * - 'a' bisa jadi '4', '@'
 * - 'i' bisa jadi '1', '!'
 *
 * @param pattern Pola regex asli
 * @returns Pola regex dengan variasi leet speak
 */
export function addLeetSpeakVariations(pattern: string): string {
  const leetMap: Record<string, string[]> = {
    a: ['a', '4', '@'],
    b: ['b', '8', '6'],
    c: ['c', '\\(', '\\{', '<'],
    e: ['e', '3'],
    g: ['g', '6', '9'],
    i: ['i', '1', '!', '\\|'],
    l: ['l', '1', '\\|'],
    o: ['o', '0'],
    s: ['s', '5', '\\$'],
    t: ['t', '7', '\\+'],
    z: ['z', '2'],
  };

  return pattern
    .split('')
    .map((char) => {
      const lowerChar = char.toLowerCase();
      const variations = leetMap[lowerChar];

      if (variations && variations.length > 1) {
        return `[${variations.join('')}]`;
      }

      return char;
    })
    .join('');
}

/**
 * Menambahkan kemungkinan split/pemisahan antar karakter
 *
 * @param pattern Pola regex asli
 * @returns Pola regex dengan kemungkinan split
 */
export function addSplitVariations(pattern: string): string {
  // Instead of joining character by character with a separator pattern,
  // we'll create a simpler version that matches the pattern with optional separators

  // Convert each character to a pattern that allows optional separators before it
  // except for the first character
  let result = '';
  const chars = pattern.split('');

  for (let i = 0; i < chars.length; i++) {
    if (i > 0) {
      // Add optional separator before each character except the first
      result += '[\\s\\-._*+]?';
    }
    result += chars[i];
  }

  return result;
}

/**
 * Membuat regex untuk mencari kata dengan variasi spasi dan karakter penghubung
 * Berguna untuk mendeteksi upaya menghindari filter dengan menambahkan spasi atau karakter lain
 *
 * @param word Kata yang akan dibuat pola regexnya
 * @returns Objek RegExp
 */
export function createEvasionRegex(word: string): RegExp {
  // Escape karakter khusus regex
  const escaped = escapeRegExp(word);

  // Create a regex pattern that allows any separator between characters
  let result = '';
  const chars = escaped.split('');

  for (let i = 0; i < chars.length; i++) {
    // Add the character
    result += chars[i];

    // Add optional separator after each character except the last
    if (i < chars.length - 1) {
      result += '[\\s\\-._*+]?';
    }
  }

  return new RegExp(result, 'gi');
}

/**
 * Menambahkan variasi ejaan Bahasa Indonesia
 *
 * @param pattern Pola regex asli
 * @returns Pola regex dengan variasi ejaan Bahasa Indonesia
 */
export function addIndonesianVariations(pattern: string): string {
  // Variasi ejaan dalam Bahasa Indonesia
  const variationMap: Record<string, string[]> = {
    c: ['c', 'k'], // contoh: becok/bekok
    k: ['k', 'c', 'q'], // contoh: kacau/qacau
    j: ['j', 'd'], // contoh: jualan/dualan (ejaan lama)
    y: ['y', 'j'], // contoh: ya/ja
    u: ['u', 'oe'], // contoh: untuk/oentoek (ejaan lama)
    f: ['f', 'p', 'v'], // contoh: kafir/kapir
    z: ['z', 'j', 's'], // contoh: zaman/jaman
    x: ['x', 'ks'], // contoh: taxi/taksi
  };

  // Go through each character in the pattern and replace with variations
  let result = '';
  for (const char of pattern) {
    const lowerChar = char.toLowerCase();
    const variations = variationMap[lowerChar];

    if (variations && variations.length > 1) {
      // Create a character class with all variations
      result += `[${variations.join('')}]`;
    } else {
      result += char;
    }
  }

  return result;
}

/**
 * Membuat regex untuk mencocokkan kata dengan mempertimbangkan variasi ejaan Bahasa Indonesia
 *
 * @param word Kata yang akan dibuat pola regexnya
 * @returns Objek RegExp
 */
export function createIndonesianVariationRegex(word: string): RegExp {
  const escapedWord = escapeRegExp(word);
  const pattern = addIndonesianVariations(escapedWord);
  return new RegExp(`\\b${pattern}\\b`, 'gi');
}

/**
 * Membuat regex untuk mencocokkan kata dengan konteks
 *
 * @param word Kata yang akan dibuat pola regexnya
 * @param contextSize Jumlah kata konteks sebelum dan sesudah
 * @returns Objek RegExp
 */
export function createContextRegex(word: string, contextSize: number = 3): RegExp {
  const wordPattern = escapeRegExp(word);

  // Membuat pola yang menangkap beberapa kata sebelum dan setelah kata target
  const pattern = `((?:\\S+\\s+){0,${contextSize}})(\\b${wordPattern}\\b)((?:\\s+\\S+){0,${contextSize}})`;

  return new RegExp(pattern, 'gi');
}

/**
 * Membuat regex untuk mencocokkan variasi penulisan kata
 *
 * @param word Kata dasar
 * @returns Objek RegExp untuk mencocokkan berbagai bentuk kata
 */
export function createWordFormRegex(word: string): RegExp {
  // Implementasi sederhana untuk mencocokkan berbagai imbuhan
  const escapedWord = escapeRegExp(word);

  // Common Indonesian prefixes and suffixes
  const prefixes = [
    '',
    'me',
    'pe',
    'ber',
    'di',
    'ter',
    'se',
    'ke',
    'mem',
    'pem',
    'bel',
    'peng',
    'meng',
  ];
  const suffixes = ['', 'kan', 'an', 'i', 'nya', 'lah', 'kah'];

  const patterns = [];

  for (const prefix of prefixes) {
    for (const suffix of suffixes) {
      patterns.push(`\\b${prefix}${escapedWord}${suffix}\\b`);
    }
  }

  if (/^[aiueo]/.test(word)) {
    patterns.push(`\\bng${escapedWord}\\b`);
  }

  return new RegExp(patterns.join('|'), 'gi');
}
