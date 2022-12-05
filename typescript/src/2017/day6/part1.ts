import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const memBanks = (await readInput(filePath)).split(/[\s]+/).map((n) => parseInt(n));

  const arrangements = new Set<string>();
  let steps = 0;

  while (!arrangements.has(JSON.stringify(memBanks))) {
    arrangements.add(JSON.stringify(memBanks));

    const maxBank = memBanks.reduce((a, b) => Math.max(a, b));
    const maxIndex = memBanks.findIndex((bank) => bank === maxBank);

    let alloc = memBanks[maxIndex];
    let j = maxIndex;
    memBanks[maxIndex] = 0;

    while (alloc) {
      j = (j + 1) % memBanks.length;
      memBanks[j]++;
      alloc--;
    }
    steps++;
  }

  return steps;
});
