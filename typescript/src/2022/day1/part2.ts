import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  return input
    .split(/\n\n/)
    .map((s) =>
      s
        .split(/\n/)
        .map((n) => parseInt(n.trim()))
        .reduce((a, b) => a + b)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
});
