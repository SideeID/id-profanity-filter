import { AhoCorasick } from '../../src/utils/ahoCorasick';

describe('AhoCorasick', () => {
  let ac: AhoCorasick;

  beforeEach(() => {
    ac = new AhoCorasick();
  });

  describe('basic functionality', () => {
    test('should build trie and search patterns', () => {
      ac.addPattern('anjing');
      ac.addPattern('babi');
      ac.build();

      const matches = ac.search('Dasar anjing dan babi!');

      expect(matches.size).toBe(2);
      expect(matches.get('anjing')).toBe(1);
      expect(matches.get('babi')).toBe(1);
    });

    test('should return unique matches', () => {
      ac.addPattern('anjing');
      ac.addPattern('babi');
      ac.build();

      const matches = ac.searchUnique('Dasar anjing dan babi dan anjing!');

      expect(matches.size).toBe(2);
      expect(matches.has('anjing')).toBe(true);
      expect(matches.has('babi')).toBe(true);
    });

    test('should detect presence of patterns', () => {
      ac.addPattern('anjing');
      ac.addPattern('babi');
      ac.build();

      expect(ac.containsAny('Dasar anjing!')).toBe(true);
      expect(ac.containsAny('Dasar kucing!')).toBe(false);
    });

    test('should count multiple occurrences', () => {
      ac.addPattern('anjing');
      ac.build();

      const matches = ac.search('anjing dan anjing lagi anjing');

      expect(matches.get('anjing')).toBe(3);
    });
  });

  describe('edge cases', () => {
    test('should handle empty search text', () => {
      ac.addPattern('anjing');
      ac.build();

      const matches = ac.search('');
      expect(matches.size).toBe(0);
    });

    test('should handle overlapping patterns', () => {
      ac.addPattern('an');
      ac.addPattern('anjing');
      ac.build();

      const matches = ac.search('anjing');

      expect(matches.size).toBe(2);
      expect(matches.has('an')).toBe(true);
      expect(matches.has('anjing')).toBe(true);
    });

    test('should throw error when trying to add pattern after build', () => {
      ac.build();
      expect(() => ac.addPattern('test')).toThrow();
    });
  });

  describe('failure function', () => {
    test('should handle prefix matches', () => {
      ac.addPattern('anjing');
      ac.addPattern('ing');
      ac.build();

      const matches = ac.search('anjing');

      expect(matches.size).toBe(2);
      expect(matches.has('anjing')).toBe(true);
      expect(matches.has('ing')).toBe(true);
    });

    test('should handle suffix matches', () => {
      ac.addPattern('an');
      ac.addPattern('anjing');
      ac.build();

      const matches = ac.search('anjing');

      expect(matches.size).toBe(2);
      expect(matches.has('an')).toBe(true);
      expect(matches.has('anjing')).toBe(true);
    });
  });
});
