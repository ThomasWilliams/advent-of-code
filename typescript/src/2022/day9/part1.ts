import { readInputLines, run } from "../../util";
import * as path from "path";

type Coord = [number, number];

class Rope {
  head: Coord[];
  tail: Coord[];

  constructor() {
    this.head = [[0, 0]];
    this.tail = [[0, 0]];
  }

  move(dir: string) {
    this.moveHead(dir);
    this.moveTail();
  }

  private moveHead(dir: string) {
    const [dx, dy] = this.dirToVector(dir);
    const [x, y] = this.currHead;
    this.head.unshift([x + dx, y + dy]);
  }

  private moveTail() {
    if (!this.tailNeedsToMove()) return;

    const nextTail: Coord = [this.currHead[0], this.currHead[1]];
    if (this.currTail[0] - nextTail[0] === 2) {
      nextTail[0]++;
    } else if (this.currTail[0] - nextTail[0] === -2) {
      nextTail[0]--;
    } else if (this.currTail[1] - nextTail[1] === 2) {
      nextTail[1]++;
    } else if (this.currTail[1] - nextTail[1] === -2) {
      nextTail[1]--;
    }

    this.tail.unshift(nextTail);
  }

  private get currHead(): Coord {
    return this.head[0];
  }

  private get currTail(): Coord {
    return this.tail[0];
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

  private tailNeedsToMove(): boolean {
    const [headX, headY] = this.currHead;
    const [tailX, tailY] = this.currTail;
    return Math.abs(headX - tailX) > 1 || Math.abs(headY - tailY) > 1;
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

  console.log(rope.tail);

  const s = new Set<string>(rope.tail.map((c) => String(c)));
  return s.size;
});
