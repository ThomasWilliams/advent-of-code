import { run, readInputLines } from "../../util";
import * as path from "path";

run(async () => {
  // const filePath = path.resolve(__dirname, "input");
  const filePath = path.resolve(__dirname, "sample");
  let acres: string[][] = (await readInputLines(filePath)).map((s) => s.split(""));

  const TIME = 10;

  const getCounts = (x: number, y: number): [number, number, number] =>
    [-1, 0, 1]
      .map((x) => [
        [x, -1],
        [x, 0],
        [x, 1],
      ])
      .reduce((a, b) => b.concat(a))
      .filter(([i, j]) => !(i === 0 && j === 0))
      .map(([i, j]) => acres[x + i]?.[y + j])
      .filter((n) => !!n)
      .reduce(
        (counts, val) => {
          switch (val) {
            case ".":
              counts[0]++;
              break;
            case "|":
              counts[1]++;
              break;
            case "#":
              counts[2]++;
              break;
          }
          return counts;
        },
        [0, 0, 0]
      );

  for (let t = 0; t < TIME; t++) {
    const next: string[][] = [];
    for (let x = 0; x < acres.length; x++) {
      next[x] = [];
      for (let y = 0; y < acres[x].length; y++) {
        const counts = getCounts(x, y);
        const val = acres[x][y];
        if (val === "." && counts[1] >= 3) {
          next[x][y] = "|";
        } else if (val === "|" && counts[2] >= 3) {
          next[x][y] = "#";
        } else if (val === "#" && (counts[0] === 0 || counts[2] === 0)) {
          next[x][y] = ".";
        } else {
          next[x][y] = val;
        }
      }
    }
    acres = next;
  }

  return acres.map((l) => l.join("")).join("\n");
});
