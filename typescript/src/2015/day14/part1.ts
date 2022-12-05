import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const reindeers: number[][] = lines.map((line: string): number[] =>
    (line.match(/([\d]+)[^\d]+([\d]+)[^\d]+([\d]+)/) ?? []).slice(1, 4).map((n) => parseInt(n))
  );

  const DURATION = 2503;

  return reindeers
    .map(
      ([speed, flyInterval, restInterval]): number =>
        Math.floor(DURATION / (flyInterval + restInterval)) * flyInterval * speed +
        Math.min(flyInterval, DURATION % (flyInterval + restInterval)) * speed
    )
    .reduce((a, b) => Math.max(a, b));
});
