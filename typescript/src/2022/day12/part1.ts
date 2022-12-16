import { readInputLines, run } from "../../util";
import * as path from "path";

type Coord = [number, number];

const findStart = (grid: number[][]): Coord => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
};

const findNeighbors = (grid: number[][], [x0, y0]: Coord): Coord[] => {
  const currentHeight = grid[x0][y0];
  return [
    [x0 - 1, y0],
    [x0 + 1, y0],
    [x0, y0 - 1],
    [x0, y0 + 1],
  ].filter(([x, y]) => {
    if (x < 0 || x >= grid.length) return false;
    if (y < 0 || y >= grid[x].length) return false;
    return grid[x][y] - currentHeight <= 1;
  }) as Coord[];
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const grid: number[][] = (await readInputLines(filePath)).map((line) =>
    line.split("").map((d) => {
      if (d === "S") return 0;
      if (d === "E") return 27;
      return d.charCodeAt(0) - 96;
    })
  );

  const visited = new Set<string>();
  const startingCoord = findStart(grid);

  const queue: [Coord, number][] = [[startingCoord, 0]];
  while (queue.length) {
    const next = queue.shift();
    if (!next) {
      console.log("empty queue, bailing");
      break;
    }

    const [coord, distance] = next;

    if (visited.has(coord.toString())) {
      continue;
    }

    const [x, y] = coord;
    if (grid[x][y] === 27) {
      return distance;
    }

    visited.add(coord.toString());
    findNeighbors(grid, coord)
      .filter((c) => !visited.has(c.toString()))
      .forEach((c) => queue.push([c, distance + 1]));
  }
});
