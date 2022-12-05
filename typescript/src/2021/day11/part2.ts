import { readInputLines, run } from "../util";
import * as path from "path";
import { Grid } from "./grid";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const cells = (await readInputLines(filePath)).map((line) => line.split("").map((n) => parseInt(n)));
  const grid = new Grid(cells);

  let step = 1;
  // eslint-disable-next-line
  while (true) {
    grid.step();
    if (grid.allFlashes()) {
      return step;
    }
    step++;
  }
});

// answer: 422
