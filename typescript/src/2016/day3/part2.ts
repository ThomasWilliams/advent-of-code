import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const nums: number[][] = lines.map((line) =>
    line
      .trim()
      .split(/[\s]+/)
      .map((n) => parseInt(n))
  );

  const triangles: number[][] = [];
  for (let row = 0; row < nums.length; row += 3) {
    for (let col = 0; col < nums[row].length; col++) {
      triangles.push([nums[row][col], nums[row + 1][col], nums[row + 2][col]]);
    }
  }

  return triangles.filter((sides) => {
    for (let i = 0; i < sides.length; i++) {
      if ((sides.at(i) ?? 0) >= (sides.at(i - 1) ?? 0) + (sides.at(i - 2) ?? 0)) {
        return false;
      }
    }
    return true;
  }).length;
});
