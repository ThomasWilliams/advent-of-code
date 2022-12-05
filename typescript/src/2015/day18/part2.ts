import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const grid = (await readInputLines(filePath)).map((line) => line.split(""));

  grid[0][0] = "#";
  grid[0][grid[0].length - 1] = "#";
  grid[grid.length - 1][0] = "#";
  grid[grid.length - 1][grid[grid.length - 1].length - 1] = "#";

  const nextGrid: string[][] = new Array(grid.length).fill([]).map((_) => new Array(grid[0].length).fill(""));

  const getLitNeighbors = ([x, y]: [number, number]): number => {
    let lit = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (!(i === x && j === y) && grid[i]?.[j] === "#") {
          lit++;
        }
      }
    }
    return lit;
  };

  const isCorner = ([x, y]: [number, number]): boolean =>
    [0, grid.length - 1].includes(x) && [0, grid[x].length - 1].includes(y);

  const steps = 100;
  for (let step = 0; step < steps; step++) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const litNeighbors = getLitNeighbors([i, j]);
        nextGrid[i][j] =
          isCorner([i, j]) || litNeighbors === 3 || (grid[i][j] === "#" && litNeighbors === 2) ? "#" : ".";
      }
    }
    for (let i = 0; i < grid.length; i++) {
      grid[i] = nextGrid[i].slice();
    }
  }

  return grid.map((row) => row.filter((cell) => cell === "#").length).reduce((a, b) => a + b);
});
