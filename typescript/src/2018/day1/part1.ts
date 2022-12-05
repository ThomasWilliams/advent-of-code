import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  return (await readInputLines(filePath)).map((n) => parseInt(n)).reduce((a, b) => a + b);
});
