import {
  ProfanityWord,
  ProfanityCategory,
  Region,
  FilterOptions,
} from '../types';

import { wordObjects, getWordsByFilter } from '../constants/wordList';

export function findProfanity(
  text: string,
  options: FilterOptions = {},
): string[] {
  const {
    wordList = [],
    detectLeetSpeak = true,
    checkSubstring = false,
    whitelist = [],
    categories,
    regions,
    severityThreshold = 0,
  } = options;

  const normalizedText = normalizeText(text);

  let wordsToCheck: string[] = wordList;

  if (wordsToCheck.length === 0) {
    if (categories || regions || severityThreshold > 0) {
      wordsToCheck = wordObjects
        .filter((word) => {
          const matchCategory = categories
            ? categories.includes(word.category)
            : true;
          const matchRegion = regions ? regions.includes(word.region) : true;
          const matchSeverity = word.severity >= severityThreshold;
          return matchCategory && matchRegion && matchSeverity;
        })
        .map((word) => word.word);
    } else {
      wordsToCheck = wordObjects.map((word) => word.word);
    }
  }

  wordsToCheck = wordsToCheck.filter(
    (word) => !whitelist.includes(word.toLocaleLowerCase()),
  );

  if (wordsToCheck.length === 0) {
    return [];
  }

  const matches = new Set<string>();

  wordsToCheck.forEach((word) => {
    const pattern = checkSubstring ? word : `\\b${escapeRegExp(word)}\\b`;

    const regex = new RegExp(pattern, 'gi');

    let match;
    while ((match = regex.exec(normalizedText)) !== null) {
      matches.add(match[0].toLowerCase());
    }
  });

  // jika detectLeetSpeak diaktifkan, cari variasi leet speak
  if (detectLeetSpeak) {
    wordsToCheck.forEach((word) => {
      // Cek leet speak
      const leetPattern = createLeetSpeakPattern(word);
      const leetRegex = new RegExp(
        checkSubstring ? leetPattern : `\\b${leetPattern}\\b`,
        'gi',
      );

      let match;
      while ((match = leetRegex.exec(text)) !== null) {
        matches.add(word.toLowerCase());
      }

      // cek karakter yang dipisah
      const evasionPattern = createEvasionPattern(word);
      const evasionRegex = new RegExp(evasionPattern, 'gi');
      while ((match = evasionRegex.exec(text)) !== null) {
        matches.add(word.toLowerCase());
      }
    });
  }

  return Array.from(matches);
}

/**
 * Menormalisasi teks untuk perbandingan
 *
 * @param text Teks untuk dinormalisasi
 * @returns Teks yang dinormalisasi
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalisasi Unicode
    .replace(/[\u0300-\u036f]/g, '') // Hapus diacritic marks
    .trim();
}

/**
 * Escape karakter khusus dalam regex
 *
 * @param string String untuk di-escape
 * @returns String yang sudah di-escape
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Pattern untuk leet speak
 *
 * @param word Kata untuk dibuat pattern leet speak
 * @return Pattern regex untuk leet speak
 */
function createLeetSpeakPattern(word: string): string {
  const leetMap: Record<string, string[]> = {
    a: ['a', '4', '@'],
    b: ['b', '8', '6'],
    c: ['c', '<', '(', '{'],
    e: ['e', '3'],
    g: ['g', '9'],
    i: ['i', '1', '!'],
    l: ['l', '1', '|'],
    o: ['o', '0'],
    s: ['s', '5', '$'],
    t: ['t', '7', '+'],
    z: ['z', '2'],
  };

  return word
    .split('')
    .map((char) => {
      const lowerChar = char.toLowerCase();
      const replacements = leetMap[lowerChar];

      if (replacements && replacements.length > 0) {
        return `[${replacements.join('')}]`;
      } else {
        return escapeRegExp(char);
      }
    })
    .join('');
}

/**
 * Pattern untuk deteksi upaya menghindari filter
 *
 * @param word Kata untuk dibuat pattern evasion
 * @return Pattern regex untuk evasion
 */
function createEvasionPattern(word: string): string {
  return word
    .split('')
    .map((char) => escapeRegExp(char))
    .join('[\\s\\-._*+]?');
}

/**
 * Mencari kata kotor lengkap dengan metadata
 *
 * @param text Teks yang akan diperika
 * @param options Opsi utnuk pencarian kata kotor
 * @return Array dari objek kata kotor yang ditemukan
 */
export function findProfanityWithMetadata(
  text: string,
  options: FilterOptions = {},
): ProfanityWord[] {
  const matches = findProfanity(text, options);
  if (matches.length === 0) {
    return [];
  }

  return matches
    .map((word) => {
      const wordObject = wordObjects.find(
        (obj) =>
          obj.word.toLowerCase() === word.toLowerCase() ||
          (obj.aliases &&
            obj.aliases.some(
              (alias) => alias.toLowerCase() === word.toLowerCase(),
            )),
      );

      return wordObject;
    })
    .filter((word): word is ProfanityWord => word !== undefined);
}
