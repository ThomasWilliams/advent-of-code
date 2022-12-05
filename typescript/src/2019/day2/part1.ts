/* eslint-disable no-constant-condition */
import { run, readInput } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);
  const program = input.split(",").map((n) => parseInt(n));

  program[1] = 12;
  program[2] = 2;

  let pointer = 0;
  while (pointer < program.length) {
    const code = program[pointer];

    if (code === 99) {
      break;
    }

    if (code === 1) {
      program[program[pointer + 3]] = program[program[pointer + 1]] + program[program[pointer + 2]];
    }

    if (code === 2) {
      program[program[pointer + 3]] = program[program[pointer + 1]] * program[program[pointer + 2]];
    }

    pointer += 4;
  }

  return program[0];
});
