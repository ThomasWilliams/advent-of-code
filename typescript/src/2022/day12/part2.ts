import { readInputLines, run } from "../../util";
import * as path from "path";

type Coord = [number, number];

const findStartingPoints = (grid: number[][]): Coord[] => {
  const startingPoints: Coord[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 1) {
        startingPoints.push([row, col]);
      }
    }
  }
  return startingPoints;
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

const findShortestPath = (grid: number[][], startingCoord: Coord): number => {
  const visited = new Set<string>();

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

  // throw new Error(`no path found for starting coord: ${startingCoord}`);
  return Infinity;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const grid: number[][] = (await readInputLines(filePath)).map((line) =>
    line.split("").map((d) => {
      if (d === "S") return 1;
      if (d === "E") return 27;
      return d.charCodeAt(0) - 96;
    })
  );

  let minPath = Infinity;
  for (const startingCoord of findStartingPoints(grid)) {
    minPath = Math.min(minPath, findShortestPath(grid, startingCoord));
  }

  return minPath;
});
