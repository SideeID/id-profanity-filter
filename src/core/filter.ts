import { FilterOptions, FilterResult, ProfanityWord } from "../types";
import { findProfanity, findProfanityWithMetadata } from "./matcher";

/**
 * Menyensor kata kotor dalam teks
 *
 * @param text Teks yang akan disensor
 * @param options Opsi untuk filter
 * @returns FilterResult dengan hasil filter
 */
export function filter(
  text: string,
  options: FilterOptions = {},
): FilterResult {
  const {
    replaceWith = "*",
    fullWordCensor = true,
    detectLeetSpeak = true,
    whitelist = [],
    checkSubstring = false,
  } = options;

  const matches = findProfanity(text, {
    ...options,
    detectLeetSpeak,
    whitelist,
    checkSubstring,
  });

  const matchDetails = findProfanityWithMetadata(text, options);

  if (matches.length === 0) {
    return {
      filtered: text,
      censored: 0,
      replacements: [],
    };
  }

  let filteredText = text;

  const replacements: Array<{
    original: string;
    censored: string;
    metadata?: ProfanityWord;
  }> = [];

  matches.forEach((word) => {
    const metadata = matchDetails.find(
      (m) =>
        m.word.toLowerCase() === word.toLowerCase() ||
        (m.aliases &&
          m.aliases.some(
            (alias) => alias.toLowerCase() === word.toLowerCase(),
          )),
    );

    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi");

    let match;
    while ((match = regex.exec(filteredText)) !== null) {
      const originalWord = match[0];

      if (whitelist.includes(originalWord.toLowerCase())) continue;

      const censoredWord = fullWordCensor
        ? replaceWith.repeat(originalWord.length)
        : censorPartialWord(originalWord, replaceWith);

      replacements.push({
        original: originalWord,
        censored: censoredWord,
        metadata,
      });

      const replaceRegex = new RegExp(
        `\\b${escapeRegExp(originalWord)}\\b`,
        "g",
      );
      filteredText = filteredText.replace(replaceRegex, censoredWord);
    }
  });

  // if (detectLeetSpeak) {
  // }

  return {
    filtered: filteredText,
    censored: replacements.length,
    replacements,
  };
}

/**
 * Memeriksa apakah teks mengandung kata kotor
 *
 * @param text Teks yang akan diperiksa
 * @param options Opsi untuk pemeriksaan
 * @returns Boolean apakah teks mengandung kata kotor
 */
export function isProfane(text: string, options: FilterOptions = {}): boolean {
  const matches = findProfanity(text, options);
  return matches.length > 0;
}

/**
 * Escape karakter khusus regex
 *
 * @param string String untuk di-escape
 * @returns String yang telah di-escape
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Menyensor sebagian kata
 * @param word Kata yang akan disensor
 * @param replaceChar Karakter pengganti
 * @returns Kata yang sudah disensor sebagian
 */
function censorPartialWord(word: string, replaceChar: string): string {
  if (word.length <= 2) {
    return replaceChar.repeat(word.length);
  }

  // Simpan huruf pertama dan terakhir, sensor yang lain
  return word[0] + replaceChar.repeat(word.length - 2) + word[word.length - 1];
}
