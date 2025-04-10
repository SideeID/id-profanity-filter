import {
  FilterOptions,
  AnalysisResult,
  ProfanityWord,
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
  const matches = findProfanity(text, options);

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

  const matchDetails = findProfanityWithMetadata(text, options);
  const categories = findCategories(matchDetails);
  const regions = findRegions(matchDetails);
  const severityScore = calculateSeverity(matchDetails);

  return {
    hasProfanity: true,
    matches,
    matchDetails,
    categories,
    regions,
    severityScore,
  };
}

/**
 * menganalisis daftar teks dan ringkasan
 *
 * @param texts Daftar teks yagn dianalisis
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
  const results = texts.map((text) => analyze(text, options));
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
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence.trim().length > 0);

  return sentences.map((sentence) => {
    const result = analyze(sentence, options);

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
 * @param context Kata konteks untuk dicari di dekat kata kotor
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
  const matches = findProfanity(text, options);

  if (matches.length === 0) {
    return [];
  }

  const result = [];

  for (const word of matches) {
    const regex = new RegExp(
      `((?:\\S+\\s+){0,${contextWindowSize}})(\\b${escapeRegExp(word)}\\b)((?:\\s+\\S+){0,${contextWindowSize}})`,
      'gi',
    );

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

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}