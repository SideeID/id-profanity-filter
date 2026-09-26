import { ProfanityWord } from '../types';
import { sexualWords } from './categories/sexual';
import { insultWords } from './categories/insult';
import { profanityWords } from './categories/profanity';
import { slurWords } from './categories/slur';
import { drugsWords } from './categories/drugs';
import { disgustingWords } from './categories/disgusting';
import { blasphemyWords } from './categories/blasphemy';

import { general, generalWords } from './regions/general';
import { jawa, jawaWords } from './regions/jawa';
import { sunda, sundaWords } from './regions/sunda';
import { betawi, betawiWords } from './regions/betawi';
import { batak, batakWords } from './regions/batak';
import { minang, minangWords } from './regions/minang';
import { bali, baliWords } from './regions/bali';
import { madura, maduraWords } from './regions/madura';
import { aceh, acehWords } from './regions/aceh';

export const wordCategories = {
  sexual: sexualWords,
  insult: insultWords,
  profanity: profanityWords,
  slur: slurWords,
  drugs: drugsWords,
  disgusting: disgustingWords,
  blasphemy: blasphemyWords,
};

export const wordRegions = {
  general: generalWords,
  jawa: jawaWords,
  sunda: sundaWords,
  betawi: betawiWords,
  batak: batakWords,
  minang: minangWords,
  bali: baliWords,
  madura: maduraWords,
  aceh: acehWords,
};

export const wordObjects: ProfanityWord[] = [
  ...general,
  ...jawa,
  ...sunda,
  ...betawi,
  ...batak,
  ...minang,
  ...bali,
  ...madura,
  ...aceh,
];

export const allWords: string[] = wordObjects.map((item) => item.word);

/**
 * Kata-kata dengan tingkat keparahan tinggi (subset dari semua kata)
 */
export const severeWords: string[] = wordObjects
  .filter((word) => word.severity >= 0.8)
  .map((item) => item.word);

/**
 * Mencari kata berdasarkan kategori dan region
 *
 * @param category Kategori kata kotor
 * @param region Daerah asal kata kotor
 * @returns Array dari kata kotor
 */
export function getWordsByFilter(category?: string, region?: string): string[] {
  if (category && !region && category in wordCategories) {
    return wordCategories[category as keyof typeof wordCategories];
  }

  if (region && !category && region in wordRegions) {
    return wordRegions[region as keyof typeof wordRegions];
  }

  return wordObjects
    .filter((word) => {
      const matchCategory = category ? word.category === category : true;
      const matchRegion = region ? word.region === region : true;
      return matchCategory && matchRegion;
    })
    .map((item) => item.word);
}

/**
 * Mencari metadata lengkap untuk sebuah kata
 *
 * @param word Kata yang dicari
 * @returns Objek ProfanityWord jika ditemukan, undefined jika tidak
 */
export function getWordMetadata(word: string): ProfanityWord | undefined {
  return wordObjects.find(
    (item) =>
      item.word.toLowerCase() === word.toLowerCase() ||
      (item.aliases && item.aliases.some((alias) => alias.toLowerCase() === word.toLowerCase()))
  );
}

export default allWords;
