import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const bots: number[][] = [];
  const outputs: number[] = [];

  for (const line of lines.filter((line) => /^value/.test(line))) {
    return; // TODO
  }
});
