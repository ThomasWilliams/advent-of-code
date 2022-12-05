import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  let row = input.split("");
  let safeCount = 0;

  for (let i = 0; i < 400000; i++) {
    safeCount += row.filter((ch) => ch === ".").length;
    row = row.map((_, j, arr) => {
      return (arr[j - 1] === "^" && arr[j + 1] !== "^") || (arr[j - 1] !== "^" && arr[j + 1] === "^") ? "^" : ".";
    });
  }

  return safeCount;
});
