import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));

  const instructions: { op: string; arg: number; done: boolean }[] = [];

  for await (const line of inputReader.lines) {
    const result = /(acc|jmp|nop) ((?:\+|-)[\d]+)/.exec(line);
    if (!result) throw new Error("you fucked up!");

    instructions.push({
      op: result[1],
      arg: parseInt(result[2]),
      done: false,
    });
  }

  let i = 0;
  let acc = 0;
  while (i < instructions.length) {
    const { op, arg, done } = instructions[i];
    if (done) break;
    instructions[i].done = true;
    if (op === "acc") {
      acc += arg;
    }
    if (op === "jmp") {
      i += arg;
    } else {
      i++;
    }
  }
  return acc;
}

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });

// answer:
