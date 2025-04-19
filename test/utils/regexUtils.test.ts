import {
  createWordRegex,
  addLeetSpeakVariations,
  addSplitVariations,
  createEvasionRegex,
  addIndonesianVariations,
  createIndonesianVariationRegex,
  createContextRegex,
  createWordFormRegex,
} from '../../src/utils/regexUtils';

describe('Regex Utils', () => {
  describe('createWordRegex function', () => {
    test('should create basic word regex', () => {
      const regex = createWordRegex('test');
      expect(regex.test('test')).toBe(true);
      expect(regex.test('testing')).toBe(false);
      expect(regex.test('a test')).toBe(true);
    });

    test('should handle case sensitivity', () => {
      const regex = createWordRegex('test', { caseSensitive: true });
      expect(regex.test('test')).toBe(true);
      expect(regex.test('TEST')).toBe(false);
    });

    test('should handle leetspeak option', () => {
      const regex = createWordRegex('test', { leetSpeak: true });
      expect(regex.test('t3st')).toBe(true);
    });

    test('should handle Indonesian variation option', () => {
      const regex = createWordRegex('kafir', { indonesianVariation: true });
      expect(regex.test('kapir')).toBe(true); 
    });

    test('should not use word boundary when wholeWord is false', () => {
      const regex = createWordRegex('test', { wholeWord: false });
      expect(regex.test('testing')).toBe(true);
    });
  });

  describe('addLeetSpeakVariations function', () => {
    test('should add leetspeak variations', () => {
      const pattern = addLeetSpeakVariations('test');
      const regex = new RegExp(pattern);

      expect(regex.test('t3st')).toBe(true);
      expect(regex.test('te5t')).toBe(true);
      expect(regex.test('t35t')).toBe(true);
    });
  });

  describe('addSplitVariations function', () => {
    test('should add split variations', () => {
      const pattern = addSplitVariations('test');
      const regex = new RegExp(pattern);

      expect(regex.test('t-e-s-t')).toBe(true);
      expect(regex.test('t e s t')).toBe(true);
      expect(regex.test('t.e.s.t')).toBe(true);
    });
  });

  // describe('createEvasionRegex function', () => {
  //   test('should create regex to detect evasion attempts', () => {
  //     const regex = createEvasionRegex('test');

  //     expect(regex.test('t-e-s-t')).toBe(true);
  //     expect(regex.test('t e s t')).toBe(true);
  //     expect(regex.test('t.e.s.t')).toBe(true);
  //     expect(regex.test('t*e*s*t')).toBe(true);
  //   });
  // });

  describe('addIndonesianVariations function', () => {
    test('should add Indonesian spelling variations', () => {
      const pattern = addIndonesianVariations('cacing');
      const regex = new RegExp(pattern);

      expect(regex.test('kacing')).toBe(true); // c/k variation
    });
  });

  describe('createContextRegex function', () => {
    test('should create regex that captures context', () => {
      const regex = createContextRegex('test', 2);
      const text = 'This is a test of the context';
      const match = regex.exec(text);

      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe('is a '); // Before context
        expect(match[2]).toBe('test'); // The word
        expect(match[3]).toBe(' of the'); // After context
      }
    });
  });

  // describe('createWordFormRegex function', () => {
  //   test('should create regex for different word forms', () => {
  //     const regex = createWordFormRegex('ajar');

  //     expect(regex.test('ajar')).toBe(true);
  //     expect(regex.test('belajar')).toBe(true);
  //     expect(regex.test('mengajar')).toBe(true);
  //     expect(regex.test('pengajaran')).toBe(true);
  //     expect(regex.test('ajari')).toBe(true);
  //   });
  // });
});
