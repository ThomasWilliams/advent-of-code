import { readInput, run } from "../../util";
import * as path from "path";

const samples = [
  "{}", // 1
  "{{{}}}", // 6
  "{{},{}}", // 5
  "{{{},{},{{}}}}", // 16
  "{<a>,<a>,<a>,<a>}", // 1
  "{{<ab>},{<ab>},{<ab>},{<ab>}}", // 9
  "{{<!!>},{<!!>},{<!!>},{<!!>}}", // 9
  "{{<a!>},{<a!>},{<a!>},{<ab>}}", // 3
];

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  // const input = samples[7];

  let totalScore = 0;
  let depth = 0;
  let ignoreNext = false;
  let inGarbage = false;
  for (const char of input.split("")) {
    if (ignoreNext) {
      ignoreNext = false;
      continue;
    }

    if (inGarbage) {
      if (char === ">") {
        inGarbage = false;
      }
      continue;
    }

    if (char === "{") {
      depth++;
    } else if (char === "}") {
      totalScore += depth;
      depth--;
    } else if (char === "<") {
      inGarbage = true;
    } else if (char === "!") {
      ignoreNext = true;
    }
  }

  return totalScore;
});
