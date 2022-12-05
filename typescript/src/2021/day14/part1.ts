import { readInput, run } from "../util";
import * as path from "path";

const getFrequencies = (arr: string[]): { [k: string]: number } => {
  return arr.reduce<Record<string, number>>((frequencies, s) => {
    if (!frequencies[s]) {
      frequencies[s] = 0;
    }
    frequencies[s]++;
    return frequencies;
  }, {});
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const [template, ruleLines] = (await readInput(filePath)).split(/[\n]{2,}/);

  const rules = ruleLines.split("\n").reduce<Record<string, string>>((dict, line) => {
    const [, pair, insert] = [...(line.match(/([A-Z]{2}) -> ([A-Z])/) || [])];
    dict[pair] = insert;
    return dict;
  }, {});

  let chars = template.split("");
  let copies: string[] = [];
  const doInserts = () => {
    for (let i = 1; i < chars.length; i++) {
      const pair = chars.slice(i - 1, i + 1).join("");
      const insert = rules[pair];
      copies.push(chars[i - 1]);
      if (insert) copies.push(insert);
    }
    copies.push(chars.at(-1) || "");
    chars = copies;
    copies = [];
  };

  const steps = 10;
  for (const _ of [...Array(steps).keys()]) {
    doInserts();
  }

  const frequencies = getFrequencies(chars);
  const min = Object.entries(frequencies).reduce((acc, entry) => (entry[1] < acc[1] ? entry : acc))[1];
  const max = Object.entries(frequencies).reduce((acc, entry) => (entry[1] > acc[1] ? entry : acc))[1];
  return max - min;
});

// answer: 3009
