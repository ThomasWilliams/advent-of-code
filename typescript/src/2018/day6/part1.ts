import { run, readInputLines } from "../../util";
import * as path from "path";

type Coord = [number, number];

const distance = ([x1, y1]: Coord, [x2, y2]: Coord): number => Math.abs(x1 - x2) + Math.abs(y1 - y2);

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const coords: Coord[] = (await readInputLines(filePath)).map((line) => {
    const nums = line.match(/[\d]+/g) ?? [];
    return [parseInt(nums[0]), parseInt(nums[1])];
  });

  const bounds = {
    xMin: Number.POSITIVE_INFINITY,
    xMax: 0,
    yMin: Number.POSITIVE_INFINITY,
    yMax: 0,
  };

  for (const [x, y] of coords) {
    bounds.xMin = Math.min(bounds.xMin, x);
    bounds.xMax = Math.max(bounds.xMax, x);
    bounds.yMin = Math.min(bounds.yMin, y);
    bounds.yMax = Math.max(bounds.yMax, y);
  }

  for (let x = bounds.xMin; x <= bounds.xMax; x++) {
    for (let y = bounds.yMin; y <= bounds.yMax; y++) {
      //
    }
  }
});
