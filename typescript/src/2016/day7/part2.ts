import { readInputLines, run } from "../../util";
import * as path from "path";

const isSupported = (line: string): boolean => {
  const hypernetRegex = /\[[\w]*\]/g;
  const abaRegex = /(.)((?!\1).)\1/;

  const hypernetSequences = (line.match(hypernetRegex) ?? []).map((s) => s.replace(/[[\]]/g, ""));
  const regularSequences = line.split(hypernetRegex);

  const abaSequences: string[] = [];
  for (const regularSequence of regularSequences) {
  }

  return regularSequences.some((s) => abbaRegex.test(s)) && !hypernetSequences.some((s) => abbaRegex.test(s));
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines.filter((line) => isSupported(line)).length;
});
