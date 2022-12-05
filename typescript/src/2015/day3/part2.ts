import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const houses = new Set<string>();

  const coord = [
    [0, 0],
    [0, 0],
  ];
  houses.add(coord[0].toString());
  for (const [i, ch] of [...input].entries()) {
    const s = i % 2;
    switch (ch) {
      case "<":
        coord[s][0]--;
        break;
      case ">":
        coord[s][0]++;
        break;
      case "v":
        coord[s][1]--;
        break;
      case "^":
        coord[s][1]++;
        break;
    }
    houses.add(coord[s].toString());
  }
  return houses.size;
});
