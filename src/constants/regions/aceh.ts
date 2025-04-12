import { ProfanityWord } from '../../types';

export const aceh: ProfanityWord[] = [
  {
    word: 'pukoe ma',
    category: 'sexual',
    region: 'aceh',
    severity: 0.9,
    aliases: ['pukoima', 'pukima'],
    description: 'Secara harfiah berarti kemaluan ibu',
    context: 'Umpatan sangat kasar yang menyerang ibu seseorang',
  },
  {
    word: 'bui',
    category: 'insult',
    region: 'aceh',
    severity: 0.6,
    aliases: [],
    description: 'Secara harfiah berarti babi',
    context:
      'Umpatan untuk menyebut orang yang dianggap kotor, rakus, atau tidak berakhlak',
  },
  {
    word: 'asèe',
    category: 'insult',
    region: 'aceh',
    severity: 0.6,
    aliases: ['asee'],
    description: 'Secara harfiah berarti anjing',
    context:
      'Umpatan untuk menyebut orang yang dianggap hina atau tidak berguna',
  },
  {
    word: 'haramjadah',
    category: 'insult',
    region: 'aceh',
    severity: 0.8,
    aliases: [],
    description:
      'Berarti kurang ajar atau anak haram (lebih halus dari aneuk bajeung)',
    context:
      'Umpatan kasar untuk menyebut anak yang tidak sopan atau tidak beradab',
  },
  {
    word: "pa'ak",
    category: 'insult',
    region: 'aceh',
    severity: 0.6,
    aliases: [],
    description: 'Berarti bodoh',
    context: 'Umpatan untuk menyebut seseorang yang tidak pintar',
  },
  {
    word: 'sangak',
    category: 'insult',
    region: 'aceh',
    severity: 0.6,
    aliases: [],
    description: "Berarti bodoh (lebih kasar dari pa'ak)",
    context: 'Umpatan kasar untuk menyebut seseorang yang sangat bodoh',
  },
];

export const acehWords = aceh.map((item) => item.word);

export default aceh;