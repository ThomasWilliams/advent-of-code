import { readInputLinesAsInts, run } from "../util";
import * as path from "path";

async function main() {
  const filePath = path.resolve(__dirname, "input");
  const nums = await readInputLinesAsInts(filePath);

  type Acc = { prev: number; count: number };
  const sum = (nums: number[]): number => nums.reduce((a, b) => a + b);

  return nums.reduce(
    ({ prev, count }: Acc, _: number, i: number, arr: number[]) => {
      if (i < 2) return { prev, count };
      const curr = sum(arr.slice(i - 2, i + 1));
      return { prev: curr, count: curr > prev ? count + 1 : count };
    },
    { prev: Number.POSITIVE_INFINITY, count: 0 }
  ).count;
}

run(main);

// answer: 1486
