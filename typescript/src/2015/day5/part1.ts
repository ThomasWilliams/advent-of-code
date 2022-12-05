import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines.map((line) => testLine(line)).filter(Boolean).length;
});

const testLine = (line: string): boolean => {
  return (line.match(/[aeiou]/g) || []).length >= 3 && /([a-z])\1/.test(line) && !/(ab|cd|pq|xy)/.test(line);
};
