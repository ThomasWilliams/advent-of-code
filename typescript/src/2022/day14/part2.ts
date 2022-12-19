/* eslint-disable no-constant-condition */
import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

type Coord = [number, number];

enum Direction {
  Up,
  Down,
  Right,
  Left,
  DownLeft,
  DownRight,
}

const getVector = (dir: Direction): Coord => {
  switch (dir) {
    case Direction.Up:
      return [0, -1];
    case Direction.Down:
      return [0, 1];
    case Direction.Left:
      return [-1, 0];
    case Direction.Right:
      return [1, 0];
    case Direction.DownLeft:
      return [-1, 1];
    case Direction.DownRight:
      return [1, 1];
    default:
      return [0, 0];
  }
};

const getDirection = ([x0, y0]: Coord, [x1, y1]: Coord): Direction => {
  if (x0 === x1) return y0 < y1 ? Direction.Down : Direction.Up;
  if (y0 === y1) return x0 < x1 ? Direction.Right : Direction.Left;
  throw new Error("oops, can't get direction");
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const grid: boolean[][] = [];
  let maxY = 0;

  const move = ([x0, y0]: Coord, [x1, y1]: Coord): Coord => [x0 + x1, y0 + y1];

  const markGrid = ([x, y]: Coord) => {
    if (!grid[x]) grid[x] = [];
    grid[x][y] = true;
  };

  const placeBlock = (coord: Coord) => {
    markGrid(coord);
    maxY = Math.max(coord[1], maxY);
  };

  const isMarked = ([x, y]: Coord): boolean => (y >= maxY + 2 ? true : grid[x] ? grid[x][y] : false);

  for (const line of lines) {
    const coords: Coord[] = line.split("->").map(
      (s) =>
        s
          .trim()
          .split(",")
          .map((d) => parseInt(d)) as Coord
    );

    for (let i = 1; i < coords.length; i++) {
      const c0 = coords[i - 1];
      const c1 = coords[i];
      const dir = getDirection(c0, c1);
      const vector = getVector(dir);

      let c = c0;
      placeBlock(c);
      while (c.toString() !== c1.toString()) {
        c = move(c, vector);
        placeBlock(c);
      }
    }
  }

  const dropSand = (): boolean => {
    const getNext = (dir: Direction): Coord => move(sand, getVector(dir));

    let rested = false;
    let sand: Coord = [500, 0];
    while (!rested) {
      if (!isMarked(getNext(Direction.Down))) {
        sand = getNext(Direction.Down);
      } else if (!isMarked(getNext(Direction.DownLeft))) {
        sand = getNext(Direction.DownLeft);
      } else if (!isMarked(getNext(Direction.DownRight))) {
        sand = getNext(Direction.DownRight);
      } else {
        rested = true;
      }
    }
    markGrid(sand);
    return sand[0] === 500 && sand[1] === 0;
  };

  let count = 0;
  while (true) {
    const done = dropSand();
    if (done) {
      return count + 1;
    } else {
      count++;
    }
  }
});
