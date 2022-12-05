import { readInputLines, run } from "../util";
import * as path from "path";

type QueueElement = { coord: string; distance: number };

class PriorityQueue {
  private queue: QueueElement[] = [];

  enqueue(el: QueueElement) {
    for (const [i, { distance }] of this.queue.entries()) {
      if (el.distance < distance) {
        this.queue.splice(i, 0, el);
        return;
      }
    }
    this.queue.push(el);
  }

  dequeue(): QueueElement {
    return this.queue.shift() || { coord: "", distance: 0 };
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}

const parseCoord = (coord: string): number[] => coord.split(",").map((n) => parseInt(n));

const formatCoord = (row: number, col: number): string => `${row},${col}`;

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const cavern = (await readInputLines(filePath)).map((l) => l.split("").map((n) => parseInt(n)));
  const [xMax, yMax] = [cavern.length, cavern[0].length];

  const getAdjacentCoords = (coord: string | number[]): string[] => {
    const [x, y] = typeof coord === "string" ? parseCoord(coord) : coord;
    const adjCoords: string[] = [];
    if (x - 1 >= 0) adjCoords.push(formatCoord(x - 1, y));
    if (x + 1 < xMax) adjCoords.push(formatCoord(x + 1, y));
    if (y - 1 >= 0) adjCoords.push(formatCoord(x, y - 1));
    if (y + 1 < yMax) adjCoords.push(formatCoord(x, y + 1));
    return adjCoords;
  };

  const pq = new PriorityQueue();
  const distances: { [k: string]: number } = {};

  for (const [i, row] of cavern.entries()) {
    for (const j of row.keys()) {
      distances[formatCoord(i, j)] = Number.POSITIVE_INFINITY;
    }
  }

  const start = formatCoord(0, 0);
  distances[start] = 0;

  pq.enqueue({ coord: start, distance: 0 });

  while (!pq.isEmpty()) {
    const { coord, distance } = pq.dequeue();
    for (const adjCoord of getAdjacentCoords(coord)) {
      const [x, y] = parseCoord(adjCoord);
      const nextDistance = cavern[x][y] + distance;
      if (nextDistance < distances[adjCoord]) {
        distances[adjCoord] = nextDistance;
        pq.enqueue({ coord: adjCoord, distance: nextDistance });
      }
    }
  }

  return distances[formatCoord(xMax - 1, yMax - 1)];
});

// answer: 456
