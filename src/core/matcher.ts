import {
  ProfanityWord,
  ProfanityCategory,
  Region,
  FilterOptions,
} from "../types";

import { wordObjects, getWordsByFilter } from "../constants/wordList";
import {
  normalizeText,
  escapeRegExp,
  containsAnyWord,
  detectSplitWords,
} from "../utils/stringUtils";
import {
  createWordRegex,
  addLeetSpeakVariations,
  addIndonesianVariations,
  addSplitVariations,
} from "../utils/regexUtils";
import {
  findPossibleProfanityBySimiliarity,
  stringSimilarity,
} from "../utils/similarityUtils";
import { DEFAULT_OPTIONS } from "../config/options";

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
    indonesianVariation = false,
    detectSimilarity = false,
    similarityThreshold = 0.8,
    detectSplit = false,
  } = { ...DEFAULT_OPTIONS, ...options };

  const normalizedText = normalizeText(text);

  let wordsToCheck: string[] = wordList.length > 0 ? wordList : [];

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
    const regex = createWordRegex(word, {
      wholeWord: !checkSubstring,
      caseSensitive: false,
      leetSpeak: false,
      detectSplit: false,
      indonesianVariation: false,
    });

    let match;
    while ((match = regex.exec(normalizedText)) !== null) {
      matches.add(word.toLowerCase());
    }
  });

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
        matches.add(word.toLowerCase());
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
        matches.add(word.toLowerCase());
      }
    });
  }

  if (detectSplit) {
    if (detectSplitWords(text, wordsToCheck)) {
      wordsToCheck.forEach((word) => {
        const splitRegex = createWordRegex(word, {
          wholeWord: false,
          caseSensitive: false,
          leetSpeak: false,
          detectSplit: true,
          indonesianVariation: false,
        });

        if (splitRegex.test(text)) {
          matches.add(word.toLowerCase());
        }
      });
    }
  }

  if (detectSimilarity) {
    const possibleProfanity = findPossibleProfanityBySimiliarity(
      text,
      wordsToCheck,
      similarityThreshold,
    );

    possibleProfanity.forEach((item) => {
      matches.add(item.original.toLowerCase());
    });
  }

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

/**
 * Mencari kategory kata kotor yang ada dalam teks
 *
 * @param matchDetails Hasil pencarian dari fingProfanityWithMetadata()
 * @return Array kategori unik
 */
export function findCategories(
  matchDetails: ProfanityWord[],
): ProfanityCategory[] {
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

  // Gabungkan jumlah kata dan keparahan rata-rata
  // 70% keparahan kata + 30% faktor jumlah
  return 0.7 * severityAvg + 0.3 * countFactor;
}
