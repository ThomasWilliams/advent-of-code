import { readInput, run } from "../util";
import * as path from "path";

class Image {
  constructor(private algo: string, private grid: string[][]) {}

  convertCellToBit = (s: string): number => (s === "." ? 0 : 1);

  convertCellsToBits = (a: string[]): number[] => a.map((s) => this.convertCellToBit(s));

  private expand(fillChar = ".") {
    this.grid.forEach((l) => {
      l.push(fillChar);
      l.unshift(fillChar);
    });
    const blankRow = Array(this.grid[0].length).fill(fillChar);
    this.grid.push(blankRow.slice());
    this.grid.unshift(blankRow.slice());
  }

  private getAlgoIndexForCell(x: number, y: number, fillChar: string): number {
    const cells = [];
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        cells.push(this.grid[i]?.[j] ?? fillChar);
      }
    }
    return parseInt(this.convertCellsToBits(cells).join(""), 2);
  }

  enhance(step: number) {
    const fillChar = step % 2 ? "#" : ".";
    this.expand(fillChar);
    const nextGrid: string[][] = [];
    for (const i of [...Array(this.grid.length).keys()]) {
      nextGrid[i] = [];
      for (const j of [...Array(this.grid[i].length).keys()]) {
        const algoIndex = this.getAlgoIndexForCell(i, j, fillChar);
        nextGrid[i][j] = this.algo[algoIndex];
      }
    }
    this.grid = nextGrid;
  }

  printGrid() {
    const border = Array(this.grid[0].length + 7)
      .fill("-")
      .join("");
    console.log(border);
    for (const [i, row] of this.grid.entries()) {
      console.log(`${`${i}`.padEnd(3)} -- ${row.join("")}`);
    }
    console.log(border);
  }

  countLightCells(): number {
    return this.grid.map((l) => l.filter((s) => s === "#").length).reduce((a, b) => a + b);
  }
}

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const [algo, imageInput] = (await readInput(filePath)).split(/[\n]{2,}/);
  const image = new Image(
    algo,
    imageInput.split("\n").map((l) => l.split(""))
  );

  const steps = 2;
  for (const step of [...Array(steps).keys()]) {
    image.enhance(step);
  }

  return image.countLightCells();
});
