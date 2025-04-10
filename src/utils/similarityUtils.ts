/**
 * Menghitung jarak Levenshtein antara dua string
 * (Jumlah operasi insert, delete, atau replace untuk mengubah string1 menjadi string2)
 *
 * @param str1 String pertama
 * @param str2 String kedua
 * @returns Jarak Levenshtein
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  const len1 = s1.length;
  const len2 = s2.length;

  // Inisialisasi matrix
  const matrix: number[][] = [];

  // Inisialisasi baris pertama
  for (let i = 0; i <= len2; i++) {
    matrix[0] = matrix[0] || [];
    matrix[0][i] = i;
  }

  // Inisialisasi kolom pertama
  for (let i = 0; i <= len1; i++) {
    matrix[i] = matrix[i] || [];
    matrix[i][0] = i;
  }

  // Isi matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost, // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Menghitung tingkat kesamaan antara dua string
 *
 * @param str1 String pertama
 * @param str2 String kedua
 * @returns Nilai kesamaan (0-1, di mana 1 berarti identik)
 */
export function stringSimilarity(str1: string, str2: string): number {
  if (!str1.length && !str2.length) return 1;
  if (!str1.length || !str2.length) return 0;

  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);

  return 1 - distance / maxLength;
}

/**
 * Mencari string yang paling mirip dari array
 *
 * @param target String target
 * @param candidates Array string kandidat
 * @param threshold Minimum kesamaan yang diterima (0-1)
 * @returns String yang paling mirip atau null jika tidak ada yang di atas threshold
 */
export function findMostSimilar(
  target: string,
  candidates: string[],
  threshold: number = 0.7,
): string | null {
  if (!candidates.length) return null;

  let maxSimilarity = 0;
  let mostSimilar: string | null = null;

  for (const candidate of candidates) {
    const similarity = stringSimilarity(target, candidate);

    if (similarity > maxSimilarity && similarity >= threshold) {
      maxSimilarity = similarity;
      mostSimilar = candidate;
    }
  }

  return mostSimilar;
}

/**
 * Cek apakah string mungkin merupakan variasi dari kata kotor
 * menggunakan kesamaan string
 *
 * @param input String yang akan diperiksa
 * @param profanityWords Daftar kata kotor
 * @param threshold Batas minimum kesamaan (default: 0.75)
 * @returns Array [Boolean (apakah variasi), String original (jika ditemukan)]
 */
export function isPossibleProfanityVariation(
  input: string,
  profanityWords: string[],
  threshold: number = 0.75,
): [boolean, string | null] {
  if (!input || !profanityWords.length) return [false, null];

  for (const word of profanityWords) {
    const similarity = stringSimilarity(input, word);

    if (similarity >= threshold) {
      return [true, word];
    }
  }

  return [false, null];
}

/**
 * Mengelompokkan kata berdasarkan kesamaan
 *
 * @param words Daftar kata
 * @param threshold Batas minimum kesamaan (default: 0.8)
 * @returns Array kluster kata yang mirip
 */
export function clusterSimilarWords(
  words: string[],
  threshold: number = 0.8,
): string[][] {
  const clusters: string[][] = [];
  const processed: Set<string> = new Set();

  for (const word of words) {
    if (processed.has(word)) continue;

    const cluster: string[] = [word];
    processed.add(word);

    for (const otherWord of words) {
      if (word === otherWord || processed.has(otherWord)) continue;

      const similarity = stringSimilarity(word, otherWord);
      if (similarity >= threshold) {
        cluster.push(otherWord);
        processed.add(otherWord);
      }
    }

    clusters.push(cluster);
  }

  return clusters;
}

/**
 * Cari kata-kata kotor yang mungkin dari teks menggunakan kesamaan string
 *
 * @param text Teks yang akan diperiksa
 * @param profanityWords Daftar kata kotor
 * @param threshold Batas minimum kesamaan (default: 0.8)
 * @returns Array kata yang mungkin merupakan kata kotor
 */
export function findPossibleProfanityBySimiliarity(
  text: string,
  profanityWords: string[],
  threshold: number = 0.8,
): Array<{ word: string; original: string; similarity: number }> {
  const result: Array<{ word: string; original: string; similarity: number }> =
    [];

  // Pisahkan teks menjadi kata-kata
  const words = text.toLowerCase().split(/\s+/);

  for (const word of words) {
    // Lewati kata-kata yang terlalu pendek
    if (word.length < 3) continue;

    for (const profanity of profanityWords) {
      const similarity = stringSimilarity(word, profanity);

      if (similarity >= threshold) {
        result.push({
          word,
          original: profanity,
          similarity,
        });
        break;
      }
    }
  }

  return result;
}
