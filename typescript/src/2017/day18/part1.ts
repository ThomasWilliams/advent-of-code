import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const instructions = await readInputLines(filePath);

  const prog: Record<string, number> = {};

  const getValue = (val: string): number => (isNaN(parseInt(val)) ? prog[val] ?? 0 : parseInt(val));

  let p = 0;
  let sound: number | null = null;
  while (p < instructions.length) {
    const instruction = instructions[p].split(" ");
    const command = instruction.shift() ?? "";

    if (command === "snd") {
      sound = getValue(instruction[0]);
    } else if (command === "set") {
      prog[instruction[0]] = getValue(instruction[1]);
    } else if (command === "add") {
      prog[instruction[0]] += getValue(instruction[1]);
    } else if (command === "mul") {
      prog[instruction[0]] *= getValue(instruction[1]);
    } else if (command === "mod") {
      prog[instruction[0]] %= getValue(instruction[1]);
    } else if (command === "jgz" && getValue(instruction[0]) > 0) {
      p += getValue(instruction[1]);
      continue;
    } else if (command === "rcv" && getValue(instruction[0]) !== 0) {
      break;
    }

    p++;
  }

  return sound;
});
