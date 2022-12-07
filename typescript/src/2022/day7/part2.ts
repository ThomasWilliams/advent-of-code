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

  const totalDisk = 70000000;
  const targetUnused = 30000000;
  const currentUnused = totalDisk - dirSizes["/"];
  const needed = targetUnused - currentUnused;

  return Object.values(dirSizes).reduce((prev, curr) => {
    return needed < curr && curr < prev ? curr : prev;
  });
});
