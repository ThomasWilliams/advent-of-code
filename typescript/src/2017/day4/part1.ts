import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines.filter((line) => {
    const words = line.split(/[\s]+/);
    for (const [i, word1] of words.entries()) {
      for (const word2 of words.slice(i + 1)) {
        if (word1 === word2) return false;
      }
    }
    return true;
  }).length;
});
