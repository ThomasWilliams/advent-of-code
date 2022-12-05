import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const layers: number[] = [];
  for (const line of lines) {
    const [depth, range] = (line.match(/([\d]+)/g) ?? []).map((n) => parseInt(n));
    layers[depth] = range;
  }

  const getPenalty = (delay: number): number =>
    layers
      .map((range, index) => {
        if (!range) return 0;
        const depth = index + delay;
        if (depth === 0 || range === 1 || depth % ((range - 1) * 2) === 0) return depth * range;
        return 0;
      })
      .reduce((a, b) => a + b);

  let delay = 0;
  let penalty = getPenalty(delay);
  while (penalty > 0) {
    penalty = getPenalty(++delay);
  }

  return delay;
});
