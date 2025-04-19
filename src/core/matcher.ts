import { ProfanityWord, ProfanityCategory, Region, FilterOptions } from '../types';

import { wordObjects } from '../constants/wordList';
import { normalizeText } from '../utils/stringUtils';
import { createWordRegex } from '../utils/regexUtils';
import {
  findPossibleProfanityBySimiliarity,
  findProfanityByLevenshteinDistance,
} from '../utils/similarityUtils';
import { DEFAULT_OPTIONS } from '../config/options';
import { AhoCorasick } from '../utils/ahoCorasick';

const globalAhoCorasick = new AhoCorasick();
let ahoCorasickInitialized = false;

function initializeAhoCorasick(words: string[]) {
  if (ahoCorasickInitialized) return;

  for (const word of words) {
    globalAhoCorasick.addPattern(word);
  }

  globalAhoCorasick.build();
  ahoCorasickInitialized = true;
}

interface FindProfanityFunction {
  (text: string, options?: FilterOptions): string[];
  lastActualMatches?: Map<string, string[]>;
}

function getWordMetadata(word: string): ProfanityWord | undefined {
  return wordObjects.find(
    (obj) =>
      obj.word.toLowerCase() === word.toLowerCase() ||
      (obj.aliases && obj.aliases.some((alias) => alias.toLowerCase() === word.toLowerCase()))
  );
}

export function findProfanity(text: string, options: FilterOptions = {}): string[] {
  const {
    wordList = [],
    detectLeetSpeak = true,
    checkSubstring = false,
    whitelist = [],
    categories,
    regions,
    severityThreshold = 0,
    indonesianVariation = false,
    detectSimilarity = false,
    similarityThreshold = 0.8,
    detectSplit = false,
    useLevenshtein = false,
    maxLevenshteinDistance = 2,
  } = { ...DEFAULT_OPTIONS, ...options };

  const normalizedWhitelist = whitelist.map((w) => w.toLowerCase());

  const normalizedText = normalizeText(text);

  let baseWordsToCheck: string[] = wordList.length > 0 ? wordList : [];

  if (baseWordsToCheck.length === 0) {
    const filteredWords = wordObjects.filter((word) => {
      const matchCategory = categories ? categories.includes(word.category) : true;
      const matchRegion = regions ? regions.includes(word.region) : true;
      const matchSeverity = word.severity >= severityThreshold;
      return matchCategory && matchRegion && matchSeverity;
    });

    baseWordsToCheck = filteredWords.map((word) => word.word);
  }

  const aliasMap = new Map<string, string>();
  wordObjects.forEach((wordObj) => {
    const matchCategory = categories ? categories.includes(wordObj.category) : true;
    const matchRegion = regions ? regions.includes(wordObj.region) : true;
    const matchSeverity = wordObj.severity >= severityThreshold;

    if (
      matchCategory &&
      matchRegion &&
      matchSeverity &&
      wordObj.aliases &&
      wordObj.aliases.length > 0
    ) {
      wordObj.aliases.forEach((alias) => {
        aliasMap.set(alias.toLowerCase(), wordObj.word.toLowerCase());
      });
    }
  });

  const wordsToCheck = [...baseWordsToCheck, ...Array.from(aliasMap.keys())].filter(
    (word) => !normalizedWhitelist.includes(word.toLowerCase())
  );

  if (wordsToCheck.length === 0) {
    return [];
  }

  const matches = new Set<string>();
  const actualMatches = new Map<string, string[]>();

  const passesFilters = (word: string): boolean => {
    if (normalizedWhitelist.includes(word.toLowerCase())) return false;

    const metadata = getWordMetadata(word);
    if (!metadata) return false;

    const matchCategory = categories ? categories.includes(metadata.category) : true;
    const matchRegion = regions ? regions.includes(metadata.region) : true;
    const matchSeverity = metadata.severity >= severityThreshold;

    return matchCategory && matchRegion && matchSeverity;
  };

  initializeAhoCorasick(wordsToCheck);

  const basicMatches = globalAhoCorasick.searchUnique(normalizedText);
  for (const match of basicMatches) {
    if (normalizedWhitelist.includes(match.toLowerCase())) continue;

    const originalWord = aliasMap.get(match.toLowerCase()) || match.toLowerCase();

    if (!passesFilters(originalWord)) continue;

    matches.add(originalWord);

    if (!actualMatches.has(originalWord)) {
      actualMatches.set(originalWord, []);
    }
    actualMatches.get(originalWord)?.push(match);
  }

  if (detectLeetSpeak) {
    wordsToCheck.forEach((word) => {
      const leetRegex = createWordRegex(word, {
        wholeWord: !checkSubstring,
        caseSensitive: false,
        leetSpeak: true,
        detectSplit: false,
        indonesianVariation: false,
      });

      let match;
      while ((match = leetRegex.exec(text)) !== null) {
        const matchedText = match[0];
        if (normalizedWhitelist.includes(matchedText.toLowerCase())) continue;

        const originalWord = aliasMap.get(word.toLowerCase()) || word.toLowerCase();

        if (!passesFilters(originalWord)) continue;

        matches.add(originalWord);

        if (!actualMatches.has(originalWord)) {
          actualMatches.set(originalWord, []);
        }
        actualMatches.get(originalWord)?.push(match[0]);
      }
    });
  }

  if (indonesianVariation) {
    wordsToCheck.forEach((word) => {
      const variantRegex = createWordRegex(word, {
        wholeWord: !checkSubstring,
        caseSensitive: false,
        leetSpeak: false,
        detectSplit: false,
        indonesianVariation: true,
      });

      let match;
      while ((match = variantRegex.exec(text)) !== null) {
        const matchedText = match[0];
        if (normalizedWhitelist.includes(matchedText.toLowerCase())) continue;

        const originalWord = aliasMap.get(word.toLowerCase()) || word.toLowerCase();

        if (!passesFilters(originalWord)) continue;

        matches.add(originalWord);

        if (!actualMatches.has(originalWord)) {
          actualMatches.set(originalWord, []);
        }
        actualMatches.get(originalWord)?.push(match[0]);
      }
    });
  }

  if (detectSplit) {
    wordsToCheck.forEach((word) => {
      const splitRegex = createWordRegex(word, {
        wholeWord: false,
        caseSensitive: false,
        leetSpeak: false,
        detectSplit: true,
        indonesianVariation: false,
      });

      let match;
      while ((match = splitRegex.exec(text)) !== null) {
        const matchedText = match[0];
        if (normalizedWhitelist.includes(matchedText.toLowerCase())) continue;

        const originalWord = aliasMap.get(word.toLowerCase()) || word.toLowerCase();

        if (!passesFilters(originalWord)) continue;

        matches.add(originalWord);

        if (!actualMatches.has(originalWord)) {
          actualMatches.set(originalWord, []);
        }
        actualMatches.get(originalWord)?.push(match[0]);
      }
    });
  }

  if (detectSimilarity) {
    if (useLevenshtein) {
      const possibleProfanity = findProfanityByLevenshteinDistance(
        text,
        wordsToCheck,
        similarityThreshold,
        maxLevenshteinDistance
      );

      possibleProfanity.forEach((item) => {
        if (normalizedWhitelist.includes(item.word.toLowerCase())) return;

        const originalWord =
          aliasMap.get(item.original.toLowerCase()) || item.original.toLowerCase();
        if (!passesFilters(originalWord)) return;

        matches.add(originalWord);

        if (!actualMatches.has(originalWord)) {
          actualMatches.set(originalWord, []);
        }
        actualMatches.get(originalWord)?.push(item.word);
      });
    } else {
      const possibleProfanity = findPossibleProfanityBySimiliarity(
        text,
        wordsToCheck,
        similarityThreshold
      );

      possibleProfanity.forEach((item) => {
        if (normalizedWhitelist.includes(item.word.toLowerCase())) return;

        const originalWord =
          aliasMap.get(item.original.toLowerCase()) || item.original.toLowerCase();
        if (!passesFilters(originalWord)) return;

        matches.add(originalWord);

        if (!actualMatches.has(originalWord)) {
          actualMatches.set(originalWord, []);
        }
        actualMatches.get(originalWord)?.push(item.word);
      });
    }
  }

  (findProfanity as FindProfanityFunction).lastActualMatches = actualMatches;

  return Array.from(matches);
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
  options: FilterOptions = {}
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
          (obj.aliases && obj.aliases.some((alias) => alias.toLowerCase() === word.toLowerCase()))
      );

      return wordObject;
    })
    .filter((word): word is ProfanityWord => word !== undefined);
}

