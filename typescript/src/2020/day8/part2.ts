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

  mainLoop: for (let j = 0; j < instructions.length; j++) {
    let i = 0;
    let acc = 0;
    const currentOp = instructions[j].op;
    if (currentOp === "acc") continue;

    const newInstructions = instructions.map(({ op, arg }, k) => {
      return {
        arg,
        done: false,
        op: k !== j ? op : currentOp === "nop" ? "jmp" : "nop",
      };
    });

    while (i < newInstructions.length) {
      const { op, arg, done } = newInstructions[i];
      if (done) continue mainLoop;
      newInstructions[i].done = true;
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
