import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  let floor = 0;
  for (const ch of input) {
    if (ch === "(") floor++;
    if (ch === ")") floor--;
  }
  return floor;
});
