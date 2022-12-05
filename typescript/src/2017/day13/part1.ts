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

  return layers
    .map((range, depth) => {
      if (!range) return 0;
      if (depth === 0 || range === 1 || depth % ((range - 1) * 2) === 0) return depth * range;
      return 0;
    })
    .reduce((a, b) => a + b);
});
