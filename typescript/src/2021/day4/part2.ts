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

  let boards = input.map((chunk, i) => {
    return new Board(parseCells(chunk));
  });

  while (boards.length > 1) {
    const call = calls.shift();
    if (call === undefined) {
      throw new Error("bad call brother");
    }
    boards = boards.filter((board) => !board.markNumber(call));
  }

  const board = boards.shift();
  if (!board) {
    throw new Error("not sure what happened");
  }

  for (const call of calls) {
    if (board.markNumber(call)) {
      return board.getLeftoverSum() * call;
    }
  }

  throw new Error("I don't know what happened");
});

// answer: 30070
