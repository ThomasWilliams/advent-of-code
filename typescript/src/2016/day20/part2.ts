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

  let pointer = 0;
  let ipCount = 0;

  for (const [min, max] of ranges) {
    if (pointer > max) {
      // do nothing
      // continue;
    } else if (pointer >= min) {
      pointer = max + 1;
    } else {
      ipCount += min - pointer;
      pointer = max + 1;
    }
  }

  return ipCount;
});
