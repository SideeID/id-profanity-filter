import { ProfanityWord } from '../../types';

export const bali: ProfanityWord[] = [
  {
    word: 'cicing',
    category: 'insult',
    region: 'bali',
    severity: 0.7,
    aliases: [],
    description: 'Secara harfiah berarti anjing',
    context: 'Umpatan umum di Bali untuk menyebut orang yang dianggap hina atau tidak berguna',
  },
  {
    word: 'bengkung',
    category: 'insult',
    region: 'bali',
    severity: 0.5,
    aliases: [],
    description: 'Berarti bengkok atau tidak lurus (juga bisa berarti tidak jujur)',
    context: 'Umpatan ringan untuk menyebut orang yang tidak jujur atau berkelakuan buruk',
  },
  {
    word: 'belog',
    category: 'insult',
    region: 'bali',
    severity: 0.6,
    aliases: [],
    description: 'Berarti bodoh',
    context: 'Umpatan umum untuk menyebut seseorang yang tidak pintar',
  },
];

export const baliWords = bali.map((item) => item.word);

export default bali;
