import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const [template, ruleLines] = (await readInput(filePath)).split(/[\n]{2,}/);

  const rules = ruleLines.split("\n").reduce<Record<string, string>>((dict, line) => {
    const [, pair, insert] = [...(line.match(/([A-Z]{2}) -> ([A-Z])/) || [])];
    dict[pair] = insert;
    return dict;
  }, {});

  const singles: { [k: string]: number } = {};
  let pairs: { [k: string]: number } = {};

  const addToDict = (dict: { [k: string]: number }, s: string, n = 1) => {
    if (!dict[s]) dict[s] = 0;
    dict[s] += n;
  };

  const chars = template.split("");
  for (const i of chars.keys()) {
    addToDict(singles, chars[i]);
    if (i === 0) continue;
    addToDict(pairs, chars.slice(i - 1, i + 1).join(""));
  }

  const steps = 40;
  for (const _ of [...Array(steps).keys()]) {
    const nextPairs = {};
    for (const [pair, n] of Object.entries(pairs)) {
      const newChar = rules[pair];
      addToDict(singles, newChar, n);
      addToDict(nextPairs, `${pair[0]}${newChar}`, n);
      addToDict(nextPairs, `${newChar}${pair[1]}`, n);
    }
    pairs = nextPairs;
  }

  const min = Object.entries(singles).reduce((acc, entry) => (entry[1] < acc[1] ? entry : acc))[1];
  const max = Object.entries(singles).reduce((acc, entry) => (entry[1] > acc[1] ? entry : acc))[1];
  return max - min;
});

// answer: 3459822539451
