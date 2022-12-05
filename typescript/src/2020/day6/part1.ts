import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  return fileContents
    .split(/[\n]{2,}/)
    .map((group) => new Set(group.replace(/[^a-z]/g, "")).size)
    .reduce((sum, n) => sum + n, 0);
}

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });

// answer: 6530
