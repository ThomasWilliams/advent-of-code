import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  return fileContents
    .split("\n")
    .map((line) => line.split("").filter((c) => c !== " "))
    .map((line) => solveLine(line))
    .reduce((a, b) => a + b);
}

const solveLine = (exp: string[]): number => {
  let i = 0;

  const solveExpression = () => {
    let x = 0;
    let op = add;
    // eslint-disable-next-line
    while (true) {
      const ch = exp[i++];
      if (!ch || ch === ")") {
        return x;
      } else if (ch === "(") {
        x = op(x, solveExpression());
      } else if (/\d/.test(ch)) {
        x = op(x, parseInt(ch));
      } else if (ch === "+") {
        op = add;
      } else if (ch === "*") {
        op = multiply;
      }
    }
  };

  return solveExpression();
};

const add = (a: number, b: number): number => a + b;
const multiply = (a: number, b: number): number => a * b;

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });
