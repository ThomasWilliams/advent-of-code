import { readInput, run } from "../util";
import * as path from "path";

type Fold = [string, number];

const parseDot = (dot: string): number[] => dot.split(",").map((n) => parseInt(n));

const formatDot = (point: number[]): string => point.join(",");

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const [dotInput, foldInput] = (await readInput(filePath)).split(/[\n]{2,}/);

  const dots = new Set<string>(dotInput.split("\n"));

  const folds: Fold[] = foldInput.split("\n").map((l) => {
    const [, axis, coord] = [...(l.match(/fold along (x|y)=([\d]+)/) || [])];
    return [axis, parseInt(coord)];
  });

  const lastFolds = [10000000, 10000000];

  const doFold = ([axis, coord]: Fold) => {
    const axisIndex = axis === "y" ? 1 : 0;
    lastFolds[axisIndex] = Math.min(lastFolds[axisIndex], coord);
    for (const dot of dots) {
      const point = parseDot(dot);
      if (point[axisIndex] > coord) {
        dots.delete(dot);
        point[axisIndex] = 2 * coord - point[axisIndex];
        dots.add(formatDot(point));
      }
    }
  };

  for (const fold of folds) {
    doFold(fold);
  }

  const grid: string[][] = [];
  for (const _ of [...Array(lastFolds[1]).keys()]) {
    grid.push(Array(lastFolds[0]).fill("."));
  }

  for (const dot of dots) {
    const [x, y] = parseDot(dot);
    grid[y][x] = "#";
  }

  return `\n${grid.map((row) => row.join("")).join("\n")}`;
});

// answer: BLKJRBAG
