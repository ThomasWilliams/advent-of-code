import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const molecule = lines.pop() ?? "";

  const replacementRegex = /^([\w]+) => ([\w]+)$/;
  const replacements: Record<string, string[]> = lines.reduce((dict, line) => {
    const [, from, to] = line.match(replacementRegex) ?? [];
    if (from && to) {
      if (!dict[from]) {
        return { ...dict, [from]: [to] };
      } else {
        dict[from].push(to);
      }
    }
    return dict;
  }, {} as Record<string, string[]>);
});
