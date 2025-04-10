import { ProfanityWord } from '../../types';

export const jawa: ProfanityWord[] = [
  {
    word: 'asu',
    category: 'profanity',
    region: 'jawa',
    severity: 0.7,
    aliases: ['asyu', 'su'],
    description: 'Secara harfiah berarti anjing dalam Bahasa Jawa',
    context: 'Umpatan umum dalam Bahasa Jawa untuk menunjukkan kemarahan',
  },
  {
    word: 'jancok',
    category: 'sexual',
    region: 'jawa',
    severity: 0.8,
    aliases: ['jancuk', 'jncok', 'jancuk', 'jncuk', 'dancok', 'dancuk'],
    description: 'Kata umpatan kasar dalam Bahasa Jawa',
    context: 'Umpatan kasar yang umum digunakan di Jawa Timur',
  },
  {
    word: 'cuk',
    category: 'sexual',
    region: 'jawa',
    severity: 0.7,
    aliases: ['cok', 'cook'],
    description: 'Singkatan dari jancok/jancuk',
    context: 'Umpatan singkat yang umum digunakan di Jawa Timur',
  },
  {
    word: 'diancok',
    category: 'sexual',
    region: 'jawa',
    severity: 0.8,
    aliases: ['diancuk', 'dancok', 'ancok'],
    description: 'Variasi dari jancok/jancuk',
    context: 'Umpatan kasar yang umum digunakan di Jawa Timur',
  },
  {
    word: 'matamu',
    category: 'insult',
    region: 'jawa',
    severity: 0.5,
    aliases: ['mripat mu', 'matane'],
    description:
      'Secara harfiah berarti matamu, digunakan sebagai umpatan ringan',
    context:
      'Umpatan ringan untuk menanggapi sesuatu yang dianggap tidak benar',
  },
  {
    word: 'mbokne ancok',
    category: 'insult',
    region: 'jawa',
    severity: 0.8,
    aliases: ['mbokne', 'mbokneancok'],
    description: 'Umpatan yang menyinggung ibu seseorang',
    context: 'Umpatan kasar yang menyinggung orangtua orang lain',
  },
  {
    word: 'pekok',
    category: 'insult',
    region: 'jawa',
    severity: 0.6,
    aliases: ['pekak', 'pekilk'],
    description: 'Kata hinaan yang menunjukkan kebodohan',
    context: 'Hinaan untuk menyebut orang yang dianggap sangat bodoh',
  },
  {
    word: 'sempak',
    category: 'disgusting',
    region: 'jawa',
    severity: 0.5,
    aliases: ['sempok'],
    description: 'Mengacu pada pakaian dalam',
    context: 'Umpatan ringan yang dianggap jorok',
  },
  {
    word: 'taek',
    category: 'disgusting',
    region: 'jawa',
    severity: 0.6,
    aliases: ['tai', 'tahi', 'telek'],
    description: 'Secara harfiah berarti kotoran/tinja',
    context: 'Umpatan untuk menunjukkan sesuatu yang menjijikkan atau buruk',
  },
  {
    word: 'ndhasmu',
    category: 'insult',
    region: 'jawa',
    severity: 0.5,
    aliases: ['ndas mu', 'dhasmu'],
    description:
      'Secara harfiah berarti kepalamu, digunakan sebagai umpatan ringan',
    context:
      'Umpatan ringan untuk menanggapi sesuatu yang dianggap tidak benar',
  },
];

export const jawaWords = jawa.map((item) => item.word);

export default jawa;
