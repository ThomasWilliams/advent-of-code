import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const grid: number[][] = (await readInputLines(filePath)).map((line) => line.split("").map((d) => parseInt(d)));

  const cols: number[][] = [];
  const getCol = (colIndex: number): number[] => {
    if (!cols[colIndex]) {
      cols[colIndex] = grid.map((row) => row[colIndex]);
    }
    return cols[colIndex];
  };

  const isVisibleFn =
    (height: number) =>
    (inFront: number[]): boolean =>
      inFront.every((v) => v < height);

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const height = grid[row][col];
      const currRow = grid[row];
      const currCol = getCol(col);
      const isVisible = isVisibleFn(height);
      if (
        isVisible(currRow.slice(0, col)) ||
        isVisible(currRow.slice(col + 1)) ||
        isVisible(currCol.slice(0, row)) ||
        isVisible(currCol.slice(row + 1))
      ) {
        count++;
      }
    }
  }

  return count;
});
