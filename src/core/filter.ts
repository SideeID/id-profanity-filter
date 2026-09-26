import { FilterOptions, FilterResult, ProfanityWord } from '../types';
import { findProfanity, findProfanityWithMetadata } from './matcher';
import { censorWord, escapeRegExp } from '../utils/stringUtils';
import { createWordRegex } from '../utils/regexUtils';
import { DEFAULT_OPTIONS, makeRandomGrawlixString } from '../config/options';

interface FindProfanityFunction {
  (text: string, options?: FilterOptions): string[];
  lastActualMatches?: Map<string, string[]>;
}

/**
 * Menyensor kata kotor dalam teks
 *
 * @param text Teks yang akan disensor
 * @param options Opsi untuk filter
 * @returns FilterResult dengan hasil filter
 */
export function filter(text: string, options: FilterOptions = {}): FilterResult {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    replaceWith = '*',
    fullWordCensor = true,
    detectLeetSpeak = true,
    whitelist = [],
    checkSubstring = false,
    useRandomGrawlix = false,
    keepFirstAndLast = false,
    detectSplit = false,
  } = mergedOptions;

  const matches = findProfanity(text, mergedOptions);

  if (matches.length === 0) {
    return {
      filtered: text,
      censored: 0,
      replacements: [],
    };
  }

  const actualMatches: Map<string, string[]> =
    (findProfanity as FindProfanityFunction).lastActualMatches || new Map();
  const matchDetails = findProfanityWithMetadata(text, mergedOptions);
  const normalizedWhitelist = whitelist.map((w) => w.toLowerCase());

  let filteredText = text;
  const replacements: Array<{
    original: string;
    censored: string;
    metadata?: ProfanityWord;
  }> = [];

  const getCensoredWord = (originalWord: string): string => {
    if (useRandomGrawlix) {
      return makeRandomGrawlixString(originalWord.length);
    }
    return censorWord(originalWord, replaceWith, !fullWordCensor && keepFirstAndLast);
  };

  const applyReplacement = (pattern: RegExp, metadata?: ProfanityWord) => {
    filteredText = filteredText.replace(pattern, (matchedStr) => {
      if (normalizedWhitelist.includes(matchedStr.toLowerCase())) {
        return matchedStr;
      }

      const censored = getCensoredWord(matchedStr);
      replacements.push({
        original: matchedStr,
        censored,
        metadata,
      });
      return censored;
    });
  };

  for (const word of matches) {
    const metadata = matchDetails.find(
      (m) =>
        m.word.toLowerCase() === word.toLowerCase() ||
        (m.aliases && m.aliases.some((alias) => alias.toLowerCase() === word.toLowerCase()))
    );

    const variants = actualMatches.get(word.toLowerCase()) || [];
    const allVariants = [...new Set([...variants, word])].sort((a, b) => b.length - a.length);

    for (const variant of allVariants) {
      const boundaryPattern = checkSubstring
        ? escapeRegExp(variant)
        : `\\b${escapeRegExp(variant)}\\b`;
      applyReplacement(new RegExp(boundaryPattern, 'gi'), metadata);
    }

    if (detectLeetSpeak) {
      const leetRegex = createWordRegex(word, {
        wholeWord: !checkSubstring,
        caseSensitive: false,
        leetSpeak: true,
        detectSplit: false,
        indonesianVariation: false,
      });
      applyReplacement(leetRegex, metadata);
    }

    if (detectSplit) {
      const splitRegex = createWordRegex(word, {
        wholeWord: false,
        caseSensitive: false,
        leetSpeak: false,
        detectSplit: true,
        indonesianVariation: false,
      });
      applyReplacement(splitRegex, metadata);
    }
  }

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
