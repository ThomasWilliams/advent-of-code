import { readInputLinesAsInts, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const nums = await readInputLinesAsInts(filePath);

  type Acc = { prev: number; count: number };
  return nums.reduce(
    ({ prev, count }: Acc, curr: number) => {
      return { prev: curr, count: curr > prev ? count + 1 : count };
    },
    { prev: Number.POSITIVE_INFINITY, count: 0 }
  ).count;
});

// answer: 1446
