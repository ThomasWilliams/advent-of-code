import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let dirIndex = 0;

  const pos = [0, 0];

  const turn = (dir: string) => {
    dirIndex += dir === "R" ? 5 : 3;
    dirIndex %= 4;
  };

  for (const step of input.split(", ")) {
    const [, dir, d] = step.match(/(L|R)([\d]+)/) ?? [];
    const distance = parseInt(d);
    turn(dir);

    pos[0] += dirs[dirIndex][0] * distance;
    pos[1] += dirs[dirIndex][1] * distance;
  }

  return Math.abs(pos[0]) + Math.abs(pos[1]);
});
