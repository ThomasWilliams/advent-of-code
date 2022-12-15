import { readInput, run } from "../../util";
import * as path from "path";

type Monkey = {
  queue: number[];
  op: (n: number) => number;
  test: (n: number) => number;
  count: number;
};

const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;

const parseOperation = (s: string): ((n: number) => number) => {
  const parts = s
    .slice(s.indexOf("=") + 1)
    .trim()
    .split(" ");
  const fn = parts[1] === "+" ? add : multiply;
  return (n: number) => {
    const arg1 = parts[0] === "old" ? n : parseInt(parts[0]);
    const arg2 = parts[2] === "old" ? n : parseInt(parts[2]);
    const result = fn(arg1, arg2);
    return result;
  };
};

const parseTest = (lines: string[]): ((n: number) => number) => {
  const divisibleBy = parseInt(lines[0].split(" ").pop() ?? "1");
  const trueValue = parseInt(lines[1].split(" ").pop() ?? "1");
  const falseValue = parseInt(lines[2].split(" ").pop() ?? "1");
  return (n: number) => (n % divisibleBy === 0 ? trueValue : falseValue);
};

const parseMonkeyInput = (input: string): Monkey => {
  const lines = input.split("\n").slice(1);
  const queue = [...(lines[0].match(/[\d]+/g) || [])].map((n) => parseInt(n));
  const op = parseOperation(lines[1]);
  const test = parseTest(lines.slice(2));
  return { queue, op, test, count: 0 };
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const monkeys = input.split("\n\n").map((monkeyInput) => parseMonkeyInput(monkeyInput));

  for (let round = 0; round < 20; round++) {
    for (const [i, monkey] of monkeys.entries()) {
      while (monkey.queue.length) {
        const item = Math.floor(monkey.op(monkey.queue.shift() ?? 0) / 3);
        const index = monkey.test(item);
        monkeys[index].queue.push(item);
        monkey.count++;
      }
    }
  }

  const highestMonkeyScores = monkeys.map((m) => m.count).sort((a, b) => b - a);
  return highestMonkeyScores[0] * highestMonkeyScores[1];
});
