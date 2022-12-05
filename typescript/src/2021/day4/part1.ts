import { readInput, run } from "../util";
import { Cell, Board } from "./board";
import * as path from "path";

const parseCells = (input: string): Cell[][] => {
  const rows = input.split(/\n/);
  if (rows.length !== 5) throw new Error(`wrong number of rows: ${rows.length}`);

  return rows.map((row) => {
    const nums = row.split(/[\s]+/).filter(Boolean);
    if (nums.length !== 5) throw new Error(`wrong number of cols: ${nums.length}`);

    return nums.map((num) => parseInt(num));
  });
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = (await readInput(filePath)).split(/[\n]{2,}/);

  const calls = input
    .shift()
    ?.split(",")
    .map((n) => parseInt(n));

  if (!calls) throw new Error("parsing error");

  const boards = input.map((chunk, i) => {
    return new Board(parseCells(chunk));
  });

  for (const call of calls) {
    for (const board of boards) {
      if (board.markNumber(call)) {
        return board.getLeftoverSum() * call;
      }
    }
  }

  throw new Error("I don't know what happened");
});

// answer: 33462
