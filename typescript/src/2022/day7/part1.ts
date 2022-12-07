import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  const dirSizes: Record<string, number> = {};

  const pwd: string[] = [];
  for (const line of input) {
    if (line.startsWith("$ cd")) {
      const dirName = line.split(" ").pop() ?? "";
      dirName === ".." ? pwd.pop() : pwd.push(dirName);
    }

    if (/^[\d]+ /.test(line)) {
      const size = parseInt(line.split(" ").shift() ?? "0");
      for (let i = 1; i < pwd.length + 1; i++) {
        const dirName = pwd.slice(0, i).join("/").replace("//", "/");
        if (!dirSizes[dirName]) dirSizes[dirName] = 0;
        dirSizes[dirName] += size;
      }
    }
  }

  return Object.values(dirSizes)
    .filter((v) => v <= 100000)
    .reduce((a, b) => a + b);
});
