import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const digits = input.split("").map((d) => parseInt(d));

  return digits.reduce((sum, curr, i) => {
    const prev = digits.at(i - 1);
    return (sum += prev === curr ? curr : 0);
  }, 0);
});
