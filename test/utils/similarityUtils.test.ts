import {
  levenshteinDistance,
  stringSimilarity,
  findMostSimilar,
  findMostSimilarWithLevenshtein,
  isPossibleProfanityVariation,
  findPossibleProfanityBySimiliarity,
  findProfanityByLevenshteinDistance,
} from '../../src/utils/similarityUtils';

describe('Similarity Utils', () => {
  describe('levenshteinDistance function', () => {
    test('should calculate correct distance', () => {
      expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
      expect(levenshteinDistance('test', 'test')).toBe(0);
      expect(levenshteinDistance('book', 'back')).toBe(2);
    });

    test('should handle empty strings', () => {
      expect(levenshteinDistance('', '')).toBe(0);
      expect(levenshteinDistance('test', '')).toBe(4);
      expect(levenshteinDistance('', 'test')).toBe(4);
    });
  });

  describe('stringSimilarity function', () => {
    test('should calculate correct similarity', () => {
      expect(stringSimilarity('test', 'test')).toBe(1); // identical
      expect(stringSimilarity('test', 'tent')).toBe(0.75); // 1 change out of 4
      expect(stringSimilarity('book', 'back')).toBe(0.5); // 2 changes out of 4
    });

    test('should handle empty strings', () => {
      expect(stringSimilarity('', '')).toBe(1); // both empty = identical
      expect(stringSimilarity('test', '')).toBe(0);
      expect(stringSimilarity('', 'test')).toBe(0);
    });
  });

  describe('findMostSimilar function', () => {
    test('should find most similar string', () => {
      const candidates = ['apple', 'banana', 'orange', 'appl'];
      expect(findMostSimilar('aple', candidates, 0.7)).toBe('apple');
    });

    test('should return null when no match above threshold', () => {
      const candidates = ['apple', 'banana', 'orange'];
      expect(findMostSimilar('xyz', candidates, 0.7)).toBeNull();
    });

    test('should handle empty candidates', () => {
      expect(findMostSimilar('test', [], 0.7)).toBeNull();
    });
  });

  describe('findMostSimilarWithLevenshtein function', () => {
    test('should find most similar string using Levenshtein', () => {
      const candidates = ['anjing', 'babi', 'kontol'];
      expect(findMostSimilarWithLevenshtein('anjiing', candidates, 0.7, 2)).toBe('anjing');
    });

    test('should respect max distance limit', () => {
      const candidates = ['anjing', 'anjiang'];
      // With default max distance (3), it should match
      expect(findMostSimilarWithLevenshtein('anjiiing', candidates, 0.7)).toBe('anjing');

      // With stricter max distance (1), it should not match
      expect(findMostSimilarWithLevenshtein('anjiiiing', candidates, 0.7, 1)).toBeNull();
    });
  });

  describe('isPossibleProfanityVariation function', () => {
    test('should detect possible profanity variations', () => {
      const profanityWords = ['anjing', 'babi'];
      const [isProfanity, original] = isPossibleProfanityVariation('anjiing', profanityWords, 0.8);

      expect(isProfanity).toBe(true);
      expect(original).toBe('anjing');
    });

    test('should return false for non-matches', () => {
      const profanityWords = ['anjing', 'babi'];
      const [isProfanity, original] = isPossibleProfanityVariation('kucing', profanityWords, 0.8);

      expect(isProfanity).toBe(false);
      expect(original).toBeNull();
    });
  });

  describe('findPossibleProfanityBySimiliarity function', () => {
    test('should find similar profanity words in text', () => {
      const text = 'anjiing adalah binatang lucu';
      const profanityWords = ['anjing', 'babi', 'kontol'];

      const results = findPossibleProfanityBySimiliarity(text, profanityWords, 0.8);

      expect(results.length).toBe(1);
      expect(results[0].word).toBe('anjiing');
      expect(results[0].original).toBe('anjing');
      expect(results[0].similarity).toBeGreaterThanOrEqual(0.8);
    });

    test('should not match when similarity is below threshold', () => {
      const text = 'kucing adalah binatang lucu';
      const profanityWords = ['anjing', 'babi'];

      const results = findPossibleProfanityBySimiliarity(text, profanityWords, 0.8);
      expect(results.length).toBe(0);
    });
  });

  describe('findProfanityByLevenshteinDistance function', () => {
    test('should find profanity by Levenshtein distance', () => {
      const text = 'anjiing adalah binatang lucu';
      const profanityWords = ['anjing', 'babi', 'kontol'];

      const results = findProfanityByLevenshteinDistance(text, profanityWords, 0.8, 2);

      expect(results.length).toBe(1);
      expect(results[0].word).toBe('anjiing');
      expect(results[0].original).toBe('anjing');
      expect(results[0].distance).toBe(1);
      expect(results[0].similarity).toBeGreaterThanOrEqual(0.8);
    });

    test('should respect maximum distance', () => {
      const text = 'anjiiiing adalah binatang lucu';
      const profanityWords = ['anjing', 'babi'];

      // With max distance 2, should not match
      const resultsStrict = findProfanityByLevenshteinDistance(text, profanityWords, 0.6, 2);
      expect(resultsStrict.length).toBe(0);

      // With max distance 4, should match
      const resultsLax = findProfanityByLevenshteinDistance(text, profanityWords, 0.6, 4);
      expect(resultsLax.length).toBe(1);
    });
  });
});
