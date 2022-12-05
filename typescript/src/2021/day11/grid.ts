export class Grid {
  constructor(private cells: number[][]) {}

  step(): number {
    type Coord = [number, number];
    const queue: Coord[] = [];
    let flashes = 0;

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (++this.cells[i][j] > 9) {
          // console.log(`queueing: [${i}, ${j}]`);
          queue.push([i, j]);
        }
      }
    }

    const diffs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    while (queue.length) {
      const [x, y] = queue.shift() ?? [];
      // console.log(`popping: [${x}, ${y}]`);
      if (x === undefined || y === undefined) continue;
      flashes++;

      // console.log("flashing");

      for (const [xDiff, yDiff] of diffs) {
        const [i, j] = [x + xDiff, y + yDiff];
        if (this.cells[i]?.[j] && this.cells[i][j] < 10 && ++this.cells[i][j] > 9) {
          queue.push([i, j]);
        }
      }
    }

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (this.cells[i][j] > 9) {
          this.cells[i][j] = 0;
        }
      }
    }

    return flashes;
  }

  allFlashes(): boolean {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell !== 0) return false;
      }
    }
    return true;
  }

  toString(step?: number): string {
    return [
      step ? new Array(10).fill("-").join("") : null,
      step ? `step ${step}:` : null,
      new Array(10).fill("-").join(""),
      ...this.cells.map((line) => line.join("")),
      new Array(10).fill("-").join(""),
    ]
      .filter((line) => line !== null)
      .join("\n");
  }
}
