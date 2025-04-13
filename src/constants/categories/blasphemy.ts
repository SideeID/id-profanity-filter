import { ProfanityWord } from "../../types";
import { general } from "../regions/general";
import { jawa } from "../regions/jawa";
import { sunda } from "../regions/sunda";
import { betawi } from "../regions/betawi";
import {minang} from "../regions/minang";

export const blasphemy: ProfanityWord[] = [
  ...general.filter((word) => word.category === "blasphemy"),
  ...jawa.filter((word) => word.category === "blasphemy"),
  ...sunda.filter((word) => word.category === "blasphemy"),
  ...betawi.filter((word) => word.category === "blasphemy"),
  ...minang.filter((word)=>word.category==="blasphemy"),

  {
    word: "kafir",
    category: "blasphemy",
    region: "general",
    severity: 0.6,
    aliases: ["kapir", "kafur"],
    description: "Istilah untuk orang yang tidak percaya pada Islam",
    context: "Dapat bersifat merendahkan ketika digunakan terhadap non-Muslim",
  },
];

export const blasphemyWords = blasphemy.map((item) => item.word);
export default blasphemy;
