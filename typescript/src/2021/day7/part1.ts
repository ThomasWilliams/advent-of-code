import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const crabs = input.split(",").map((n) => parseInt(n));

  const calculateDistance = (point: number) => crabs.reduce((distance, crab) => distance + Math.abs(crab - point), 0);

  let min = Number.POSITIVE_INFINITY;
  for (const crab of crabs) {
    min = Math.min(min, calculateDistance(crab));
  }

  return min;
});

// answer: 351901
