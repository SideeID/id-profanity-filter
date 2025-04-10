export type ProfanityCategory =
  | 'sexual' // Kata-kata berbau seksual
  | 'insult' // Kata-kata penghinaan
  | 'profanity' // Umpatan umum
  | 'slur' // Perkataan merendahkan berdasarkan identitas
  | 'drugs' // Terkait narkoba
  | 'disgusting' // Kata-kata menjijikkan
  | 'blasphemy'; // Penistaan agama


export type Region =
  | 'general' // Umum di Indonesia
  | 'jawa' 
  | 'sunda' 
  | 'betawi' 
  | 'batak' 
  | 'minang' 
  | 'bali' 
  | 'madura' 
  | 'bugis' 
  | 'aceh' 
  | 'ambon' 
  | 'papua' 
  | 'manado' 
  | 'banjar' 
  | 'palembang' 
  | 'lampung' 
  | 'ntt' 
  | 'ntb'; 

/**
 * Definisi kata kotor
 */
export interface ProfanityWord {
  word: string; // Kata kotor
  category: ProfanityCategory; // Kategori kata
  region: Region; // Daerah asal kata
  severity: number; // Tingkat keparahan (0-1)
  aliases?: string[]; // Variasi kata atau alias
  description?: string; // Deskripsi atau makna kata
  context?: string; // Konteks penggunaan kata
}

/**
 * Opsi untuk konfigurasi filter
 */
export interface FilterOptions {
  /** List kata yang ingin difilter */
  wordList?: string[];

  /** Karakter pengganti untuk kata yang disensor */
  replaceWith?: string;

  /** Apakah harus menyensor seluruh kata atau hanya sebagian */
  fullWordCensor?: boolean;

  /** Apakah harus mendeteksi kata dengan variasi penulisan */
  detectLeetSpeak?: boolean;

  /** Mengabaikan kata-kata dalam konteks tertentu (misalnya nama) */
  whitelist?: string[];

  /** Apakah harus memeriksa substring (lebih ketat) */
  checkSubstring?: boolean;

  /** Kategori kata yang ingin difilter */
  categories?: ProfanityCategory[];

  /** Daerah yang ingin difilter katanya */
  regions?: Region[];

  /** Tingkat keparahan minimum yang akan difilter (0-1) */
  severityThreshold?: number;
}

/**
 * Hasil analisis dari teks
 */
export interface AnalysisResult {
  /** Apakah teks mengandung kata kotor */
  hasProfanity: boolean;

  /** Daftar kata kotor yang ditemukan */
  matches: string[];

  /** Daftar kata kotor lengkap dengan metadata */
  matchDetails: ProfanityWord[];

  /** Daftar kategori kata kotor yang ditemukan */
  categories: ProfanityCategory[];

  /** Daftar daerah asal kata kotor yang ditemukan */
  regions: Region[];

  /** Tingkat keparahan (0-1) berdasarkan jumlah dan jenis kata */
  severityScore: number;
}

/**
 * Hasil filter dari teks
 */
export interface FilterResult {
  /** Teks hasil filter */
  filtered: string;

  /** Jumlah kata yang disensor */
  censored: number;

  /** Kata asli yang disensor dan penggantinya */
  replacements: Array<{
    original: string;
    censored: string;
    metadata?: ProfanityWord;
  }>;
}
