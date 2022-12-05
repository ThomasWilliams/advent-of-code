/* eslint-disable no-constant-condition */
import { run, readInput } from "../../util";
import * as path from "path";

const runProgram = (p: number[], noun: number, verb: number): number => {
  const memory = [p[0], noun, verb, ...p.slice(3)];

  let pointer = 0;
  while (pointer < memory.length) {
    const code = memory[pointer];

    if (code === 99) {
      break;
    }

    if (code === 1) {
      memory[memory[pointer + 3]] = memory[memory[pointer + 1]] + memory[memory[pointer + 2]];
    }

    if (code === 2) {
      memory[memory[pointer + 3]] = memory[memory[pointer + 1]] * memory[memory[pointer + 2]];
    }

    pointer += 4;
  }

  return memory[0];
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);
  const program = input.split(",").map((n) => parseInt(n));

  const target = 19690720;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const output = runProgram(program, noun, verb);
      if (output === target) {
        return 100 * noun + verb;
      }
    }
  }

  console.log("did not find");
});
