import { ProfanityWord } from '../../types';
import { general } from '../regions/general';
import { jawa } from '../regions/jawa';
import { sunda } from '../regions/sunda';
import { betawi } from '../regions/betawi';
import minang from '../regions/minang';
import madura from '../regions/madura';
import aceh from '../regions/aceh';
import bali from '../regions/bali';
import batak from '../regions/batak';

export const profanity: ProfanityWord[] = [
  ...general.filter((word) => word.category === 'profanity'),
  ...jawa.filter((word) => word.category === 'profanity'),
  ...sunda.filter((word) => word.category === 'profanity'),
  ...betawi.filter((word) => word.category === 'profanity'),
  ...minang.filter((word) => word.category === 'profanity'),
  ...madura.filter((word) => word.category === 'profanity'),
  ...sunda.filter((word) => word.category === 'profanity'),
  ...aceh.filter((word) => word.category === 'profanity'),
  ...bali.filter((word) => word.category === 'profanity'),
  ...batak.filter((word) => word.category === 'profanity'),

  {
    word: 'anjing',
    category: 'profanity',
    region: 'general',
    severity: 0.9,
    aliases: ['anjir', 'anying', 'njing', 'njir'],
    description: 'Kata umpatan yang mengacu pada hewan anjing',
    context: 'Digunakan sebagai ekspresi kemarahan atau frustasi',
  },
  {
    word: 'babi',
    category: 'profanity',
    region: 'general',
    severity: 0.8,
    aliases: ['babik', 'khinzir'],
    description: 'Kata umpatan yang mengacu pada hewan babi',
    context: 'Digunakan untuk mengekspresikan kemarahan atau menghina seseorang',
  },
  {
    word: 'bangsat',
    category: 'profanity',
    region: 'general',
    severity: 0.8,
    aliases: ['bgst', 'bangst'],
    description: 'Kata umpatan kasar yang berarti kutu atau parasit',
    context: 'Digunakan untuk menunjukkan kemarahan atau menghina seseorang',
  },
  {
    word: 'kampret',
    category: 'profanity',
    region: 'general',
    severity: 0.7,
    aliases: ['kampret lu', 'kampretot'],
    description: 'Kata umpatan yang mengacu pada jenis kelelawar kecil',
    context: 'Digunakan untuk mengungkapkan kekesalan atau menghina seseorang',
  },
  {
    word: 'sialan',
    category: 'profanity',
    region: 'general',
    severity: 0.6,
    aliases: ['sial', 'siaal'],
    description: 'Kata umpatan yang menunjukkan nasib buruk',
    context: 'Digunakan untuk mengekspresikan kekesalan atau kemarahan',
  },
  {
    word: 'monyet',
    category: 'profanity',
    region: 'general',
    severity: 0.7,
    aliases: ['monyong', 'munyuk'],
    description: 'Kata umpatan yang mengacu pada hewan primata',
    context: 'Digunakan untuk menghina atau mengekspresikan kemarahan',
  },
  {
    word: 'bajingan',
    category: 'profanity',
    region: 'general',
    severity: 0.8,
    aliases: ['bajinga', 'bjngn'],
    description: 'Kata umpatan yang berarti penjahat atau orang jahat',
    context: 'Digunakan untuk mengumpat seseorang yang dianggap buruk perilakunya',
  },
  {
    word: 'jancok',
    category: 'profanity',
    region: 'jawa',
    severity: 0.9,
    aliases: ['jancuk', 'jancik', 'dancok'],
    description: 'Kata umpatan kasar dalam bahasa Jawa',
    context: 'Umpatan sangat kasar dalam budaya Jawa, menunjukkan kemarahan yang tinggi',
  },
  {
    word: 'cuk',
    category: 'profanity',
    region: 'jawa',
    severity: 0.8,
    aliases: ['cok', 'cug'],
    description: 'Bentuk singkat dari jancok',
    context: 'Versi pendek dari umpatan jancok, digunakan dalam percakapan sehari-hari',
  },
  {
    word: 'asu',
    category: 'profanity',
    region: 'jawa',
    severity: 0.8,
    aliases: ['asyu', 'su'],
    description: 'Kata Jawa untuk anjing, digunakan sebagai umpatan',
    context: 'Ekspresi umpatan yang umum di masyarakat Jawa',
  },
  {
    word: 'sia',
    category: 'profanity',
    region: 'sunda',
    severity: 0.6,
    aliases: ['siah', 'siaa'],
    description: 'Kata ganti orang kedua dalam bahasa Sunda yang kasar',
    context: 'Menunjukkan ketidakhormatan pada lawan bicara dalam konteks Sunda',
  },
  {
    word: 'lu',
    category: 'profanity',
    region: 'betawi',
    severity: 0.4,
    aliases: ['elu', 'lo'],
    description: 'Kata ganti orang kedua dalam dialek Betawi',
    context:
      'Dapat dianggap kasar dalam konteks formal atau saat berbicara dengan orang yang lebih tua',
  },
  {
    word: 'goblok',
    category: 'profanity',
    region: 'general',
    severity: 0.7,
    aliases: ['goblog', 'goblokk', 'bego', 'bodoh'],
    description: 'Kata umpatan yang menunjukkan kebodohan',
    context: 'Digunakan untuk menghina kecerdasan seseorang',
  },
];

export const profanityWords = profanity.map((item) => item.word);
export default profanity;
