import { ProfanityWord } from '../../types';

export const sunda: ProfanityWord[] = [
  {
    word: 'bagong',
    category: 'insult',
    region: 'sunda',
    severity: 0.5,
    aliases: ['bagog'],
    description: 'Secara harfiah berarti babi hutan, digunakan sebagai hinaan',
    context: 'Hinaan untuk menyebut orang yang dianggap jorok atau rakus',
  },
  {
    word: 'belegug',
    category: 'insult',
    region: 'sunda',
    severity: 0.5,
    aliases: ['belecuk', 'beledog'],
    description: 'Kata yang mengacu pada kebodohan seseorang',
    context: 'Hinaan untuk menyebut orang yang dianggap tidak pintar',
  },
  {
    word: 'goblog',
    category: 'insult',
    region: 'sunda',
    severity: 0.6,
    aliases: ['goblok', 'golbok'],
    description: 'Kata yang mengacu pada kebodohan seseorang',
    context: 'Hinaan untuk menyebut orang yang dianggap tidak pintar',
  },
];

export const sundaWords = sunda.map((item) => item.word);

export default sunda;
