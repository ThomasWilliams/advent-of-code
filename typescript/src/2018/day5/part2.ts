import { run, readInput } from "../../util";
import * as path from "path";

const getPolymerLength = (units: number[]): number => {
  let i = 0;
  while (i < units.length) {
    if (Math.abs(units[i] - units[i + 1]) === 32) {
      units.splice(i, 2);
      i = Math.max(0, i - 1);
    } else {
      i++;
    }
  }

  return units.length;
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  return "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((ch) =>
      getPolymerLength(
        input
          .replaceAll(new RegExp(ch, "ig"), "")
          .split("")
          .map((s) => s.charCodeAt(0))
      )
    )
    .reduce((a, b) => Math.min(a, b));
});
