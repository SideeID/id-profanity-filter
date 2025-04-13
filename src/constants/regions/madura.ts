import { ProfanityWord } from '../../types';

export const madura: ProfanityWord[] = [
  {
    word: 'Pate',
    category: 'insult',
    region: 'madura',
    severity: 0.7,
    aliases: ['Pate', 'Pate jih', 'pate ben'],
    description: 'Secara harfiah berarti "anjing"',
    context: 'Digunakan untuk menyebut orang yang dianggap hina atau tidak berguna',
  },
  {
    word: 'Matanah',
    category: 'insult',
    region: 'madura',
    severity: 0.4,
    aliases: ['Matanah', 'Matanah jereyah'],
    description:
      'Kata kasar yang merujuk pada "mata" (bentuk kasar dari mata, sementara bentuk halusnya adalah "ma\'repat")',
    context:
      'Digunakan sebagai umpatan atau dalam ungkapan seperti "ngabes matanah rah!" (Lihat-lihat matanya, dong!) untuk menegur seseorang yang tersandung',
  },
  {
    word: 'Taeh',
    category: 'insult',
    region: 'madura',
    severity: 0.8,
    aliases: ['Taeh'],
    description: 'Secara harfiah berarti "tinja" atau "kotoran"',
    context:
      'Digunakan untuk mengungkapkan kekesalan yang ditujukan terhadap seseorang, mengumpamakan mereka dengan hal yang menjijikkan',
  },
  {
    word: 'Korang ajher',
    category: 'insult',
    region: 'madura',
    severity: 0.6,
    aliases: ['Korang ajher'],
    description: 'Berarti "kurang ajar" dalam bahasa Indonesia',
    context:
      'Digunakan saat kesal terhadap seseorang atau menghadapi tingkah laku orang lain yang dirasa kurang sopan',
  },
  {
    word: 'Gendheng',
    category: 'insult',
    region: 'madura',
    severity: 0.5,
    aliases: ['Gendheng', 'Bhungghen'],
    description: 'Berarti "bodoh" atau "goblok" dalam bahasa Indonesia',
    context: 'Digunakan untuk menghina kecerdasan seseorang yang dianggap tidak pintar',
  },
];

export const maduraWords = madura.map((item) => item.word);

export default madura;
