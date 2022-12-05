/* eslint-disable no-case-declarations */
import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const moves = (await readInput(filePath)).split(",");

  const programs = [...Array(16).keys()].map((n) => String.fromCharCode(n + 97));

  const spin = (n: number) => {
    for (let i = 0; i < n; i++) {
      programs.unshift(programs.pop() ?? "");
    }
  };

  const exchange = (i: number, j: number) => {
    [programs[i], programs[j]] = [programs[j], programs[i]];
  };

  const partner = (e1: string, e2: string) => {
    const i = programs.findIndex((e) => e === e1);
    const j = programs.findIndex((e) => e === e2);
    exchange(i, j);
  };

  for (const move of moves) {
    switch (move.charAt(0)) {
      case "s":
        const n = parseInt((move.match(/[\d]+/) ?? [])[0]);
        spin(n);
        break;
      case "x":
        const [i, j] = (move.match(/[\d]+/g) ?? []).map((n) => parseInt(n));
        exchange(i, j);
        break;
      case "p":
        partner(move.charAt(1), move.charAt(3));
        break;
    }
  }

  return programs.join("");
});
