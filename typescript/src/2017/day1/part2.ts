import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const digits = input.split("").map((d) => parseInt(d));

  const half = digits.length / 2;
  return (
    digits
      .slice(0, half)
      .filter((digit, i) => digit === digits[i + half])
      .reduce((a, b) => a + b) * 2
  );
});
