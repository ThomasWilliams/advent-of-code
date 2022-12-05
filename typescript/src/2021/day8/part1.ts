import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = (await readInputLines(filePath)).map((line) => {
    const [signals, outputs] = line.split("|").map((segment) => segment.split(" "));
    return { signals, outputs };
  });

  let count = 0;
  const targetLengths = [2, 3, 4, 7];
  for (const { outputs } of input) {
    for (const value of outputs) {
      if (targetLengths.includes(value.length)) {
        count++;
      }
    }
  }

  return count;
});

// answer: 278
