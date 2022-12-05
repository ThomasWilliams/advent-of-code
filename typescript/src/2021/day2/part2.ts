import { readInputLines, run } from "../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const instructions = await readInputLines(filePath);

  type Coord = [number, number, number];
  const coord: Coord = [0, 0, 0];
  for (const instruction of instructions) {
    const [direction, dist] = instruction.split(" ");
    const distance = parseInt(dist);
    switch (direction) {
      case "up":
        coord[2] -= distance;
        break;
      case "down":
        coord[2] += distance;
        break;
      case "forward":
        coord[0] += distance;
        coord[1] += distance * coord[2];
        break;
      default:
        throw new Error("oops");
    }
  }

  return coord[0] * coord[1];
});

// answer: 1765720035
