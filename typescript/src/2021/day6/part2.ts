import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const fishes = input.split(",").map((n) => parseInt(n));
  const ages: number[] = Array(9).fill(0);
  for (const fish of fishes) {
    ages[fish]++;
  }

  const steps = 256;
  for (const _ of [...Array(steps).keys()]) {
    const newFish = ages.shift() ?? 0;
    ages[6] += newFish;
    ages.push(newFish);
  }

  return ages.reduce((a, b) => a + b);
});

// answer:
