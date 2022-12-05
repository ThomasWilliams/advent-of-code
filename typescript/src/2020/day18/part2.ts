import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "sample"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  return fileContents
    .split("\n")
    .slice(3)
    .map((line) => line.split("").filter((c) => c !== " "))
    .map((line) => solveLine(line))
    .map((n) => {
      console.log(n);
      return n;
    })
    .reduce((a, b) => a + b);
}

const solveLine = (exp: string[]): number => {
  let i = 0;

  const solveExpression = (x: number, op: Operation, level = 0) => {
    // eslint-disable-next-line
    while (true) {
      const ch = exp[i];
      if (!ch || ch === ")") {
        i++;
        console.log({ level, x });
        return x;
      } else if (ch === "(") {
        i++;
        x = op(x, solveExpression(1, multiply, level + 1));
      } else if (/\d/.test(ch)) {
        const next = exp[i + 1];
        console.log({ ch, next, level });
        if (next === "+" && op === multiply) {
          i += 2;
          x = op(x, solveExpression(parseInt(ch), add, level + 1));
        } else if (next === "*" && op === add) {
          i++;
          x = op(x, parseInt(ch));
          console.log({ level, x });
          return x;
        } else {
          i++;
          x = op(x, parseInt(ch));
        }
      } else if (ch === "+" && op === multiply) {
        i++;
        // x = op(x, solveExpression(parseInt(ch), add, level + 1));
      } else if (ch === "*" && op === add) {
        i++;
      } else {
        i++;
      }
    }
  };

  return solveExpression(1, multiply);
};

type Operation = (a: number, b: number) => number;
const add: Operation = (a: number, b: number): number => a + b;
const multiply: Operation = (a: number, b: number): number => a * b;

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });
