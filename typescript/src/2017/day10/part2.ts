import { readInput, run } from "../../util";
import * as path from "path";

export const generateKnotHash = (input: string): string => {
  const lengths = input
    .split("")
    .map((s) => s.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);
  const size = 256;

  const list = [...Array(size).keys()];
  let pos = 0;
  let skip = 0;

  for (const _ of [...Array(64).keys()]) {
    for (const length of lengths) {
      for (let start = pos, end = pos + length - 1; start < end; start++, end--) {
        const front = list[start % list.length];
        const back = list[end % list.length];

        list[start % list.length] = back;
        list[end % list.length] = front;
      }
      pos += length + skip;
      pos %= list.length;
      skip++;
    }
  }

  const denseHash = [...Array(16).keys()].map((i) => list.slice(i * 16, (i + 1) * 16).reduce((a, b) => a ^ b));

  return denseHash.map((n) => n.toString(16).padStart(2, "0")).join("");
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  return generateKnotHash(input);
});
