import { ProfanityWord } from '../../types';

export const general: ProfanityWord[] = [
  {
    word: 'anjing',
    category: 'profanity',
    region: 'general',
    severity: 0.7,
    aliases: ['anjay', 'anjir', 'anying', 'njing', 'anj'],
    description: 'Mengacu pada hewan anjing, digunakan sebagai umpatan',
    context: 'Umpatan umum untuk menunjukkan kemarahan atau ketidaksetujuan',
  },
  {
    word: 'babi',
    category: 'profanity',
    region: 'general',
    severity: 0.6,
    aliases: ['bab1', 'b4b1'],
    description: 'Mengacu pada hewan babi, digunakan sebagai umpatan',
    context: 'Umpatan umum untuk menunjukkan kemarahan atau ketidaksetujuan',
  },
  {
    word: 'bangsat',
    category: 'insult',
    region: 'general',
    severity: 0.8,
    aliases: ['bangst', 'bngst', 'bgst'],
    description:
      'Secara harfiah berarti kutu busuk, digunakan sebagai umpatan untuk menyebut seseorang yang tidak bermoral',
    context:
      'Umpatan kasar untuk menyebut orang yang dianggap jahat atau merugikan',
  },
  {
    word: 'kontol',
    category: 'sexual',
    region: 'general',
    severity: 0.9,
    aliases: ['kntl', 'k0ntol', 'k0nt0l'],
    description: 'Kata vulgar yang mengacu pada alat kelamin laki-laki',
    context: 'Umpatan kasar atau istilah vulgar untuk alat kelamin',
  },
  {
    word: 'memek',
    category: 'sexual',
    region: 'general',
    severity: 0.9,
    aliases: ['mmk', 'memk'],
    description: 'Kata vulgar yang mengacu pada alat kelamin perempuan',
    context: 'Umpatan kasar atau istilah vulgar untuk alat kelamin',
  },
  {
    word: 'bego',
    category: 'insult',
    region: 'general',
    severity: 0.5,
    aliases: ['bgo', 'begok'],
    description: 'Kata yang mengacu pada kebodohan seseorang',
    context: 'Hinaan untuk menyebut orang yang dianggap tidak pintar',
  },
  {
    word: 'tolol',
    category: 'insult',
    region: 'general',
    severity: 0.6,
    aliases: ['tll', 'tlol'],
    description: 'Kata yang mengacu pada kebodohan seseorang',
    context: 'Hinaan untuk menyebut orang yang dianggap tidak pintar',
  },
  {
    word: 'bajingan',
    category: 'insult',
    region: 'general',
    severity: 0.7,
    aliases: ['bajingn', 'bjgn'],
    description: 'Kata yang mengacu pada orang jahat atau tidak bermoral',
    context:
      'Hinaan untuk menyebut orang yang dianggap jahat atau tidak bermoral',
  },
  {
    word: 'goblok',
    category: 'insult',
    region: 'general',
    severity: 0.6,
    aliases: ['gblk', 'goblk'],
    description: 'Kata yang mengacu pada kebodohan seseorang',
    context: 'Hinaan untuk menyebut orang yang dianggap tidak pintar',
  },
  {
    word: 'keparat',
    category: 'insult',
    region: 'general',
    severity: 0.7,
    aliases: ['kprt', 'keprat'],
    description: 'Kata yang mengacu pada orang jahat atau tidak bermoral',
    context:
      'Hinaan untuk menyebut orang yang dianggap jahat atau tidak bermoral',
  },
];


export const generalWords = general.map((item) => item.word);

export default general;
