export type Cell = number | "X";

export class Board {
  constructor(private cells: Cell[][]) {}

  hasWon(): boolean {
    // check rows
    rows: for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.cells[i][j] !== "X") {
          continue rows;
        }
      }
      return true;
    }

    // check cols
    cols: for (let j = 0; j < 5; j++) {
      for (let i = 0; i < 5; i++) {
        if (this.cells[i][j] !== "X") {
          continue cols;
        }
      }
      return true;
    }

    return false;
  }

  markNumber(num: number): boolean {
    let marked = false;
    rows: for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.cells[i][j] === num) {
          this.cells[i][j] = "X";
          marked = true;
          break rows;
        }
      }
    }
    return this.hasWon();
  }

  getLeftoverSum(): number {
    let sum = 0;
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell !== "X") {
          sum += cell;
        }
      }
    }
    return sum;
  }
}
