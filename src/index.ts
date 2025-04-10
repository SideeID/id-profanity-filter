export * from './types';

export class IDProfanityFilter {
  constructor() {
    // Inisialisasi
  }

  filter(text: string) {
    return {
      filtered: text,
      censored: 0,
      replacements: [],
    };
  }

  isProfane(text: string) {
    return false;
  }

  analyze(text: string) {
    return {
      hasProfanity: false,
      matches: [],
      matchDetails: [],
      categories: [],
      regions: [],
      severityScore: 0,
    };
  }
}

export default IDProfanityFilter;
