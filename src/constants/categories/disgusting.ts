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

export const disgusting: ProfanityWord[] = [
  ...general.filter((word) => word.category === 'disgusting'),
  ...jawa.filter((word) => word.category === 'disgusting'),
  ...sunda.filter((word) => word.category === 'disgusting'),
  ...betawi.filter((word) => word.category === 'disgusting'),
  ...minang.filter((word) => word.category === 'disgusting'),
  ...madura.filter((word) => word.category === 'disgusting'),
  ...sunda.filter((word) => word.category === 'disgusting'),
  ...aceh.filter((word) => word.category === 'disgusting'),
  ...bali.filter((word) => word.category === 'disgusting'),
  ...batak.filter((word) => word.category === 'disgusting'),

  {
    word: 'muntah',
    category: 'disgusting',
    region: 'general',
    severity: 0.4,
    aliases: ['muntaber', 'memuntahkan'],
    description: 'Muntahan atau tindakan muntah',
    context: 'Digunakan untuk mengekspresikan rasa jijik atau menggambarkan tindakan tersebut',
  },
  {
    word: 'ingus',
    category: 'disgusting',
    region: 'general',
    severity: 0.4,
    aliases: ['ingusan', 'beringus'],
    description: 'Lendir hidung',
    context: 'Digunakan untuk menggambarkan lendir hidung atau sebagai hinaan',
  },
  {
    word: 'tai',
    category: 'disgusting',
    region: 'general',
    severity: 0.8,
    aliases: ['tahi', 'kotoran'],
    description: 'Kotoran manusia',
    context: 'Istilah vulgar untuk kotoran, sering digunakan sebagai hinaan',
  },
  {
    word: 'jembut',
    category: 'disgusting',
    region: 'general',
    severity: 1.0,
    aliases: ['jembud', 'rambut kemaluan'],
    description: 'Rambut kemaluan',
    context: 'Istilah vulgar untuk rambut kemaluan, dianggap sangat tidak pantas',
  },
  {
    word: 'pecret',
    category: 'disgusting',
    region: 'sunda',
    severity: 0.8,
    aliases: ['mencret', 'diare'],
    description: 'Diare dalam bahasa Sunda',
    context: 'Dianggap vulgar ketika disebutkan di depan umum',
  },
  {
    word: 'bacot',
    category: 'disgusting',
    region: 'betawi',
    severity: 0.8,
    aliases: ['cicing', 'berisik'],
    description: 'Mulut atau omongan berisik dalam konteks vulgar',
    context: 'Istilah kasar yang digunakan untuk menyuruh seseorang diam',
  },
  {
    word: 'lendir',
    category: 'disgusting',
    region: 'general',
    severity: 0.3,
    aliases: ['berlendir', 'cairan lengket'],
    description: 'Lendir atau cairan lengket',
    context: 'Dapat digunakan dalam konteks vulgar untuk menggambarkan cairan tubuh',
  },
];

export const disgustingWords = disgusting.map((item) => item.word);
export default disgusting;
