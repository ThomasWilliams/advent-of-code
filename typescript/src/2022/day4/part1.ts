import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines
    .map((line) => {
      const [a1, a2, b1, b2] = [...(line.match(/([\d]+)-([\d]+),([\d]+)-([\d]+)/) || [])]
        .slice(1)
        .map((n) => parseInt(n));
      return (a1 >= b1 && a2 <= b2) || (a1 <= b1 && a2 >= b2);
    })
    .filter(Boolean).length;
});
