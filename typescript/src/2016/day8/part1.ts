import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");

  const width = 50;
  const height = 6;
  const lines = await readInputLines(filePath);

  const grid: boolean[][] = [...new Array(height).keys()].map(() => new Array(width).fill(false));

  const rect = (width: number, height: number) => {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        grid[row][col] = true;
      }
    }
  };

  const rotateRow = (y: number, by: number) => {
    for (let i = 0; i < by; i++) {
      grid[y].unshift(grid[y].pop() ?? false);
    }
  };

  const rotateCol = (x: number, by: number) => {
    const col = grid.map((row) => row[x]);
    for (let i = 0; i < by; i++) {
      col.unshift(col.pop() ?? false);
    }
    for (const [y, row] of grid.entries()) {
      row[x] = col[y];
    }
  };

  for (const [i, line] of lines.entries()) {
    if (/rect/.test(line)) {
      const [, width, height] = line.match(/([\d]+)x([\d]+)/) ?? [];
      rect(parseInt(width), parseInt(height));
    }

    if (/row/.test(line)) {
      const [, y, by] = line.match(/([\d]+) by ([\d]+)/) ?? [];
      rotateRow(parseInt(y), parseInt(by));
    }

    if (/column/.test(line)) {
      const [, x, by] = line.match(/([\d]+) by ([\d]+)/) ?? [];
      rotateCol(parseInt(x), parseInt(by));
    }
  }

  return grid.map((row) => row.filter(Boolean).length).reduce((a, b) => a + b);
});
