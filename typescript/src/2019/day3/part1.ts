/* eslint-disable no-constant-condition */
import { run, readInputLines } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const [wireAPath, wireBPath] = (await readInputLines(filePath)).map((wire) => wire.split(","));

  const wireAPoints: string[] = [];

  const a = [0, 0];
  // console.log("walking wire A");
  for (const instruction of wireAPath) {
    // console.log(`instruction: ${instruction}`);
    const direction = instruction.charAt(0);
    const vector =
      direction === "U"
        ? [1, 0]
        : direction === "R"
        ? [0, 1]
        : direction === "D"
        ? [-1, 0]
        : direction === "L"
        ? [0, -1]
        : [0, 0];

    for (let i = 0; i < parseInt(instruction.substring(1)); i++) {
      a[0] += vector[0];
      a[1] += vector[1];
      wireAPoints.push(JSON.stringify(a));
    }
  }

  const intersections: string[] = [];

  const b = [0, 0];
  // console.log("walking wire B");
  for (const instruction of wireBPath) {
    // console.log(`instruction: ${instruction}`);
    const direction = instruction.charAt(0);
    const vector =
      direction === "U"
        ? [1, 0]
        : direction === "R"
        ? [0, 1]
        : direction === "D"
        ? [-1, 0]
        : direction === "L"
        ? [0, -1]
        : [0, 0];

    for (let i = 0; i < parseInt(instruction.substring(1)); i++) {
      b[0] += vector[0];
      b[1] += vector[1];
      const point = JSON.stringify(b);
      if (wireAPoints.includes(point)) {
        intersections.push(point);
      }
    }
  }

  return intersections
    .map((point) => {
      const coords = JSON.parse(point);
      return Math.abs(coords[0]) + Math.abs(coords[1]);
    })
    .reduce((a, b) => Math.min(a, b));
});
