import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines.filter((line) => {
    const sides = line
      .trim()
      .split(/[\s]+/)
      .map((n) => parseInt(n));
    for (let i = 0; i < sides.length; i++) {
      if ((sides.at(i) ?? 0) >= (sides.at(i - 1) ?? 0) + (sides.at(i - 2) ?? 0)) {
        return false;
      }
    }
    return true;
  }).length;
});
