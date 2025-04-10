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
export function filter(
  text: string,
  options: FilterOptions = {},
): FilterResult {
  const {
    replaceWith = '*',
    fullWordCensor = true,
    detectLeetSpeak = true,
    whitelist = [],
    checkSubstring = false,
    useRandomGrawlix = false,
    keepFirstAndLast = false,
    indonesianVariation = false,
    detectSplit = false,
    detectSimilarity = false,
    useLevenshtein = false,
    maxLevenshteinDistance = 2,
    similarityThreshold = 0.8,
  } = { ...DEFAULT_OPTIONS, ...options };

  const matches = findProfanity(text, {
    ...options,
    detectLeetSpeak,
    whitelist,
    checkSubstring,
    indonesianVariation,
    detectSplit,
    detectSimilarity,
    useLevenshtein,
    maxLevenshteinDistance,
    similarityThreshold,
  });

  const actualMatches: Map<string, string[]> =
    (findProfanity as FindProfanityFunction).lastActualMatches || new Map();

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

    const variants = actualMatches.get(word.toLowerCase()) || [];
    variants.push(word);

    const uniqueVariants = [...new Set(variants)];

    uniqueVariants.forEach((variant) => {
      const regex = new RegExp(`\\b${escapeRegExp(variant)}\\b`, 'gi');

      let match;
      while ((match = regex.exec(filteredText)) !== null) {
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

        filteredText = filteredText.replace(
          new RegExp(`\\b${escapeRegExp(originalWord)}\\b`, 'g'),
          censoredWord,
        );
      }
    });

    if (detectSplit || detectLeetSpeak) {
      if (detectLeetSpeak) {
        const leetRegex = createWordRegex(word, {
          wholeWord: true,
          caseSensitive: false,
          leetSpeak: true,
          detectSplit: false,
          indonesianVariation: false,
        });

        let match;
        while ((match = leetRegex.exec(filteredText)) !== null) {
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

          filteredText = filteredText.replace(
            new RegExp(escapeRegExp(originalWord), 'g'),
            censoredWord,
          );
        }
      }

      if (detectSplit) {
        const splitRegex = createWordRegex(word, {
          wholeWord: false,
          caseSensitive: false,
          leetSpeak: false,
          detectSplit: true,
          indonesianVariation: false,
        });

        let match;
        while ((match = splitRegex.exec(filteredText)) !== null) {
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

          filteredText = filteredText.replace(
            new RegExp(escapeRegExp(originalWord), 'g'),
            censoredWord,
          );
        }
      }
    }
  });

  if (detectSimilarity && useLevenshtein) {
    matches.forEach((word) => {
      const metadata = matchDetails.find(
        (m) =>
          m.word.toLowerCase() === word.toLowerCase() ||
          (m.aliases &&
            m.aliases.some(
              (alias) => alias.toLowerCase() === word.toLowerCase(),
            )),
      );

      const variants = actualMatches.get(word.toLowerCase()) || [];

      variants.forEach((variant) => {
        const exactVariantRegex = new RegExp(
          `\\b${escapeRegExp(variant)}\\b`,
          'gi',
        );

        let match;
        while ((match = exactVariantRegex.exec(filteredText)) !== null) {
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

          filteredText = filteredText.replace(
            new RegExp(`\\b${escapeRegExp(originalWord)}\\b`, 'g'),
            censoredWord,
          );
        }
      });
    });
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