/**
 * Mencari kategory kata kotor yang ada dalam teks
 *
 * @param matchDetails Hasil pencarian dari fingProfanityWithMetadata()
 * @return Array kategori unik
 */
export function findCategories(matchDetails: ProfanityWord[]): ProfanityCategory[] {
  const categories = new Set<ProfanityCategory>();

  matchDetails.forEach((word) => {
    categories.add(word.category);
  });

  return Array.from(categories);
}

/**
 * Mencari region kata kotor yang ada dalam teks
 *
 * @param matchDetails Hasil pencarian dari fingProfanityWithMetadata()
 * @return Array region unik
 */
export function findRegions(matchDetails: ProfanityWord[]): Region[] {
  const regions = new Set<Region>();

  matchDetails.forEach((word) => {
    regions.add(word.region);
  });

  return Array.from(regions);
}

/**
 * Menghitung tingkat keparahan kata kotor yang ditemukan
 *
 * @param matchDetails Hasil pencarian dari findProfanityWithMetadata()
 * @return Skor keparahan dari 0-1
 */
export function calculateSeverity(matchDetails: ProfanityWord[]): number {
  if (matchDetails.length === 0) {
    return 0;
  }

  const countFactor = Math.min(matchDetails.length / 10, 1); // Maksimal 10 kata

  const categoryWeights: Record<ProfanityCategory, number> = {
    sexual: 0.9,
    blasphemy: 0.9,
    slur: 0.8,
    profanity: 0.7,
    insult: 0.6,
    drugs: 0.5,
    disgusting: 0.5,
  };

  let severitySum = 0;
  matchDetails.forEach((word) => {
    const categoryWeight = categoryWeights[word.category] || 0.5;
    const wordSeverity = word.severity * categoryWeight;
    severitySum += wordSeverity;
  });

  const severityAvg = severitySum / matchDetails.length;

  return 0.7 * severityAvg + 0.3 * countFactor;
}
