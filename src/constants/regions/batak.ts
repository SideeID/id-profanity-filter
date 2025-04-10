import { ProfanityWord } from '../../types';

export const batak: ProfanityWord[] = [
  {
    word: 'sundel',
    category: 'sexual',
    region: 'batak',
    severity: 0.8,
    aliases: ['sundal'],
    description: 'Kata kasar untuk menyebut pekerja seks komersial',
    context: 'Hinaan kasar untuk wanita',
  },
];

export const batakWords = batak.map((item) => item.word);

export default batak;
