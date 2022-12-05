import { readInput, run } from "../util";
import * as path from "path";

const tri = (n: number): number => (n * (n + 1)) / 2;

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const [, xBound1, xBound2, yBound1, yBound2] = [
    ...(input.match(/x=(-?[\d]+)\.\.(-?[\d]+), y=(-?[\d]+)\.\.(-?[\d]+)/) || []),
  ];

  const [xMin, xMax, yMin, yMax] = [
    Math.min(parseInt(xBound1), parseInt(xBound2)),
    Math.max(parseInt(xBound1), parseInt(xBound2)),
    Math.min(parseInt(yBound1), parseInt(yBound2)),
    Math.max(parseInt(yBound1), parseInt(yBound2)),
  ];

  return tri(Math.abs(yMin) - 1);
});

// answer: 23005
