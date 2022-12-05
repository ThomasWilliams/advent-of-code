import { readInput, run } from "../util";
import * as path from "path";

type Fold = [string, number];

const parseDot = (dot: string): number[] => dot.split(",").map((n) => parseInt(n));

const formatDot = (point: number[]): string => point.join(",");

run(async function main() {
  const filePath = path.resolve(__dirname, "sample");
  const [dotInput, foldInput] = (await readInput(filePath)).split(/[\n]{2,}/);

  const dots = new Set<string>(dotInput.split("\n"));

  const folds: Fold[] = foldInput.split("\n").map((l) => {
    const [, axis, coord] = [...(l.match(/fold along (x|y)=([\d]+)/) || [])];
    return [axis, parseInt(coord)];
  });

  const doFold = ([axis, coord]: Fold) => {
    const axisIndex = axis === "y" ? 1 : 0;
    for (const dot of dots) {
      const point = parseDot(dot);
      if (point[axisIndex] > coord) {
        dots.delete(dot);
        point[axisIndex] = 2 * coord - point[axisIndex];
        dots.add(formatDot(point));
      }
    }
  };

  doFold(folds.shift() ?? ["x", 1000000]);

  return dots.size;
});

// answer: 755
