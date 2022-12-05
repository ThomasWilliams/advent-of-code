import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines.map((line) => testLine(line)).filter(Boolean).length;
});

const testLine = (line: string): boolean => {
  return /([a-z]{2}).*\1/.test(line) && /([a-z]).\1/.test(line);
};
