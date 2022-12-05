import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  let input = await readInput(filePath);

  let sum = 0;
  while (/[\d]/.test(input)) {
    const m = input.match(/-?[\d]+/);
    if (!m) continue;
    sum += +m[0];
    input = input.slice((m.index ?? 0) + m[0].length);
  }
  return sum;
});
