import { readInputLines, run } from "../../util";
import * as path from "path";

type Coord = [number, number];

class Rope {
  knots: Coord[];
  tailTrail: Coord[];

  constructor() {
    this.knots = Array(10)
      .fill(0)
      .map((_) => [0, 0]);
    this.tailTrail = [[0, 0]];
  }

  move(dir: string) {
    this.moveHead(dir);
    for (let i = 1; i < this.knots.length; i++) {
      this.moveKnot(i);
    }

    this.tailTrail.push((this.knots.at(-1)?.slice() ?? [0, 0]) as Coord);
  }

  private moveHead(dir: string) {
    const [dx, dy] = this.dirToVector(dir);
    this.knots[0][0] += dx;
    this.knots[0][1] += dy;
  }

  private moveKnot(knotIndex: number) {
    if (!this.knotNeedsToMove(knotIndex)) return;

    const [prevX, prevY] = this.knots[knotIndex - 1];
    const [currX, currY] = this.knots[knotIndex];
    const diff = [prevX - currX, prevY - currY];

    switch (JSON.stringify(diff)) {
      case "[-2,-1]":
      case "[-2,0]":
      case "[-2,1]":
        this.knots[knotIndex] = [currX - 1, prevY];
        break;
      case "[2,-1]":
      case "[2,0]":
      case "[2,1]":
        this.knots[knotIndex] = [currX + 1, prevY];
        break;
      case "[-1,-2]":
      case "[0,-2]":
      case "[1,-2]":
        this.knots[knotIndex] = [prevX, currY - 1];
        break;
      case "[-1,2]":
      case "[0,2]":
      case "[1,2]":
        this.knots[knotIndex] = [prevX, currY + 1];
        break;
      case "[-2,-2]":
        this.knots[knotIndex] = [currX - 1, currY - 1];
        break;
      case "[2,-2]":
        this.knots[knotIndex] = [currX + 1, currY - 1];
        break;
      case "[-2,2]":
        this.knots[knotIndex] = [currX - 1, currY + 1];
        break;
      case "[2,2]":
        this.knots[knotIndex] = [currX + 1, currY + 1];
        break;
      default:
    }
  }

  private dirToVector(dir: string): Coord {
    const vectorMap: Record<string, Coord> = {
      R: [1, 0],
      L: [-1, 0],
      U: [0, 1],
      D: [0, -1],
    };
    return vectorMap[dir];
  }

  private knotNeedsToMove(knotIndex: number): boolean {
    const [prevX, prevY] = this.knots[knotIndex - 1];
    const [currX, currY] = this.knots[knotIndex];
    return Math.abs(prevX - currX) > 1 || Math.abs(prevY - currY) > 1;
  }
}

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  const rope = new Rope();

  for (const line of input) {
    const [dir, len] = line.split(" ");
    for (let i = 0; i < parseInt(len); i++) {
      rope.move(dir);
    }
  }

  const s = new Set<string>(rope.tailTrail.map((c) => String(c)));
  return s.size;
});
