import { analyze, batchAnalyze, analyzeBySentence, analyzeWithContext } from '../src/core/analyzer';

describe('Analyzer Core', () => {
  describe('analyze function', () => {
    test('should correctly analyze clean text', () => {
      const result = analyze('Ini adalah kalimat yang sopan');
      expect(result.hasProfanity).toBe(false);
      expect(result.matches).toEqual([]);
      expect(result.severityScore).toBe(0);
    });

    test('should correctly analyze text with profanity', () => {
      const result = analyze('Dasar anjing!');
      expect(result.hasProfanity).toBe(true);
      expect(result.matches).toContain('anjing');
      expect(result.severityScore).toBeGreaterThan(0);
    });

    test('should correctly analyze text with multiple profanities', () => {
      const result = analyze('Dasar anjing dan babi!');
      expect(result.hasProfanity).toBe(true);
      expect(result.matches).toContain('anjing');
      expect(result.matches).toContain('babi');
      expect(result.matches.length).toBe(2);
    });

    test('should provide region information', () => {
      // Assuming "anjing" is categorized as 'general' region
      const result = analyze('anjing');
      expect(result.regions).toContain('general');
    });

    test('should provide category information', () => {
      // Assuming "anjing" is categorized as 'profanity'
      const result = analyze('anjing');
      expect(result.categories).toContain('profanity');
    });

    test('should detect similar words when option enabled', () => {
      const result = analyze('anjiing', { detectSimilarity: true });
      expect(result.hasProfanity).toBe(true);
      expect(result.similarWords).toBeDefined();
      expect(result.similarWords!.length).toBeGreaterThan(0);
    });

    test('should respect whitelist', () => {
      const result = analyze('anjing', { whitelist: ['anjing'] });
      expect(result.hasProfanity).toBe(false);
      expect(result.matches).toEqual([]);
    });
  });

  describe('batchAnalyze function', () => {
    test('should analyze multiple texts', () => {
      const texts = ['Ini kalimat bersih', 'Dasar anjing kamu!', 'Babi itu jorok'];

      const result = batchAnalyze(texts);
      expect(result.totalTexts).toBe(3);
      expect(result.profaneTexts).toBe(2);
      expect(result.cleanTexts).toBe(1);
      expect(result.mostFrequentWords.length).toBeGreaterThan(0);
    });
  });

  describe('analyzeBySentence function', () => {
    test('should analyze text by sentence', () => {
      const text =
        'Kalimat pertama bersih. Kalimat kedua anjing kotor. Kalimat ketiga juga bersih.';
      const results = analyzeBySentence(text);

      expect(results.length).toBe(3);
      expect(results[0].hasProfanity).toBe(false);
      expect(results[1].hasProfanity).toBe(true);
      expect(results[1].matches).toContain('anjing');
      expect(results[2].hasProfanity).toBe(false);
    });
  });

  describe('analyzeWithContext function', () => {
    test('should provide context around profanity', () => {
      const text = 'Saya sangat kesal dengan perilaku anjing tersebut karena sangat mengganggu';
      const results = analyzeWithContext(text, 3);

      expect(results.length).toBe(1);
      expect(results[0].word).toBe('anjing');
      expect(results[0].context).toContain('perilaku anjing tersebut');
    });
  });
});
