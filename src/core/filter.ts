import { FilterOptions, FilterResult, ProfanityWord } from "../types";
import { findProfanity, findProfanityWithMetadata } from "./matcher";
import { censorWord, escapeRegExp, normalizeText } from "../utils/stringUtils";
import { createWordRegex } from "../utils/regexUtils";
import {
  DEFAULT_OPTIONS,
  makeRandomGrawlixString,
  getRandomGrawlix,
} from "../config/options";

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
    useRandomGrawlix = false,
    keepFirstAndLast = false,
    indonesianVariation = false,
  } = { ...DEFAULT_OPTIONS, ...options };

  const matches = findProfanity(text, {
    ...options,
    detectLeetSpeak,
    whitelist,
    checkSubstring,
    indonesianVariation,
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

    const regex = createWordRegex(word, {
      wholeWord: true,
      caseSensitive: false,
      leetSpeak: false,
      detectSplit: false,
      indonesianVariation: false,
    });

    let match;
    const textToSearch = filteredText;

    regex.lastIndex = 0;

    while ((match = regex.exec(textToSearch)) !== null) {
      const originalWord = match[0];

      if (whitelist.includes(originalWord.toLowerCase())) continue;

      let censoredWord;
      if (useRandomGrawlix) {
        censoredWord = makeRandomGrawlixString(originalWord.length);
      } else {
        censoredWord = censorWord(
          originalWord,
          replaceWith,
          !fullWordCensor && keepFirstAndLast,
        );
      }

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
