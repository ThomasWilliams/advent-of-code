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

  const getScenicScoreFn =
    (height: number) =>
    (inFront: number[]): number =>
      inFront.findIndex((v) => v >= height) + 1 || inFront.length;

  let maxScenicScore = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const height = grid[row][col];
      const currRow = grid[row];
      const currCol = getCol(col);
      const getScenicScore = getScenicScoreFn(height);

      const totalScenicScore = [
        getScenicScore(currRow.slice(0, col).reverse()),
        getScenicScore(currCol.slice(0, row).reverse()),
        getScenicScore(currRow.slice(col + 1)),
        getScenicScore(currCol.slice(row + 1)),
      ].reduce((a, b) => a * b);

      maxScenicScore = Math.max(maxScenicScore, totalScenicScore);
    }
  }

  return maxScenicScore;
});
