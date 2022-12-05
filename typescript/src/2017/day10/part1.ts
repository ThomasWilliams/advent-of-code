import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");

  const lengths = (await readInput(filePath)).split(",").map((n) => parseInt(n));
  const size = 256;

  // const lengths = [3, 4, 1, 5];
  // const size = 5;

  const list = [...Array(size).keys()];
  let pos = 0;
  let skip = 0;

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

  return list[0] * list[1];
});
