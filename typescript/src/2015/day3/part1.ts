import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const houses = new Set<string>();
  const coord = [0, 0];
  houses.add(coord.toString());
  for (const ch of input) {
    switch (ch) {
      case "<":
        coord[0]--;
        break;
      case ">":
        coord[0]++;
        break;
      case "v":
        coord[1]--;
        break;
      case "^":
        coord[1]++;
        break;
    }
    houses.add(coord.toString());
  }
  return houses.size;
});
