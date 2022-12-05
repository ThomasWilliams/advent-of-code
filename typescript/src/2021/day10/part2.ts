import { readInputLines, run } from "../util";
import * as path from "path";

const getScoreForLine = (line: string): number => {
  const charStack = [];

  const openers = "([{<";
  const closers = ")]}>";

  for (const char of line) {
    if (openers.includes(char)) {
      charStack.unshift(char);
    }
    if (closers.includes(char)) {
      const popped = charStack.shift() ?? "";
      if (openers.indexOf(popped) !== closers.indexOf(char)) {
        return 0;
      }
    }
  }

  let score = 0;
  while (charStack.length) {
    const char = charStack.shift() || "";
    const valueToAdd = openers.indexOf(char) + 1;
    score *= 5;
    score += valueToAdd;
  }

  return score;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  const scores: number[] = [];

  for (const line of input) {
    const score = getScoreForLine(line);
    if (score <= 0) continue;

    const spliceIndex = scores.findIndex((s) => s > score);
    scores.splice(spliceIndex, 0, score);
  }

  return scores[Math.floor(scores.length / 2)];
});

// answer: 2389738699
