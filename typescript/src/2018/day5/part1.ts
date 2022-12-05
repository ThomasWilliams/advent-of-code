import { run, readInput } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const units: number[] = (await readInput(filePath)).split("").map((ch) => ch.charCodeAt(0));

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
});
