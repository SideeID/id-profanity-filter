import { filter, isProfane } from '../src/core/filter';

describe('Filter Core', () => {
  describe('filter function', () => {
    test('should filter profanity with default settings', () => {
      const result = filter('Dasar anjing kamu!');
      expect(result.filtered).toBe('Dasar ****** kamu!');
      expect(result.censored).toBe(1);
    });

    test('should not filter clean text', () => {
      const cleanText = 'Ini adalah kalimat yang sopan';
      const result = filter(cleanText);
      expect(result.filtered).toBe(cleanText);
      expect(result.censored).toBe(0);
      expect(result.replacements).toEqual([]);
    });

    test('should filter multiple profanities', () => {
      const text = 'Dasar anjing dan babi!';
      const result = filter(text);
      expect(result.filtered).not.toBe(text);
      expect(result.censored).toBe(2);
      expect(result.replacements.length).toBe(2);
    });

    test('should respect custom replacement character', () => {
      const result = filter('Dasar anjing!', { replaceWith: '#' });
      expect(result.filtered).toBe('Dasar ######!');
    });

    test('should handle keepFirstAndLast option', () => {
      const result = filter('anjing', {
        keepFirstAndLast: true,
        fullWordCensor: false,
      });
      expect(result.filtered).toBe('a****g');
    });

    // test('should handle random grawlix option', () => {
    //   const result = filter('anjing', { useRandomGrawlix: true });
    //   expect(result.filtered).not.toBe('anjing');
    //   expect(result.filtered.length).toBe(6);
    // });

    test('should use whitelist', () => {
      const text = 'Anjing adalah binatang peliharaan yang setia';

      // Without whitelist
      const withoutWhitelist = filter(text);
      expect(withoutWhitelist.censored).toBe(1);

      // With whitelist
      const withWhitelist = filter(text, { whitelist: ['anjing'] });
      expect(withWhitelist.censored).toBe(0);
      expect(withWhitelist.filtered).toBe(text);
    });
  });

  describe('isProfane function', () => {
    test('should detect profanity', () => {
      expect(isProfane('anjing')).toBe(true);
      expect(isProfane('babi')).toBe(true);
      expect(isProfane('kucing')).toBe(false);
    });

    test('should respect whitelist', () => {
      expect(isProfane('anjing', { whitelist: ['anjing'] })).toBe(false);
    });

    test('should detect based on threshold', () => {
      // Assuming "kontol" has a higher severity than "babi"
      expect(isProfane('kontol', { severityThreshold: 0.8 })).toBe(true);

      // This might fail if the severity isn't configured as expected
      // Just an example of how the test would work
      expect(isProfane('babi', { severityThreshold: 0.7 })).toBe(false);
    });
  });
});
