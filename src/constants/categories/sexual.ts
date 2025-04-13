import { ProfanityWord } from "../../types";
import { general } from "../regions/general";
import { jawa } from "../regions/jawa";
import { sunda } from "../regions/sunda";
import { betawi } from "../regions/betawi";
import minang from "../regions/minang";

export const sexual: ProfanityWord[] = [
  ...general.filter((word) => word.category === "sexual"),
  ...jawa.filter((word) => word.category === "sexual"),
  ...sunda.filter((word) => word.category === "sexual"),
  ...betawi.filter((word) => word.category === "sexual"),
  ...minang.filter((word) => word.category === "sexual"),
  {
    word: "bokep",
    category: "sexual",
    region: "general",
    severity: 0.7,
    aliases: ["bkp", "bokap"],
    description: "Istilah untuk video atau konten pornografi",
    context: "Kata yang mengacu pada materi pornografi",
  },
  {
    word: "coli",
    category: "sexual",
    region: "general",
    severity: 0.8,
    aliases: ["col", "coly"],
    description: "Istilah untuk masturbasi laki-laki",
    context: "Kata vulgar yang merujuk pada aktivitas seksual pribadi",
  },
  {
    word: "desah",
    category: "sexual",
    region: "general",
    severity: 0.6,
    aliases: ["ds4h", "dsh"],
    description: "Istilah untuk suara yang dibuat selama aktivitas seksual",
    context: "Dapat menjadi vulgar tergantung konteks penggunaan",
  },
  {
    word: "seks",
    category: "sexual",
    region: "general",
    severity: 0.5,
    aliases: ["sex", "ML"],
    description: "Istilah untuk aktivitas seksual",
    context: "Dapat menjadi vulgar tergantung konteks penggunaan",
  },
  {
    word: "itil",
    category: "sexual",
    region: "general",
    severity: 0.9,
    aliases: ["itl", "itul"],
    description:
      "Kata vulgar yang mengacu pada bagian dari alat kelamin perempuan",
    context: "Kata vulgar yang merujuk pada anatomi seksual",
  },
  {
    word: "kondom",
    category: "sexual",
    region: "general",
    severity: 0.5,
    aliases: ["kndm", "kondom", "cd"],
    description: "Alat kontrasepsi",
    context: "Dapat menjadi vulgar tergantung konteks penggunaan",
  },
  {
    word: "ngewe",
    category: "sexual",
    region: "general",
    severity: 0.9,
    aliases: ["ngew", "we"],
    description: "Istilah kasar untuk aktivitas seksual",
    context: "Kata vulgar yang merujuk pada aktivitas seksual",
  },
  {
    word: "puki",
    category: "sexual",
    region: "general",
    severity: 0.9,
    aliases: ["puk", "pukih"],
    description: "Kata vulgar yang mengacu pada alat kelamin perempuan",
    context: "Kata vulgar yang merujuk pada anatomi seksual",
  },
  {
    word: "xxx",
    category: "sexual",
    region: "general",
    severity: 0.6,
    aliases: ["xXx", "triplex"],
    description:
      "Simbol yang sering digunakan untuk menandai konten pornografi",
    context: "Digunakan untuk menandai konten seksual eksplisit",
  },
];

export const sexualWords = sexual.map((item) => item.word);

export default sexual;
