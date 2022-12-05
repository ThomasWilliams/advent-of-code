import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const instructions = (await readInputLines(filePath)).map((n) => parseInt(n));

  let i = 0;
  let steps = 0;
  while (i < instructions.length) {
    const instruction = instructions[i];
    instructions[i] += instruction >= 3 ? -1 : 1;
    i += instruction;
    steps++;
  }

  return steps;
});
