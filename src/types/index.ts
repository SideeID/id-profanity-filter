export type ProfanityCategory =
  | "sexual"
  | "insult"
  | "profanity"
  | "slur"
  | "drugs"
  | "disgusting"
  | "blasphemy";

export type Region =
  | "general"
  | "jawa"
  | "sunda"
  | "betawi"
  | "batak"
  | "minang"
  | "bali"
  | "madura"
  | "bugis"
  | "aceh"
  | "ambon"
  | "papua"
  | "manado"
  | "banjar"
  | "palembang"
  | "lampung"
  | "ntt"
  | "ntb";

export interface ProfanityWord {
  word: string;
  category: ProfanityCategory;
  region: Region;
  severity: number;
  aliases?: string[];
  description?: string;
  context?: string;
}

export interface FilterOptions {
  replaceWith?: string;
  fullWordCensor?: boolean;
  detectLeetSpeak?: boolean;
  checkSubstring?: boolean;
  wordList?: string[];
  whitelist?: string[];
  categories?: ProfanityCategory[];
  regions?: Region[];
  severityThreshold?: number;
  useRandomGrawlix?: boolean;
  keepFirstAndLast?: boolean;
  indonesianVariation?: boolean;
  detectSimilarity?: boolean; // Enable/disable Levenshtein distance matching
  similarityThreshold?: number; // Threshold for Levenshtein distance similarity (0-1)
  detectSplit?: boolean;
  useLevenshtein?: boolean; // New option specifically for Levenshtein algorithm
  maxLevenshteinDistance?: number; // Maximum allowed Levenshtein distance
}

export interface FilterResult {
  filtered: string;
  censored: number;
  replacements: Array<{
    original: string;
    censored: string;
    metadata?: ProfanityWord;
  }>;
}

export interface AnalysisResult {
  hasProfanity: boolean;
  matches: string[];
  matchDetails: ProfanityWord[];
  categories: ProfanityCategory[];
  regions: Region[];
  severityScore: number;
  similarWords?: Array<{
    word: string;
    original: string;
    similarity: number;
  }>;
}

export interface RegexOptions {
  wholeWord?: boolean;
  caseSensitive?: boolean;
  leetSpeak?: boolean;
  detectSplit?: boolean;
  indonesianVariation?: boolean;
}
