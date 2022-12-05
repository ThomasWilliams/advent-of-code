import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines
    .map((line) => {
      const { max, min } = line
        .split(/[\s]+/)
        .map((n) => parseInt(n))
        .reduce(({ max, min }, num) => ({ max: Math.max(max, num), min: Math.min(min, num) }), {
          max: 0,
          min: Number.POSITIVE_INFINITY,
        });
      return max - min;
    })
    .reduce((a, b) => a + b);
});
