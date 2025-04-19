import {
  censorWord,
  normalizeText,
  containsAnyWord,
  containsEuphemism,
  detectSplitWords,
  escapeRegExp,
  maskText,
  splitIntoSentences,
  getContextAroundIndex,
} from '../../src/utils/stringUtils';

describe('String Utils', () => {
  describe('censorWord function', () => {
    test('should replace entire word by default', () => {
      expect(censorWord('test')).toBe('****');
    });

    test('should use custom replacement character', () => {
      expect(censorWord('test', '#')).toBe('####');
    });

    test('should preserve first and last letters when specified', () => {
      expect(censorWord('testing', '*', true)).toBe('t*****g');
    });

    test('should handle short words with keepFirstAndLast', () => {
      expect(censorWord('hi', '*', true)).toBe('**');
    });
  });

  describe('normalizeText function', () => {
    test('should convert to lowercase', () => {
      expect(normalizeText('TEST')).toBe('test');
    });

    test('should remove non-alphanumeric characters', () => {
      expect(normalizeText('test!')).toBe('test');
      expect(normalizeText('test#123')).toBe('test123');
    });

    test('should trim whitespace', () => {
      expect(normalizeText(' test ')).toBe('test');
    });

    test('should normalize Unicode characters', () => {
      expect(normalizeText('café')).toBe('cafe');
    });
  });

  describe('containsAnyWord function', () => {
    test('should detect whole words by default', () => {
      expect(containsAnyWord('anjing', ['anjing'])).toBe(true);
      expect(containsAnyWord('testanjing', ['anjing'])).toBe(false);
    });

    test('should detect substrings when specified', () => {
      expect(containsAnyWord('testanjing', ['anjing'], true)).toBe(true);
    });

    test('should handle multiple words', () => {
      expect(containsAnyWord('test anjing', ['test', 'anjing'])).toBe(true);
      expect(containsAnyWord('test only', ['anjing', 'babi'])).toBe(false);
    });
  });

  describe('containsEuphemism function', () => {
    test('should detect euphemisms', () => {
      expect(containsEuphemism('a****g', ['anjing'])).toBe(true);
    });

    test('should not match unrelated patterns', () => {
      expect(containsEuphemism('a**g', ['anjing'])).toBe(false);
    });

    test('should handle short words properly', () => {
      expect(containsEuphemism('a*b', ['ab'])).toBe(false); 
    });
  });

  describe('detectSplitWords function', () => {
    test('should detect split words', () => {
      expect(detectSplitWords('a-n-j-i-n-g', ['anjing'])).toBe(true);
      expect(detectSplitWords('a n j i n g', ['anjing'])).toBe(true);
    });

    test('should not detect unrelated words', () => {
      expect(detectSplitWords('a-b-c-d', ['anjing'])).toBe(false);
    });
  });

  describe('escapeRegExp function', () => {
    test('should escape special regex characters', () => {
      expect(escapeRegExp('test*')).toBe('test\\*');
      expect(escapeRegExp('test.')).toBe('test\\.');
      expect(escapeRegExp('test+')).toBe('test\\+');
    });
  });

  describe('maskText function', () => {
    test('should mask middle part of text', () => {
      expect(maskText('password', 1, 1)).toBe('p******d');
      expect(maskText('email@example.com', 2, 3)).toBe('em************com')
    });

    test('should handle short text', () => {
      expect(maskText('ab', 1, 1)).toBe('ab');
    });

    test('should handle empty text', () => {
      expect(maskText('', 1, 1)).toBe('');
    });
  });

  describe('splitIntoSentences function', () => {
    test('should split text into sentences', () => {
      const sentences = splitIntoSentences('Hello. How are you? I am fine!');
      expect(sentences.length).toBe(3);
      expect(sentences[0]).toBe('Hello.');
      expect(sentences[1]).toBe('How are you?');
      expect(sentences[2]).toBe('I am fine!');
    });

    test('should handle empty text', () => {
      expect(splitIntoSentences('')).toEqual([]);
    });
  });

  describe('getContextAroundIndex function', () => {
    const text = 'The quick brown fox jumps over the lazy dog';

    test('should get context around index', () => {
      // "fox" starts at index 16
      const context = getContextAroundIndex(text, 16, 2);
      expect(context).toBe('quick brown fox jumps over');
    });

    test('should handle index at start', () => {
      const context = getContextAroundIndex(text, 0, 2);
      expect(context).toBe('The quick brown');
    });

    test('should handle index at end', () => {
      const context = getContextAroundIndex(text, text.length - 1, 2);
      expect(context).toBe('the lazy dog');
    });

    test('should handle invalid index', () => {
      expect(getContextAroundIndex(text, -1, 2)).toBe('');
      expect(getContextAroundIndex(text, 100, 2)).toBe('');
    });
  });
});
