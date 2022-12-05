import { readInputLines, run } from "../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const grid = (await readInputLines(filePath)).map((l) => l.split(""));

  const doStep = (): boolean => {
    // let moved = false;

    // return moved;
    return false;
  };

  let steps = 1;
  while (doStep()) steps++;

  return steps;
});
