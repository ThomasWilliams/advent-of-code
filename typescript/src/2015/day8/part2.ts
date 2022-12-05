import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines.map((line) => getLineScore(line)).reduce((a, b) => a + b);
});

const getCharCount = (str: string, ch: string): number => str.split("").filter((c) => c === ch).length;

const getLineScore = (line: string): number => getCharCount(line, '"') + getCharCount(line, "\\") + 2;
