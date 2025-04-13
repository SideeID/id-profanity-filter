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
        matrix[i - 1][j - 1] + cost // substitution
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
  threshold: number = 0.7
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
 * Mencari string yang paling mirip dari array menggunakan Levenshtein distance
 *
 * @param target String target
 * @param candidates Array string kandidat
 * @param threshold Minimum kesamaan yang diterima (0-1)
 * @param maxDistance Jarak Levenshtein maksimal yang diterima (default: 3)
 * @returns String yang paling mirip atau null jika tidak ada yang di atas threshold
 */
export function findMostSimilarWithLevenshtein(
  target: string,
  candidates: string[],
  threshold: number = 0.7,
  maxDistance: number = 3
): string | null {
  if (!candidates.length) return null;

  let maxSimilarity = 0;
  let minDistance = Infinity;
  let mostSimilar: string | null = null;

  for (const candidate of candidates) {
    if (Math.abs(target.length - candidate.length) > maxDistance) continue;

    const distance = levenshteinDistance(target, candidate);
    const similarity = stringSimilarity(target, candidate);

    if (
      (similarity > maxSimilarity && similarity >= threshold) ||
      (similarity >= threshold && distance < minDistance)
    ) {
      maxSimilarity = similarity;
      minDistance = distance;
      mostSimilar = candidate;

      if (distance <= 1 || similarity > 0.95) break;
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
  threshold: number = 0.75
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
export function clusterSimilarWords(words: string[], threshold: number = 0.8): string[][] {
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
 * dengan optimasi untuk mengurangi kompleksitas
 *
 * @param text Teks yang akan diperiksa
 * @param profanityWords Daftar kata kotor
 * @param threshold Batas minimum kesamaan (default: 0.8)
 * @returns Array kata yang mungkin merupakan kata kotor
 */
/**
 * Cari kata-kata kotor yang mungkin dari teks berdasarkan kemiripan string
 * dengan optimasi biar prosesnya nggak terlalu berat
 *
 * @param text Teks yang mau dicek
 * @param profanityWords Daftar kata-kata kotor/kasar
 * @param threshold Batas minimal kemiripan (default: 0.8)
 * @returns Array kata yang kemungkinan kata kotor/kasar
 */
export function findPossibleProfanityBySimiliarity(
  text: string,
  profanityWords: string[],
  threshold: number = 0.8
): Array<{ word: string; original: string; similarity: number }> {
  const result: Array<{ word: string; original: string; similarity: number }> = [];

  // Optimasi dengan bikin map kata-kata kotor berdasarkan huruf pertama
  const profanityMap = new Map<string, string[]>();

  // Kelompokkan kata-kata kotor berdasarkan huruf pertama biar pencariannya lebih cepat
  for (const word of profanityWords) {
    if (word.length < 1) continue;

    const firstChar = word[0].toLowerCase();
    if (!profanityMap.has(firstChar)) {
      profanityMap.set(firstChar, []);
    }
    profanityMap.get(firstChar)!.push(word);
  }

  const words = text.toLowerCase().split(/\s+/);

  for (const word of words) {
    if (word.length < 3) continue;

    // Cuma bandingin dengan kata-kata kotor yang huruf pertamanya sama
    // atau yang perbedaan panjangnya masih masuk akal
    const firstChar = word[0];
    const candidateWords = profanityMap.get(firstChar) || [];

    // Cek juga huruf-huruf yang berdekatan (buat antisipasi typo di huruf pertama)
    // Ini opsional tapi bikin deteksinya lebih bagus
    const charCode = firstChar.charCodeAt(0);
    const prevChar = String.fromCharCode(charCode - 1);
    const nextChar = String.fromCharCode(charCode + 1);

    const adjacentCandidates = [
      ...(profanityMap.get(prevChar) || []),
      ...(profanityMap.get(nextChar) || []),
    ];

    // Gabungin kandidat-kandidatnya, prioritasin yang huruf pertamanya sama persis
    const allCandidates = [...candidateWords, ...adjacentCandidates];

    // Filter kandidat berdasarkan perbedaan panjang sebelum ngitung kemiripannya
    const lengthFilteredCandidates = allCandidates.filter(
      (candidate) => Math.abs(candidate.length - word.length) <= 2
    );

    // Cari yang paling cocok
    let bestMatch: {
      word: string;
      original: string;
      similarity: number;
    } | null = null;

    for (const profanity of lengthFilteredCandidates) {
      const similarity = stringSimilarity(word, profanity);

      if (similarity >= threshold && (!bestMatch || similarity > bestMatch.similarity)) {
        bestMatch = {
          word,
          original: profanity,
          similarity,
        };
      }
    }

    if (bestMatch) {
      result.push(bestMatch);
    }
  }

  return result;
}

/**
 * Cari kata-kata kotor yang mungkin dari teks menggunakan Levenshtein distance
 *
 * @param text Teks yang akan diperiksa
 * @param profanityWords Daftar kata kotor
 * @param threshold Batas minimum kesamaan (default: 0.8)
 * @param maxDistance Jarak Levenshtein maksimal (default: 2)
 * @returns Array kata yang mungkin merupakan kata kotor
 */
export function findProfanityByLevenshteinDistance(
  text: string,
  profanityWords: string[],
  threshold: number = 0.8,
  maxDistance: number = 2
): Array<{
  word: string;
  original: string;
  similarity: number;
  distance: number;
}> {
  const result: Array<{
    word: string;
    original: string;
    similarity: number;
    distance: number;
  }> = [];

  // map kata-kata kotor dikelompokkan sesuai panjangnya
  const profanityByLength = new Map<number, string[]>();

  // Kelompokkin kata-kata kotor berdasarkan panjangnya biar pencarian lebih cepat
  for (const word of profanityWords) {
    const length = word.length;
    if (!profanityByLength.has(length)) {
      profanityByLength.set(length, []);
    }
    profanityByLength.get(length)!.push(word);
  }

  const words = text.toLowerCase().split(/\s+/);

  for (const word of words) {
    if (word.length < 3) continue;

    let bestMatch: {
      word: string;
      original: string;
      similarity: number;
      distance: number;
    } | null = null;

    for (
      let len = Math.max(3, word.length - maxDistance);
      len <= word.length + maxDistance;
      len++
    ) {
      const candidates = profanityByLength.get(len) || [];

      for (const profanity of candidates) {
        if (!isCharacterCountSimilar(word, profanity, maxDistance)) {
          continue;
        }

        const distance = levenshteinDistance(word, profanity);

        if (distance <= maxDistance) {
          const similarity = 1 - distance / Math.max(word.length, profanity.length);

          if (similarity >= threshold && (!bestMatch || similarity > bestMatch.similarity)) {
            bestMatch = {
              word,
              original: profanity,
              similarity,
              distance,
            };

            if (distance === 0 || similarity > 0.95) {
              break;
            }
          }
        }
      }
    }

    if (bestMatch) {
      result.push(bestMatch);
    }
  }

  return result;
}

/**
 * Helper function to efficiently check if character counts between two strings
 * are similar enough to warrant a full Levenshtein calculation
 */
function isCharacterCountSimilar(str1: string, str2: string, maxDifference: number): boolean {
  const charCount1: Record<string, number> = {};
  const charCount2: Record<string, number> = {};

  for (const char of str1) {
    charCount1[char] = (charCount1[char] || 0) + 1;
  }

  for (const char of str2) {
    charCount2[char] = (charCount2[char] || 0) + 1;
  }

  let diffCount = 0;

  for (const char in charCount1) {
    diffCount += Math.abs((charCount1[char] || 0) - (charCount2[char] || 0));
  }

  for (const char in charCount2) {
    if (!charCount1[char]) {
      diffCount += charCount2[char];
    }
  }

  return diffCount <= maxDifference * 2;
}
