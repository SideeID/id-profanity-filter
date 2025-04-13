import { FilterOptions, ProfanityCategory, Region } from '../types';

export const DEFAULT_OPTIONS: FilterOptions = {
  replaceWith: '*',
  fullWordCensor: true,
  detectLeetSpeak: true,
  checkSubstring: false,
  whitelist: [],
  severityThreshold: 0,
  useLevenshtein: false,
  maxLevenshteinDistance: 2,
};

export const FILTER_PRESETS = {
  strict: {
    ...DEFAULT_OPTIONS,
    checkSubstring: true,
    detectLeetSpeak: true,
    severityThreshold: 0,
  },

  moderate: {
    ...DEFAULT_OPTIONS,
    severityThreshold: 0.5,
  },

  light: {
    ...DEFAULT_OPTIONS,
    severityThreshold: 0.7,
    categories: ['sexual', 'slur', 'blasphemy'] as ProfanityCategory[],
  },

  childSafe: {
    ...DEFAULT_OPTIONS,
    checkSubstring: true,
    detectLeetSpeak: true,
    fullWordCensor: true,
    severityThreshold: 0,
  },
};

export const CATEGORY_PRESETS = {
  sexual: {
    ...DEFAULT_OPTIONS,
    categories: ['sexual'] as ProfanityCategory[],
  },

  insults: {
    ...DEFAULT_OPTIONS,
    categories: ['insult'] as ProfanityCategory[],
  },

  profanity: {
    ...DEFAULT_OPTIONS,
    categories: ['profanity'] as ProfanityCategory[],
  },
};

export const REGION_PRESETS = {
  general: {
    ...DEFAULT_OPTIONS,
    regions: ['general'] as Region[],
  },

  jawa: {
    ...DEFAULT_OPTIONS,
    regions: ['jawa'] as Region[],
  },

  sunda: {
    ...DEFAULT_OPTIONS,
    regions: ['sunda'] as Region[],
  },

  betawi: {
    ...DEFAULT_OPTIONS,
    regions: ['betawi'] as Region[],
  },

  batak: {
    ...DEFAULT_OPTIONS,
    regions: ['batak'] as Region[],
  },
};

export const REPLACEMENT_CHARS = {
  asterisk: '*',
  hash: '#',
  dollar: '$',
  at: '@',
  percent: '%',
  underscore: '_',
  dash: '-',
  dot: '.',
  grawlix: '#@$%&!',
};

/**
 * Membuat opsi custom dengan menggabungkan dengan default
 *
 * @param options Opsi yang akan digabungkan dengan default
 * @returns Opsi yang sudah digabungkan
 */
export function createOptions(options: Partial<FilterOptions> = {}): FilterOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
}

/**
 * Mendapatkan opsi dari preset yang ada
 *
 * @param presetName Nama preset filter, kategori, atau region
 * @param additionalOptions Opsi tambahan untuk mengganti preset
 * @returns Opsi yang sudah digabungkan
 */
export function getPresetOptions(
  presetName: string,
  additionalOptions: Partial<FilterOptions> = {}
): FilterOptions {
  let presetOptions: FilterOptions;

  if (presetName in FILTER_PRESETS) {
    presetOptions = FILTER_PRESETS[presetName as keyof typeof FILTER_PRESETS];
  } else if (presetName in CATEGORY_PRESETS) {
    presetOptions = CATEGORY_PRESETS[presetName as keyof typeof CATEGORY_PRESETS];
  } else if (presetName in REGION_PRESETS) {
    presetOptions = REGION_PRESETS[presetName as keyof typeof REGION_PRESETS];
  } else {
    presetOptions = FILTER_PRESETS.strict;
  }

  return {
    ...presetOptions,
    ...additionalOptions,
  };
}

/**
 * Mendapatkan karakter pengganti
 *
 * @param type Tipe karakter pengganti
 * @returns Karakter pengganti
 */
export function getReplacementChar(type: keyof typeof REPLACEMENT_CHARS = 'asterisk'): string {
  return REPLACEMENT_CHARS[type] || REPLACEMENT_CHARS.asterisk;
}

/**
 * Membuat karakter pengganti random dari grawlix
 *
 * @returns Karakter pengganti random
 */
export function getRandomGrawlix(): string {
  const grawlix = REPLACEMENT_CHARS.grawlix;
  return grawlix[Math.floor(Math.random() * grawlix.length)];
}

/**
 * Membuat string pengganti untuk kata menggunakan grawlix random
 *
 * @param length Panjang string
 * @returns String pengganti
 */
export function makeRandomGrawlixString(length: number): string {
  let result = '';
  const grawlix = REPLACEMENT_CHARS.grawlix;

  for (let i = 0; i < length; i++) {
    result += grawlix[Math.floor(Math.random() * grawlix.length)];
  }

  return result;
}
