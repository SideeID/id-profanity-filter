import { ProfanityWord } from '../../types';
import { general } from '../regions/general';
import { jawa } from '../regions/jawa';
import { sunda } from '../regions/sunda';
import { betawi } from '../regions/betawi';
import { minang } from '../regions/minang';
import madura from '../regions/madura';
import aceh from '../regions/aceh';
import bali from '../regions/bali';
import batak from '../regions/batak';

export const drugs: ProfanityWord[] = [
  ...general.filter((word) => word.category === 'drugs'),
  ...jawa.filter((word) => word.category === 'drugs'),
  ...sunda.filter((word) => word.category === 'drugs'),
  ...betawi.filter((word) => word.category === 'drugs'),
  ...minang.filter((word) => word.category === 'drugs'),
  ...madura.filter((word) => word.category === 'drugs'),
  ...sunda.filter((word) => word.category === 'drugs'),
  ...aceh.filter((word) => word.category === 'drugs'),
  ...bali.filter((word) => word.category === 'drugs'),
  ...batak.filter((word) => word.category === 'drugs'),

  {
    word: 'ganja',
    category: 'drugs',
    region: 'general',
    severity: 0.6,
    aliases: ['cimeng', 'kanabis', 'marijuana'],
    description: 'Tanaman yang mengandung zat psikoaktif',
    context: 'Digunakan untuk merujuk pada narkotika jenis cannabis',
  },
  {
    word: 'sabu',
    category: 'drugs',
    region: 'general',
    severity: 0.8,
    aliases: ['crystal', 'meth', 'ss'],
    description: 'Narkotika jenis metamfetamin',
    context: 'Istilah untuk metamfetamin yang merupakan narkotika berbahaya',
  },
  {
    word: 'inex',
    category: 'drugs',
    region: 'general',
    severity: 0.7,
    aliases: ['ekstasi', 'pil'],
    description: 'Obat terlarang yang mengandung MDMA',
    context: 'Nama slang untuk obat terlarang ecstasy',
  },
  {
    word: 'sakaw',
    category: 'drugs',
    region: 'general',
    severity: 0.5,
    aliases: ['ketagihan', 'menarik'],
    description: 'Gejala putus obat pada pecandu',
    context: 'Menggambarkan kondisi pecandu yang sedang mengalami gejala putus obat',
  },
  {
    word: 'ngepil',
    category: 'drugs',
    region: 'jawa',
    severity: 0.3,
    aliases: ['minum pil', 'telan pil'],
    description: 'Mengkonsumsi obat-obatan terlarang dalam bentuk pil',
    context: 'Istilah dalam bahasa gaul untuk mengkonsumsi obat terlarang jenis tablet',
  },
  {
    word: 'nyimeng',
    category: 'drugs',
    region: 'sunda',
    severity: 0.6,
    aliases: ['nyimang', 'isap ganja'],
    description: 'Mengisap ganja atau marijuana',
    context: 'Istilah sunda untuk aktivitas mengkonsumsi ganja',
  },
];

export const drugsWords = drugs.map((item) => item.word);
export default drugs;
