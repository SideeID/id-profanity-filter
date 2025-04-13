import { ProfanityWord } from '../../types';

export const betawi: ProfanityWord[] = [
  {
    word: 'jablay',
    category: 'sexual',
    region: 'betawi',
    severity: 0.7,
    aliases: ['jabl4y', 'jalay'],
    description: 'Singkatan dari "jarang dibelai", istilah untuk perempuan yang mudah didekati',
    context: 'Hinaan yang merendahkan untuk wanita',
  },
  {
    word: 'udik',
    category: 'insult',
    region: 'betawi',
    severity: 0.5,
    aliases: ['kampungan', 'ndeso'],
    description:
      'Kata yang mengacu pada seseorang yang dianggap ketinggalan zaman atau tidak modern',
    context: 'Hinaan untuk menyebut orang yang dianggap tidak modern atau kampungan',
  },
  {
    word: 'perek',
    category: 'sexual',
    region: 'betawi',
    severity: 0.7,
    aliases: ['perempuan eksperimen', 'prk'],
    description: 'Istilah untuk perempuan yang dianggap memiliki moral yang rendah',
    context: 'Hinaan yang merendahkan untuk wanita',
  },
];

export const betawiWords = betawi.map((item) => item.word);

export default betawi;
