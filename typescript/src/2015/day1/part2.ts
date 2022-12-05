import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  let floor = 0;
  for (const [i, ch] of [...input].entries()) {
    if (ch === "(") floor++;
    if (ch === ")") floor--;
    if (floor < 0) return i + 1;
  }
  throw new Error("didn't work");
});
