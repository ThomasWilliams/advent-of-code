import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const score = (ch: string) => (ch.charCodeAt(0) > 96 ? ch.charCodeAt(0) - 96 : ch.charCodeAt(0) - 38);

  // return lines
  //   .map((line) => {
  //     const firstHalf = line.substring(0, line.length / 2).split("");
  //     const secondHalf = line.substring(line.length / 2).split("");
  //     const common = firstHalf.filter((ch) => secondHalf.includes(ch))[0];
  //     return common.charCodeAt(0) > 96 ? common.charCodeAt(0) - 96 : common.charCodeAt(0) - 38;
  //   })
  //   .reduce((a, b) => a + b);

  let total = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const ch = lines
      .slice(i, i + 3)
      .map((line) => line.split(""))
      .reduce((a, b) => a.filter((ch) => b.includes(ch)));
    total += score(ch[0]);
  }

  return total;
});
