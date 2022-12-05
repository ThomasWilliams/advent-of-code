import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const [stacksInput, procedureInput] = input.split("\n\n");

  const stacks: string[][] = [];
  const stackLines = stacksInput.split("\n");
  for (let i = 0; i < 8; i++) {
    const stackChars = stackLines[i].split("");
    for (let k = 0; k < stackChars.length; k += 4) {
      const chunk = stackChars.slice(k, k + 4);
      const char = chunk.filter((c) => c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90)[0];
      if (!char) continue;
      const stackNumber = k / 4 + 1;
      if (!stacks[stackNumber]) stacks[stackNumber] = [];
      stacks[stackNumber].push(char);
    }
  }

  for (const step of procedureInput.split("\n")) {
    const [n, from, to] = (step.match(/[\d]+/g) ?? []).map((d) => parseInt(d));
    const toAdd = [];
    for (let j = 0; j < n; j++) {
      toAdd.push(stacks[from].shift() ?? "");
    }
    stacks[to].unshift(...toAdd);
  }

  return stacks
    .slice(1)
    .map((a) => a[0])
    .join("");
});
