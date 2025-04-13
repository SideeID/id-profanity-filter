import { ProfanityWord } from "../../types";
import { general } from "../regions/general";
import { jawa } from "../regions/jawa";
import { sunda } from "../regions/sunda";
import { betawi } from "../regions/betawi";
import {minang} from "../regions/minang";

export const insult: ProfanityWord[] = [
  ...general.filter((word) => word.category === "insult"),
  ...jawa.filter((word) => word.category === "insult"),
  ...sunda.filter((word) => word.category === "insult"),
  ...betawi.filter((word) => word.category === "insult"),
  ...minang.filter((word)=>word.category==="insult"),

  {
    word: "idiot",
    category: "insult",
    region: "general",
    severity: 0.6,
    aliases: ["idi0t", "idot"],
    description: "Kata yang mengacu pada kebodohan seseorang",
    context: "Hinaan untuk menyebut orang yang dianggap sangat tidak pintar",
  },
  {
    word: "dungu",
    category: "insult",
    region: "general",
    severity: 0.5,
    aliases: ["dngu", "dongu"],
    description: "Kata yang mengacu pada kebodohan seseorang",
    context: "Hinaan untuk menyebut orang yang dianggap tidak pintar",
  },
  {
    word: "sinting",
    category: "insult",
    region: "general",
    severity: 0.6,
    aliases: ["sintng", "senteng"],
    description:
      "Kata yang mengacu pada kegilaan atau ketidakwarasan seseorang",
    context: "Hinaan untuk menyebut orang yang dianggap gila atau tidak waras",
  },
  {
    word: "sarap",
    category: "insult",
    region: "general",
    severity: 0.6,
    aliases: ["saraf", "srap"],
    description:
      "Kata yang mengacu pada kegilaan atau ketidakwarasan seseorang",
    context: "Hinaan untuk menyebut orang yang dianggap gila atau tidak waras",
  },
  {
    word: "geblek",
    category: "insult",
    region: "general",
    severity: 0.5,
    aliases: ["gblk", "geblk"],
    description: "Kata yang mengacu pada kebodohan seseorang",
    context: "Hinaan untuk menyebut orang yang dianggap tidak pintar",
  },
  {
    word: "kampungan",
    category: "insult",
    region: "general",
    severity: 0.5,
    aliases: ["kmpngn", "kamphungan"],
    description:
      "Kata yang mengacu pada ketidaksopanan atau kenaifan seseorang",
    context:
      "Hinaan untuk menyebut orang yang dianggap tidak modern atau primitif",
  },
  {
    word: "udik",
    category: "insult",
    region: "general",
    severity: 0.5,
    aliases: ["udhik", "udek"],
    description:
      "Kata yang mengacu pada ketidaksopanan atau kenaifan seseorang",
    context:
      "Hinaan untuk menyebut orang yang dianggap tidak modern atau primitif",
  },
  {
    word: "dongo",
    category: "insult",
    region: "general",
    severity: 0.5,
    aliases: ["donggo", "dungu"],
    description: "Kata yang mengacu pada kebodohan seseorang",
    context: "Hinaan untuk menyebut orang yang dianggap tidak pintar",
  },
  {
    word: "tolol",
    category: "insult",
    region: "general",
    severity: 0.6,
    aliases: ["tol0l", "tollo", "tlol"],
    description: "Kata yang mengacu pada kebodohan seseorang",
    context: "Hinaan untuk menyebut orang yang dianggap tidak pintar",
  },
  {
    word: "brengsek",
    category: "insult",
    region: "general",
    severity: 0.7,
    aliases: ["brengskek", "brengsik", "brengzek"],
    description: "Kata yang mengacu pada kelakuan buruk atau tidak bermoral",
    context:
      "Hinaan untuk menyebut orang yang dianggap memiliki kelakuan buruk",
  },
];

export const insultWords = insult.map((item) => item.word);

export default insult;
