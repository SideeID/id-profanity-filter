import { IDProfanityFilter } from '../src/index';

describe('IDProfanityFilter', () => {
  let filter: IDProfanityFilter;

  beforeEach(() => {
    filter = new IDProfanityFilter();
  });

  describe('basic functionality', () => {
    test('should detect profanity', () => {
      expect(filter.isProfane('Ini kalimat tanpa kata kotor')).toBe(false);
      expect(filter.isProfane('Dasar anjing kamu!')).toBe(true);
    });

    test('should filter profanity', () => {
      const result = filter.filter('Dasar anjing kamu!');
      expect(result.filtered).not.toEqual('Dasar anjing kamu!');
      expect(result.filtered).toContain('*****');
      expect(result.censored).toBe(1);
    });

    test('should analyze profanity', () => {
      const result = filter.analyze('Kamu ini babi dan anjing!');
      expect(result.hasProfanity).toBe(true);
      expect(result.matches.length).toBe(2);
      expect(result.severityScore).toBeGreaterThan(0);
    });
  });

  describe('options configuration', () => {
    test('should apply options when filtering', () => {
      filter.setOptions({ replaceWith: '#' });
      const result = filter.filter('Dasar anjing kamu!');
      expect(result.filtered).toContain('#####');
      expect(result.filtered).not.toContain('*****');
    });

    test('should apply keep first and last option', () => {
      filter.setOptions({ replaceWith: '*', fullWordCensor: false, keepFirstAndLast: true });
      const result = filter.filter('Dasar anjing kamu!');
      expect(result.filtered).toContain('Dasar a****g kamu!');
    });

    test('should apply random grawlix option', () => {
      filter.setOptions({ useRandomGrawlix: true });
      const result = filter.filter('Dasar anjing kamu!');
      // Should replace with random characters from the grawlix set
      expect(result.filtered).not.toContain('anjing');
      expect(result.filtered).not.toEqual('Dasar anjing kamu!');
    });
  });

  describe('preset functionality', () => {
    test('should apply presets correctly', () => {
      filter.usePreset('strict');
      expect(filter.filter('Dasar anjing!').censored).toBe(1);

      filter.usePreset('childSafe');
      const result = filter.filter('Kamu ini babi dan anjing!');
      expect(result.censored).toBe(2);
    });
  });

  describe('whitelist functionality', () => {
    test('should respect whitelist', () => {
      filter.addToWhitelist('anjing');
      expect(filter.isProfane('anjing')).toBe(false);

      filter.removeFromWhitelist('anjing');
      expect(filter.isProfane('anjing')).toBe(true);
    });
  });

  describe('advanced detection', () => {
    test('should detect leet speak variations', () => {
      filter.setOptions({ detectLeetSpeak: true });
      expect(filter.isProfane('4nj1ng')).toBe(true);
    });

    test('should detect split words', () => {
      filter.enableSplitWordDetection();
      expect(filter.isProfane('a-n-j-i-n-g')).toBe(true);
    });

    test('should detect similar words with levenshtein', () => {
      filter.enableLevenshteinDetection(0.8, 2);
      expect(filter.isProfane('anjiing')).toBe(true); // Extra 'i'
    });
  });

  describe('batch analysis', () => {
    test('should analyze multiple strings correctly', () => {
      const texts = [
        'Ini kalimat bersih tanpa kata kotor',
        'Dasar anjing kamu!',
        'Saya sangat suka kucing dan anjing peliharaan',
      ];

      const result = filter.batchAnalyze(texts);
      expect(result.totalTexts).toBe(3);
      expect(result.profaneTexts).toBe(2);
      expect(result.cleanTexts).toBe(1);
    });
  });

  describe('sentence analysis', () => {
    test('should analyze by sentence correctly', () => {
      const text =
        'Kalimat pertama bersih. Kalimat kedua anjing kotor. Kalimat ketiga juga bersih.';
      const results = filter.analyzeBySentence(text);

      expect(results.length).toBe(3);
      expect(results[0].hasProfanity).toBe(false);
      expect(results[1].hasProfanity).toBe(true);
      expect(results[2].hasProfanity).toBe(false);
    });
  });

  describe('context analysis', () => {
    test('should provide context around profanity', () => {
      const text = 'Saya sangat kesal dengan perilaku anjing tersebut karena sangat mengganggu';
      const results = filter.analyzeWithContext(text, 3);

      expect(results.length).toBe(1);
      expect(results[0].word).toBe('anjing');
      expect(results[0].context).toContain('kesal dengan perilaku anjing tersebut karena');
    });
  });
});
