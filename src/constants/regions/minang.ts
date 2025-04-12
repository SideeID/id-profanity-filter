import { ProfanityWord } from '../../types';

export const minang: ProfanityWord[] = [
  {
    word: 'pantek',
    category: 'insult',
    region: 'minang',
    severity: 1,
    aliases: ['pantak','kalera'],
    description: 'Secara harfiah berarti "kelamin pria',
    context: 'Digunakan ketika kesal dan mengumpat ke sesorang',
  },
  {
    word: 'kondiak',
    category: 'insult',
    region: 'minang',
    severity: 0.5,
    aliases: ['kondik', 'kandiak'],
    description: 'Secara harfiah berarti "babi"',
    context: 'Digunakan ketika bercanda dengan teman sebaya',
  },
  {
    word: 'binga',
    category: 'insult',
    region: 'minang',
    severity: 0.4,
    aliases: ['tele', 'binguang'],
    description: 'Secara harfiah berarti "tolol"',
    context: 'Digunakan untuk menyebut orang yang dianggap bodoh dalam melakukan sesuatu',
  },
  {
    word: 'incek',
    category: 'sexual',
    region: 'minang',
    severity: 0.8,
    aliases: ['ncek'],
    description: 'Secara harfiah berarti "kelamin wanita"',
    context: 'Digunakan ketika menyerang pribadi sesorang',
  },
  {
    word: 'kanciang',
    category: 'sexual',
    region: 'minang',
    severity: 0.3,
    aliases: ['kanciang'],
    description: 'Secara harfiah berarti "pipis"',
    context: 'Digunakan ketika orang tersebut melakukan kesalahan',
  },
];

export const maduraWords = minang.map((item) => item.word);

export default minang;
