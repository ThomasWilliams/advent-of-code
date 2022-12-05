import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  const grid: number[][] = [];
  for (let i = 0; i < 1000; i++) {
    const row = new Array(1000).fill(0);
    grid.push(row);
  }

  for (const line of input) {
    const [x1, y1, x2, y2] = [...(line.match(/([\d]+),([\d]+) -> ([\d]+),([\d]+)/) || [])]
      .slice(1)
      .map((n) => parseInt(n));
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        grid[x1][y] = grid[x1][y] + 1;
      }
      continue;
    }

    if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        grid[x][y1]++;
      }
      continue;
    }

    const xDir = x1 < x2 ? 1 : -1;
    const yDir = y1 < y2 ? 1 : -1;
    for (let t = 0; t < Math.abs(x2 - x1) + 1; t++) {
      const x = x1 + t * xDir;
      const y = y1 + t * yDir;
      grid[x][y]++;
    }
  }

  let intersections = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (grid[i][j] > 1) {
        intersections++;
      }
    }
  }

  return intersections;
});

// answer: 17741
