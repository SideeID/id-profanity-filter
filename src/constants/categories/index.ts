import { sexual } from './sexual';
import { insult } from './insult';
// import { profanity } from './profanity';
// import { slur } from './slur';
// import { drugs } from './drugs';
// import { disgusting } from './disgusting';
// import { blasphemy } from './blasphemy';

export const categories = {
  sexual, // Kata-kata berbau seksual
  insult, // Kata-kata penghinaan
  // profanity, // Umpatan umum
  // slur, // Perkataan merendahkan berdasarkan identitas
  // drugs, // Terkait narkoba
  // disgusting, // Kata-kata menjijikkan
  // blasphemy, // Penistaan agama
};

export { sexual, insult };

export const allCategoryWords = [
  ...sexual,
  ...insult,
  // ...profanity,
  // ...slur,
  // ...drugs,
  // ...disgusting,
  // ...blasphemy,
];

export default allCategoryWords;
