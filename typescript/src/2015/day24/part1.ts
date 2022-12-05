import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const weights = (await readInputLines(filePath)).map((n) => parseInt(n)).sort((a, b) => b - a);

  const targetWeight = weights.reduce((a, b) => a + b) / 3;
});
