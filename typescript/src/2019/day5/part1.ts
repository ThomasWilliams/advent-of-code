import { run, readInput } from "../../util";
import * as path from "path";

const getNthDigit = (num: number, n: number) => Math.floor(num / 10 ** (n - 1)) % 10;

const runProgram = (m: number[], input: number): number[] => {
  const memory = m.slice();
  const output: number[] = [];

  let pointer = 0;
  while (pointer < memory.length) {
    const instruction = memory[pointer];
    const code = instruction % 100;

    if (code === 99) {
      break;
    } else if (code === 1) {
      const arg1 = getNthDigit(instruction, 3) === 1 ? memory[pointer + 1] : memory[memory[pointer + 1]];
      const arg2 = getNthDigit(instruction, 4) === 1 ? memory[pointer + 2] : memory[memory[pointer + 2]];
      memory[memory[pointer + 3]] = arg1 + arg2;
      pointer += 4;
    } else if (code === 2) {
      const arg1 = getNthDigit(instruction, 3) === 1 ? memory[pointer + 1] : memory[memory[pointer + 1]];
      const arg2 = getNthDigit(instruction, 4) === 1 ? memory[pointer + 2] : memory[memory[pointer + 2]];
      memory[memory[pointer + 3]] = arg1 * arg2;
      pointer += 4;
    } else if (code === 3) {
      memory[memory[pointer + 1]] = input;
      pointer += 2;
    } else if (code === 4) {
      const arg1 = getNthDigit(instruction, 3) === 1 ? memory[pointer + 1] : memory[memory[pointer + 1]];
      output.push(arg1);
      pointer += 2;
    } else {
      pointer++;
    }
  }

  return output;
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const program = (await readInput(filePath)).split(",").map((n) => parseInt(n));

  return runProgram(program, 1);
});
