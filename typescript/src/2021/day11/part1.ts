import { readInputLines, run } from "../util";
import * as path from "path";
import { Grid } from "./grid";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const cells = (await readInputLines(filePath)).map((line) => line.split("").map((n) => parseInt(n)));
  const grid = new Grid(cells);

  const steps = 100;
  let flashes = 0;
  for (const step of [...Array(steps).keys()]) {
    flashes += grid.step();
  }

  return flashes;
});

// answer: 1757
