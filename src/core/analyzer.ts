import {
  FilterOptions,
  AnalysisResult,
  ProfanityCategory,
  Region,
} from '../types';
import {
  findProfanity,
  findProfanityWithMetadata,
  findCategories,
  findRegions,
  calculateSeverity,
} from './matcher';
import { splitIntoSentences } from '../utils/stringUtils';
import { findPossibleProfanityBySimiliarity } from '../utils/similarityUtils';
import { createContextRegex } from '../utils/regexUtils';
import { DEFAULT_OPTIONS } from '../config/options';

/**
 * Menganalisis teks untuk kata kotor
 *
 * @param text Teks yang akan dianalisis
 * @param options Opsi untuk analisis
 * @return AnalysisResult dengan hasil analisis
 */
export function analyze(
  text: string,
  options: FilterOptions = {},
): AnalysisResult {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const matches = findProfanity(text, mergedOptions);

  if (matches.length === 0) {
    return {
      hasProfanity: false,
      matches: [],
      matchDetails: [],
      categories: [],
      regions: [],
      severityScore: 0,
    };
  }

  const matchDetails = findProfanityWithMetadata(text, mergedOptions);
  const categories = findCategories(matchDetails);
  const regions = findRegions(matchDetails);
  const severityScore = calculateSeverity(matchDetails);

  let similarWords: Array<{
    word: string;
    original: string;
    similarity: number;
  }> = [];

  if (mergedOptions.detectSimilarity) {
    const wordList = matchDetails.map((word) => word.word);
    similarWords = findPossibleProfanityBySimiliarity(
      text,
      wordList,
      mergedOptions.similarityThreshold || 0.8,
    );
  }

  return {
    hasProfanity: true,
    matches,
    matchDetails,
    categories,
    regions,
    severityScore,
    similarWords: mergedOptions.detectSimilarity ? similarWords : undefined,
  };
}

/**
 * Menganalisis daftar teks dan ringkasan
 *
 * @param texts Daftar teks yang dianalisis
 * @param options Opsi untuk analisis
 * @return Objek dengan ringkasan analisis
 */
export function batchAnalyze(
  texts: string[],
  options: FilterOptions = {},
): {
  totalTexts: number;
  profaneTexts: number;
  cleanTexts: number;
  averageSeverity: number;
  topCategories: ProfanityCategory[];
  topRegions: Region[];
  mostFrequentWords: Array<{ word: string; count: number }>;
} {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const results = texts.map((text) => analyze(text, mergedOptions));
  const profaneTexts = results.filter((result) => result.hasProfanity).length;
  const totalSeverity = results.reduce(
    (sum, result) => sum + result.severityScore,
    0,
  );
  const averageSeverity = profaneTexts > 0 ? totalSeverity / profaneTexts : 0;
  const allCategories = results.flatMap((result) => result.categories);
  const categoryCount: Record<string, number> = {};

  allCategories.forEach((category) => {
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category as ProfanityCategory);

  const allRegions = results.flatMap((result) => result.regions);
  const regionCount: Record<string, number> = {};

  allRegions.forEach((region) => {
    regionCount[region] = (regionCount[region] || 0) + 1;
  });

  const topRegions = Object.entries(regionCount)
    .sort((a, b) => b[1] - a[1])
    .map(([region]) => region as Region);

  const allWords = results.flatMap((result) => result.matches);
  const wordCount: Record<string, number> = {};

  allWords.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  const mostFrequentWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  return {
    totalTexts: texts.length,
    profaneTexts,
    cleanTexts: texts.length - profaneTexts,
    averageSeverity,
    topCategories,
    topRegions,
    mostFrequentWords,
  };
}

/**
 * Menganalisis per-kalimat untuk melokalisasi kata kotor
 *
 * @param text Teks yang akan dianalisis per-kalimat
 * @param options Opsi untuk analisis
 * @returns Array hasil analisis per-kalimat
 */
export function analyzeBySentence(
  text: string,
  options: FilterOptions = {},
): Array<AnalysisResult & { sentence: string }> {
  const sentences = splitIntoSentences(text);
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  return sentences.map((sentence) => {
    const result = analyze(sentence, mergedOptions);

    return {
      ...result,
      sentence,
    };
  });
}

/**
 * Menganalisis teks untuk menemukan kata kotor pada konteks tertentu
 *
 * @param text Teks yang akan dianalisis
 * @param contextWindowSize Ukuran konteks (jumlah kata) di sekitar kata kotor
 * @param options Opsi untuk analisis
 * @returns Konteks di dekat kata kotor
 */
export function analyzeWithContext(
  text: string,
  contextWindowSize: number = 5,
  options: FilterOptions = {},
): Array<{
  word: string;
  context: string;
  position: { start: number; end: number };
}> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const matches = findProfanity(text, mergedOptions);

  if (matches.length === 0) {
    return [];
  }

  const result = [];

  for (const word of matches) {
    const regex = createContextRegex(word, contextWindowSize);

    let match;
    while ((match = regex.exec(text)) !== null) {
      const beforeContext = match[1] || '';
      const wordMatch = match[2];
      const afterContext = match[3] || '';

      result.push({
        word: wordMatch,
        context: beforeContext + wordMatch + afterContext,
        position: {
          start: match.index,
          end: match.index + match[0].length,
        },
      });
    }
  }

  return result;
}
