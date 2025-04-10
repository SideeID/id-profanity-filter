export * from './types';
export * from './core/matcher';
export * from './core/filter';
export * from './core/analyzer';

import { filter, isProfane } from './core/filter';
import {
  analyze,
  batchAnalyze,
  analyzeBySentence,
  analyzeWithContext,
} from './core/analyzer';
import { FilterOptions, FilterResult, AnalysisResult } from './types';

export class IDProfanityFilter {
  private options: FilterOptions;

  /**
   * Membuat instance filter baru
   * @param options Opsi untuk filter
   */
  constructor(options: FilterOptions = {}) {
    this.options = options;
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
}

export default IDProfanityFilter;

export const idFilter = {
  filter: (text: string, options?: FilterOptions) => filter(text, options),
  isProfane: (text: string, options?: FilterOptions) =>
    isProfane(text, options),
  analyze: (text: string, options?: FilterOptions) => analyze(text, options),
  batchAnalyze: (texts: string[], options?: FilterOptions) =>
    batchAnalyze(texts, options),
};
