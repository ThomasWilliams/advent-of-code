import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const ranges: [number, number][] = [];

  lines.forEach((line) => {
    const [rangeMin, rangeMax] = line.split("-").map((n) => parseInt(n));
    const range: [number, number] = [rangeMin, rangeMax];

    for (let i = 0; i < ranges.length; i++) {
      const [min, max] = ranges[i];
      if (rangeMin < min || (rangeMin === min && rangeMax < max)) {
        ranges.splice(i, 0, range);
        return;
      }
    }

    ranges.push(range);
  });

  let minIP = 0;

  for (const [min, max] of ranges) {
    if (minIP > max) {
      // continue;
    } else if (minIP >= min) {
      minIP = max + 1;
    } else {
      return minIP;
    }
  }
});
