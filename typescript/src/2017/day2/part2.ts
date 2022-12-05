import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines
    .map((line) => {
      const digits = line.split(/[\s]+/).map((n) => parseInt(n));
      while (digits.length) {
        const d1 = digits.shift() ?? 1;
        for (const d2 of digits) {
          if ((d1 / d2) % 1 === 0) return d1 / d2;
          if ((d2 / d1) % 1 === 0) return d2 / d1;
        }
      }
      return 0;
    })
    .reduce((a, b) => a + b);
});
