import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const instructions = await readInputLines(filePath);

  const program: Record<string, number> = { a: 0, b: 0, c: 1, d: 0 };

  let p = 0;
  while (p < instructions.length) {
    const instruction = instructions[p].split(" ");
    const command = instruction.shift() ?? "";
    if (command === "cpy") {
      const next = instruction.shift() ?? "0";
      const toCopy = isNaN(parseInt(next)) ? program[next] ?? 0 : parseInt(next);
      program[instruction[0]] = toCopy;
      p++;
    } else if (command === "inc") {
      program[instruction[0]]++;
      p++;
    } else if (command === "dec") {
      program[instruction[0]]--;
      p++;
    } else if (command === "jnz") {
      const next = instruction.shift() ?? "0";
      const test = isNaN(parseInt(next)) ? program[next] ?? 0 : parseInt(next);
      if (test !== 0) {
        p += parseInt(instruction[0]);
      } else {
        p++;
      }
    }
  }

  return program.a;
});
