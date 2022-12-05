import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const units = lines.map((line) => parseInt(line)).sort((a, b) => b - a);

  const arrangements: number[][] = [];

  const findArrangements = (target: number, remainingUnits: number[], currentArrangement: number[]) => {
    if (target < 0) {
      return;
    } else if (target === 0) {
      arrangements.push(currentArrangement.slice());
    } else if (remainingUnits.length) {
      const topUnit = remainingUnits[0];
      findArrangements(target - topUnit, remainingUnits.slice(1), currentArrangement.concat(topUnit));

      findArrangements(target, remainingUnits.slice(1), currentArrangement);
    }
  };

  findArrangements(150, units, []);
  return arrangements.length;
});
