import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const charCounts: Array<{ [k: string]: number }> = [];

  for (const line of lines) {
    for (const [i, ch] of line.split("").entries()) {
      if (!charCounts[i]) charCounts[i] = {};
      if (!charCounts[i][ch]) charCounts[i][ch] = 0;
      charCounts[i][ch]++;
    }
  }

  return charCounts
    .map((counts) =>
      Object.entries(counts)
        .sort(([_1, n1], [_2, n2]) => n2 - n1)
        .shift()
        ?.shift()
    )
    .join("");
});
