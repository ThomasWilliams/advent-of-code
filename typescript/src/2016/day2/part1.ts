import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const keypad: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const pos = [1, 1];
  const combo = [];

  for (const line of lines) {
    for (const ch of line.split("")) {
      switch (ch) {
        case "U":
          pos[0] = Math.max(0, pos[0] - 1);
          break;
        case "L":
          pos[1] = Math.max(0, pos[1] - 1);
          break;
        case "D":
          pos[0] = Math.min(keypad.length - 1, pos[0] + 1);
          break;
        case "R":
          pos[1] = Math.min(keypad[0].length - 1, pos[1] + 1);
          break;
      }
    }
    combo.push(keypad[pos[0]][pos[1]]);
  }

  return combo.join("");
});
