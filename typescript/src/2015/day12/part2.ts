import { readInput, run } from "../util";
import * as path from "path";

const getValue = (input: Array<unknown> | Record<string, unknown>): number => {
  let vals: unknown[] = [];

  if (Array.isArray(input)) {
    vals = input;
  } else {
    vals = Object.values(input);
    if (vals.includes("red")) return 0;
  }

  return vals
    .map((val: unknown): number => {
      if (typeof val === "object") {
        return getValue(val as Record<string, unknown>);
      } else if (typeof val === "number") {
        return val;
      } else {
        return 0;
      }
    })
    .reduce((a, b) => a + b);
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);
  const doc: Record<string, unknown> = JSON.parse(input);

  return getValue(doc);
});
