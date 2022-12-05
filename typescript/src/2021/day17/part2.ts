import { readInput, run, tri } from "../util";
import * as path from "path";

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

  const checkSpeed = (vx: number, vy: number): boolean => {
    // console.log(`checking speed: ${vx}, ${vy}`);

    let [dx, dy] = [0, 0];
    // eslint-disable-next-line
    while (true) {
      if (dx > xMax || dy < yMin) {
        return false;
      }
      if (dx >= xMin && dy <= yMax) {
        return true;
      }
      dx += vx;
      dy += vy;
      vx = Math.max(0, vx - 1);
      vy -= 1;
    }
  };

  let vxMin = 1;
  while (tri(vxMin) < xMin) vxMin++;

  const [xLower, xUpper] = [vxMin, xMax];
  const [yLower, yUpper] = [yMin, tri(Math.abs(yMin) - 1)];

  const speeds: string[] = [];

  for (let x = xLower; x <= xUpper; x++) {
    for (let y = yLower; y <= yUpper; y++) {
      if (checkSpeed(x, y)) {
        speeds.push(`${x},${y}`);
      }
    }
  }

  return speeds.length;
});

// answer: 2040
