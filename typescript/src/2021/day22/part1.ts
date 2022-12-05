import { readInputLines, run } from "../util";
import * as path from "path";

type Cuboid = {
  on: boolean;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
};

const parseCuboid = (input: string): Cuboid => {
  const matches = input.match(/(on|off) x=(-?[\d]+)..(-?[\d]+),y=(-?[\d]+)..(-?[\d]+),z=(-?[\d]+)..(-?[\d]+)/);
  if (matches === null) throw new Error("input parsing error");

  const on = matches[1] === "on";
  const [xBound1, xBound2, yBound1, yBound2, zBound1, zBound2] = matches.slice(2).map((n) => parseInt(n));
  return {
    on,
    xMin: Math.min(xBound1, xBound2),
    xMax: Math.max(xBound1, xBound2),
    yMin: Math.min(yBound1, yBound2),
    yMax: Math.max(yBound1, yBound2),
    zMin: Math.min(zBound1, zBound2),
    zMax: Math.max(zBound1, zBound2),
  };
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const cuboids: Cuboid[] = (await readInputLines(filePath)).slice(0, 20).map((l) => parseCuboid(l));

  const cubes = new Set<string>();

  for (const { on, xMin, xMax, yMin, yMax, zMin, zMax } of cuboids) {
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        for (let z = zMin; z <= zMax; z++) {
          const point = `${x},${y},${z}`;
          if (on) {
            cubes.add(point);
          } else {
            cubes.delete(point);
          }
        }
      }
    }
  }

  return cubes.size;
});

// answer: 543306
