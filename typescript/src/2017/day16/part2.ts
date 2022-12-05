/* eslint-disable no-case-declarations */
import { readInput, run } from "../../util";
import * as path from "path";

const spin = (a: string[], n: number) => {
  for (let i = 0; i < n; i++) {
    a.unshift(a.pop() ?? "");
  }
};

const exchange = (a: string[], i: number, j: number) => {
  [a[i], a[j]] = [a[j], a[i]];
};

const partner = (a: string[], e1: string, e2: string) => {
  const i = a.findIndex((e) => e === e1);
  const j = a.findIndex((e) => e === e2);
  exchange(a, i, j);
};

const dance = (programs: string[], moves: string[]): string[] => {
  const danced = programs.slice();
  for (const move of moves) {
    switch (move.charAt(0)) {
      case "s":
        const n = parseInt((move.match(/[\d]+/) ?? [])[0]);
        spin(danced, n);
        break;
      case "x":
        const [i, j] = (move.match(/[\d]+/g) ?? []).map((n) => parseInt(n));
        exchange(danced, i, j);
        break;
      case "p":
        partner(danced, move.charAt(1), move.charAt(3));
        break;
    }
  }
  return danced;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const moves = (await readInput(filePath)).split(",");

  let programs = [...Array(16).keys()].map((n) => String.fromCharCode(n + 97));
  const key = dance(programs, moves).map((ch) => ch.charCodeAt(0) - 97);

  // console.log(key);

  for (let i = 0; i < 100; i++) {
    programs = key.map((n) => programs[n]);
    // console.log(programs);
  }

  // console.log(programs);

  return programs.join("");
});
