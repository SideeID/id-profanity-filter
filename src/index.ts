export * from './types';
export * from './core/matcher';
export * from './core/filter';
export * from './core/analyzer';
export * from './utils/stringUtils';
export * from './utils/regexUtils';
export * from './utils/similarityUtils';
export * from './config/options';

import { filter, isProfane } from './core/filter';
import {
  analyze,
  batchAnalyze,
  analyzeBySentence,
  analyzeWithContext,
} from './core/analyzer';
import { FilterOptions, FilterResult, AnalysisResult } from './types';
import {
  DEFAULT_OPTIONS,
  FILTER_PRESETS,
  CATEGORY_PRESETS,
  REGION_PRESETS,
  getPresetOptions,
} from './config/options';

export class IDProfanityFilter {
  private options: FilterOptions;

  /**
   * Membuat instance filter baru
   * @param options Opsi untuk filter
   */
  constructor(options: FilterOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * Menyensor teks yang diberikan
   * @param text Teks yang akan disensor
   * @returns Hasil filter
   */
  filter(text: string): FilterResult {
    return filter(text, this.options);
  }

  /**
   * Memeriksa apakah teks mengandung kata kotor
   * @param text Teks yang akan diperiksa
   * @returns Boolean apakah teks mengandung kata kotor
   */
  isProfane(text: string): boolean {
    return isProfane(text, this.options);
  }

  /**
   * Menganalisis teks untuk kata kotor
   * @param text Teks yang akan dianalisis
   * @returns Hasil analisis
   */
  analyze(text: string): AnalysisResult {
    return analyze(text, this.options);
  }

  /**
   * Menganalisis batch teks untuk kata kotor
   * @param texts Array dari teks yang akan dianalisis
   * @returns Hasil analisis batch
   */
  batchAnalyze(texts: string[]) {
    return batchAnalyze(texts, this.options);
  }

  /**
   * Menganalisis teks per-kalimat
   * @param text Teks yang akan dianalisis
   * @returns Array hasil analisis per-kalimat
   */
  analyzeBySentence(text: string) {
    return analyzeBySentence(text, this.options);
  }

  /**
   * Menganalisis teks dengan konteks di sekitar kata kotor
   * @param text Teks yang akan dianalisis
   * @param contextWindowSize Jumlah kata konteks
   * @returns Konteks di dekat kata kotor
   */
  analyzeWithContext(text: string, contextWindowSize: number = 5) {
    return analyzeWithContext(text, contextWindowSize, this.options);
  }

  /**
   * Mengubah opsi filter
   * @param options Opsi baru untuk filter
   */
  setOptions(options: Partial<FilterOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  /**
   * Menggunakan preset yang telah ditentukan
   * @param presetName Nama preset yang akan digunakan
   * @param additionalOptions Opsi tambahan untuk override
   */
  usePreset(
    presetName: string,
    additionalOptions: Partial<FilterOptions> = {},
  ) {
    this.options = getPresetOptions(presetName, additionalOptions);
  }

  /**
   * Menetapkan daftar kata kustom
   * @param wordList Daftar kata untuk digunakan
   */
  setWordList(wordList: string[]) {
    this.options.wordList = wordList;
  }

  /**
   * Menambahkan kata ke whitelist
   * @param word Kata yang akan diabaikan
   */
  addToWhitelist(word: string) {
    this.options.whitelist = [
      ...(this.options.whitelist || []),
      word.toLowerCase(),
    ];
  }

  /**
   * Menghapus kata dari whitelist
   * @param word Kata yang akan dihapus dari whitelist
   */
  removeFromWhitelist(word: string) {
    if (!this.options.whitelist) return;

    this.options.whitelist = this.options.whitelist.filter(
      (w) => w.toLowerCase() !== word.toLowerCase(),
    );
  }

  /**
   * Mengaktifkan deteksi variasi ejaan Indonesia
   */
  enableIndonesianVariations() {
    this.options.indonesianVariation = true;
  }

  /**
   * Mengaktifkan deteksi kata yang dipisah
   */
  enableSplitWordDetection() {
    this.options.detectSplit = true;
  }

  /**
   * Mengaktifkan deteksi berdasarkan kesamaan
   * @param threshold Threshold kesamaan (0-1)
   * @param useLevenshtein Gunakan algoritma Levenshtein untuk deteksi
   * @param maxLevenshteinDistance Jarak maksimal Levenshtein (default: 2)
   */
  enableSimilarityDetection(
    threshold: number = 0.8,
    useLevenshtein: boolean = false,
    maxLevenshteinDistance: number = 2,
  ) {
    this.options.detectSimilarity = true;
    this.options.similarityThreshold = threshold;
    this.options.useLevenshtein = useLevenshtein;
    this.options.maxLevenshteinDistance = maxLevenshteinDistance;
  }

  /**
   * Mengaktifkan deteksi berbasis Levenshtein distance
   * @param threshold Threshold kesamaan (0-1)
   * @param maxDistance Jarak maksimal Levenshtein (default: 2)
   */
  enableLevenshteinDetection(threshold: number = 0.8, maxDistance: number = 2) {
    this.options.detectSimilarity = true;
    this.options.useLevenshtein = true;
    this.options.similarityThreshold = threshold;
    this.options.maxLevenshteinDistance = maxDistance;
  }
}

export default IDProfanityFilter;

export const idFilter = {
  filter: (text: string, options?: FilterOptions) =>
    filter(text, { ...DEFAULT_OPTIONS, ...options }),
  isProfane: (text: string, options?: FilterOptions) =>
    isProfane(text, { ...DEFAULT_OPTIONS, ...options }),
  analyze: (text: string, options?: FilterOptions) =>
    analyze(text, { ...DEFAULT_OPTIONS, ...options }),
  batchAnalyze: (texts: string[], options?: FilterOptions) =>
    batchAnalyze(texts, { ...DEFAULT_OPTIONS, ...options }),
  getPresetOptions,
  presets: {
    filter: FILTER_PRESETS,
    category: CATEGORY_PRESETS,
    region: REGION_PRESETS,
  },
};
