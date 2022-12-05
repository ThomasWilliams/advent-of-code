import { readInputLines, run } from "../util";
import * as path from "path";

const reduceSnailNumber = (s: string): string => {
  // eslint-disable-next-line
  mainLoop: while (true) {
    let leftBracketCount = 0;
    let lastNumberIndex = -1;
    for (const [i, ch] of [...s].entries()) {
      if (ch === "[") leftBracketCount++;
      if (ch === "]") leftBracketCount--;
      if (/[\d]/.test(ch)) {
        if (leftBracketCount < 5) {
          lastNumberIndex = i;
        } else {
          let copy = `${s}`;

          // get two numbers from pair to explode
          const [n1, n2] = [...(s.slice(i).match(/^([\d]+),([\d]+)/) || [])].slice(1).map((n) => parseInt(n));

          // add left num to closest other num
          let expanded = false;
          if (lastNumberIndex >= 0) {
            const a0 = /[\d]/.test(s[lastNumberIndex - 1]) ? lastNumberIndex - 1 : lastNumberIndex;
            const a1 = lastNumberIndex + 1;
            const na = parseInt(s.slice(a0, a1));
            const newNum = n1 + na;
            if (na < 10 && newNum >= 10) {
              expanded = true;
            }
            copy = `${copy.slice(0, a0)}${newNum}${copy.slice(a1)}`;
          }

          // find index for string after exploding snail number
          const j = s.slice(i).indexOf("]") + 1 + i;

          // add right num to closest other num
          if (s.slice(j).search(/[\d]/) >= 0) {
            const b0 = s.slice(j).search(/[\d]/) + j;
            const b1 = s.slice(b0).search(/[^\d]/) + b0;
            const nb = parseInt(s.slice(b0, b1));
            const newNum = n2 + nb;
            copy = `${copy.slice(0, b0 + Number(expanded))}${newNum}${copy.slice(b1 + Number(expanded))}`;
          }

          // replace exploded number (pair) with 0
          copy = `${copy.slice(0, i - 1 + Number(expanded))}0${copy.slice(j + Number(expanded))}`;

          s = copy;
          continue mainLoop;
        }
      }
    }

    if (s.search(/[\d]{2,}/) >= 0) {
      const i0 = s.search(/[\d]{2,}/);
      const i1 = i0 + s.slice(i0).search(/[^\d]/);
      const val = parseInt(s.slice(i0, i1));
      s = `${s.slice(0, i0)}[${Math.floor(val / 2)},${Math.ceil(val / 2)}]${s.slice(i1)}`;
      continue mainLoop;
    }

    break;
  }
  return s;
};

const findCenterCommaIndex = (s: string): number => {
  let leftBracketCount = 0;
  for (const [i, ch] of [...s].entries()) {
    switch (ch) {
      case "[":
        leftBracketCount++;
        break;
      case "]":
        leftBracketCount--;
        break;
      case ",":
        if (leftBracketCount === 1) return i;
    }
  }
  throw new Error(`center comma not found in "${s}"`);
};

const splitSnailNumber = (s: string): string[] => {
  const mid = findCenterCommaIndex(s);
  return [s.slice(1, mid), s.slice(mid + 1, s.length - 1)];
};

const combineSnailNumbers = (s1: string, s2: string): string => reduceSnailNumber(`[${s1},${s2}]`);

const calculateSnailNumberMagnitude = (s: string): number => {
  if (!isNaN(parseInt(s))) return parseInt(s);
  if (!/^\[.*\]$/.test(s)) throw new Error(`string "${s}" does not have bounding brackets`);
  const [left, right] = splitSnailNumber(s);
  return 3 * calculateSnailNumberMagnitude(left) + 2 * calculateSnailNumberMagnitude(right);
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const snailNumbers = await readInputLines(filePath);

  return calculateSnailNumberMagnitude(snailNumbers.reduce((a, b) => combineSnailNumbers(a, b)));
});
