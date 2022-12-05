import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const points = (await readInputLines(filePath)).map((line) => line.split("").map((n) => parseInt(n)));

  const lows = [];

  for (const [i, row] of points.entries()) {
    for (const [j, point] of row.entries()) {
      const isLow = [
        points[i - 1]?.[j], //
        points[i + 1]?.[j], //
        points[i]?.[j - 1], //
        points[i]?.[j + 1], //
      ]
        .filter((x) => !isNaN(x))
        .every((x) => x > point);
      if (isLow) {
        lows.push(point);
      }
    }
  }

  return lows.reduce((a, b) => a + b) + lows.length;
});

// answer: 491
