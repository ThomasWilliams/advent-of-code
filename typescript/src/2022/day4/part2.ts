import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const isBetween = (n: number, x1: number, x2: number): boolean => x1 <= n && n <= x2;

  return lines
    .map((line) => {
      const [a1, a2, b1, b2] = [...(line.match(/([\d]+)-([\d]+),([\d]+)-([\d]+)/) || [])]
        .slice(1)
        .map((n) => parseInt(n));
      return isBetween(b1, a1, a2) || isBetween(b2, a1, a2) || (b1 <= a1 && b2 >= a2);
    })
    .filter(Boolean).length;
});
