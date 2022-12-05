import { readInputLines, run } from "../util";
import * as path from "path";

const getScoreForLine = (line: string): number => {
  const charStack = [];

  const openers = "([{<";
  const closers = ")]}>";
  const scores = [3, 57, 1197, 25137];

  for (const char of line) {
    if (openers.includes(char)) {
      charStack.unshift(char);
    }
    if (closers.includes(char)) {
      const popped = charStack.shift() ?? "";
      if (openers.indexOf(popped) !== closers.indexOf(char)) {
        return scores[closers.indexOf(char)];
      }
    }
  }

  return 0;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  return input.map(getScoreForLine).reduce((a, b) => a + b);
});

// answer: 318099
