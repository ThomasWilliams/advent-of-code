import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const changes = (await readInputLines(filePath)).map((n) => parseInt(n));

  let total = 0;
  const totalsFound = new Set<number>();

  let i = 0;
  while (!totalsFound.has(total)) {
    totalsFound.add(total);
    total += changes[i++];
    i %= changes.length;
  }

  return total;
});
