import {
  findProfanity,
  findProfanityWithMetadata,
  findCategories,
  findRegions,
  calculateSeverity,
} from '../src/core/matcher';

describe('Matcher Core', () => {
  describe('findProfanity function', () => {
    test('should find profanity in text', () => {
      const results = findProfanity('Dasar anjing!');
      expect(results).toContain('anjing');
      expect(results.length).toBe(1);
    });

    test('should find multiple profanities', () => {
      const results = findProfanity('Dasar anjing dan babi!');
      expect(results).toContain('anjing');
      expect(results).toContain('babi');
      expect(results.length).toBe(2);
    });

    test('should detect leetspeak variations', () => {
      const results = findProfanity('Dasar 4nj1ng!', { detectLeetSpeak: true });
      expect(results).toContain('anjing');
    });

    test('should detect Indonesian variations', () => {
      const results = findProfanity('Kamu itu anjic!', { indonesianVariation: true });
      expect(results).toContain('anjing');
    });

    test('should detect split words', () => {
      const results = findProfanity('a-n-j-i-n-g', { detectSplit: true });
      expect(results).toContain('anjing');
    });

    test('should respect whitelist', () => {
      const results = findProfanity('anjing', { whitelist: ['anjing'] });
      expect(results).toEqual([]);
    });

    test('should filter by category', () => {
      // Assuming "kontol" is sexual and "anjing" is profanity
      const resultsWithSexual = findProfanity('memek dan anjing', {
        categories: ['sexual'],
      });
      expect(resultsWithSexual).toContain('memek');
      expect(resultsWithSexual).not.toContain('anjing');

      const resultsWithProfanity = findProfanity('kontol dan anjing', {
        categories: ['profanity'],
      });
      expect(resultsWithProfanity).toContain('anjing');
      expect(resultsWithProfanity).not.toContain('kontol');
    });

    test('should filter by region', () => {
      // Assuming "jancok" is from jawa region and "anjing" is general
      const resultsWithJawa = findProfanity('jancok dan anjing', { regions: ['jawa'] });
      expect(resultsWithJawa).toContain('jancok');
      expect(resultsWithJawa).not.toContain('anjing');

      const resultsWithGeneral = findProfanity('jancok dan anjing', { regions: ['general'] });
      expect(resultsWithGeneral).toContain('anjing');
      expect(resultsWithGeneral).not.toContain('jancok');
    });
  });

  describe('findProfanityWithMetadata function', () => {
    test('should return metadata for profanity', () => {
      const results = findProfanityWithMetadata('anjing');
      expect(results.length).toBe(1);
      expect(results[0].word).toBe('anjing');
      expect(results[0].category).toBeDefined();
      expect(results[0].region).toBeDefined();
      expect(results[0].severity).toBeDefined();
    });
  });

  describe('findCategories function', () => {
    test('should extract unique categories', () => {
      const metadata = findProfanityWithMetadata('anjing dan kontol');
      const categories = findCategories(metadata);

      // Assuming "anjing" is profanity and "kontol" is sexual
      expect(categories.includes('profanity')).toBe(true);
      expect(categories.includes('sexual')).toBe(true);
      expect(categories.length).toBe(2); // Should be unique
    });
  });

  describe('findRegions function', () => {
    test('should extract unique regions', () => {
      const metadata = findProfanityWithMetadata('anjing dan jancok');
      const regions = findRegions(metadata);

      // Assuming "anjing" is general and "jancok" is jawa
      expect(regions.includes('general')).toBe(true);
      expect(regions.includes('jawa')).toBe(true);
      expect(regions.length).toBe(2); // Should be unique
    });
  });

  describe('calculateSeverity function', () => {
    test('should calculate severity score', () => {
      const metadata = findProfanityWithMetadata('anjing');
      const severity = calculateSeverity(metadata);

      expect(severity).toBeGreaterThanOrEqual(0);
      expect(severity).toBeLessThanOrEqual(1);
    });

    test('should return 0 for empty metadata', () => {
      const severity = calculateSeverity([]);
      expect(severity).toBe(0);
    });
  });
});
