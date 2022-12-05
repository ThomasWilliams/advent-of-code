import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines.map((line) => getLineScore(line)).reduce((a, b) => a + b);
});

const getLineScore = (line: string): number => {
  const rawLength = line.length;
  let compiledLength = 0;
  let p = 0;
  const chars = line.slice(1, line.length - 1).split("");
  while (p < chars.length) {
    if (chars[p] === "\\") {
      if (chars[p + 1] === "\\" || chars[p + 1] === '"') {
        p += 2;
      } else if (/x[0-9a-f]{2}/.test(chars.slice(p + 1, p + 4).join(""))) {
        p += 4;
      } else {
        p++;
      }
    } else {
      p++;
    }
    compiledLength++;
  }
  return rawLength - compiledLength;
};
