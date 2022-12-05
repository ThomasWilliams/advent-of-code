import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const letterCounts = lines.map((line) =>
    line.split("").reduce((dict, ch) => ({ ...dict, [ch]: (dict[ch] ?? 0) + 1 }), {} as { [k: string]: number })
  );

  return (
    letterCounts.filter((dict) => Object.values(dict).includes(2)).length *
    letterCounts.filter((dict) => Object.values(dict).includes(3)).length
  );
});
