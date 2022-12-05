import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines
    .map((line) => {
      const [d1, d2, d3] = [...line.matchAll(/[\d]+/g)].map((m) => parseInt(m[0])).sort((a, b) => a - b);
      return 3 * d1 * d2 + 2 * d1 * d3 + 2 * d2 * d3;
    })
    .reduce((a, b) => a + b);
});
