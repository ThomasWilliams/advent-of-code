import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const indices: number[] = [];
  for (let i = 0; i < input.length; i++) {
    const ch = input.charAt(i);
    const nextFound = input.slice(i + 1).indexOf(ch) + i;

    indices.push(nextFound);

    if (i >= 13 && indices.slice(-14).every((j) => j < 0 || j >= i)) {
      return i + 1;
    }
  }
});
