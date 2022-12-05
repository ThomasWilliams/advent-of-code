import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const fabric: number[][] = [...Array(1000).keys()].map((_) => new Array(1000).fill(0));

  for (const line of lines) {
    const [, x0, y0, width, height] = (line.match(/[\d]+/g) ?? []).map((n) => parseInt(n));
    for (let x = x0; x < x0 + width; x++) {
      for (let y = y0; y < y0 + height; y++) {
        fabric[x][y]++;
      }
    }
  }

  return fabric.map((row) => row.filter((n) => n >= 2).length).reduce((a, b) => a + b);
});
