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

export const slur: ProfanityWord[] = [
  ...general.filter((word) => word.category === 'slur'),
  ...jawa.filter((word) => word.category === 'slur'),
  ...sunda.filter((word) => word.category === 'slur'),
  ...betawi.filter((word) => word.category === 'slur'),
  ...minang.filter((word) => word.category === 'slur'),
  ...madura.filter((word) => word.category === 'slur'),
  ...sunda.filter((word) => word.category === 'slur'),
  ...aceh.filter((word) => word.category === 'slur'),
  ...bali.filter((word) => word.category === 'slur'),
  ...batak.filter((word) => word.category === 'slur'),

  {
    word: 'cina',
    category: 'slur',
    region: 'general',
    severity: 0.7,
    aliases: ['cino', 'china'],
    description: 'Sebutan yang dianggap merendahkan untuk orang keturunan Tionghoa',
    context: 'Dianggap tidak sopan dan sebaiknya diganti dengan "Tionghoa"',
  },
  {
    word: 'banci',
    category: 'slur',
    region: 'general',
    severity: 0.7,
    aliases: ['bencong', 'waria', 'bences'],
    description: 'Istilah merendahkan untuk transgender atau pria yang dianggap feminin',
    context: 'Digunakan sebagai hinaan terhadap identitas gender atau ekspresi gender seseorang',
  },
  {
    word: 'autis',
    category: 'slur',
    region: 'general',
    severity: 0.6,
    aliases: ['autis lu', 'autisan'],
    description: 'Penyalahgunaan kondisi medis sebagai hinaan',
    context:
      'Menggunakan kondisi spektrum autisme sebagai hinaan untuk seseorang yang dianggap aneh',
  },
  {
    word: 'londo',
    category: 'slur',
    region: 'jawa',
    severity: 0.5,
    aliases: ['landa', 'landi'],
    description: 'Sebutan untuk orang Belanda atau orang berkulit putih',
    context: 'Dapat bersifat merendahkan tergantung konteks dan nada bicara',
  },
  {
    word: 'keling',
    category: 'slur',
    region: 'general',
    severity: 0.8,
    aliases: ['kaling', 'hitam legam'],
    description: 'Istilah merendahkan untuk orang India atau berkulit gelap',
    context: 'Dianggap sangat tidak sopan dan bernada rasis',
  },
  {
    word: 'cacat',
    category: 'slur',
    region: 'general',
    severity: 0.7,
    aliases: ['cacad', 'difabel'],
    description: 'Istilah merendahkan untuk penyandang disabilitas',
    context: 'Digunakan sebagai hinaan untuk menunjukkan ketidaksempurnaan',
  },
  {
    word: 'gembel',
    category: 'slur',
    region: 'general',
    severity: 0.6,
    aliases: ['gembul', 'gelandangan'],
    description: 'Istilah merendahkan untuk orang tidak mampu atau tunawisma',
    context: 'Mengandung stigma terhadap kemiskinan dan kelas sosial',
  },
  {
    word: 'kampungan',
    category: 'slur',
    region: 'general',
    severity: 0.5,
    aliases: ['ndeso', 'katrok', 'udik'],
    description: 'Istilah merendahkan untuk orang dari daerah pedesaan',
    context: 'Menyiratkan seseorang tidak beradab, tidak berpendidikan, atau ketinggalan zaman',
  },
  {
    word: 'tolol',
    category: 'slur',
    region: 'general',
    severity: 0.6,
    aliases: ['tololnya', 'tolo'],
    description: 'Hinaan terhadap kecerdasan seseorang',
    context: 'Digunakan untuk menghina kapasitas mental seseorang',
  },
];

export const slurWords = slur.map((item) => item.word);
export default slur;
