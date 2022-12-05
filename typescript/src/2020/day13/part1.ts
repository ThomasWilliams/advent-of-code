import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const lines = fileContents.split("\n");
  const start = parseInt(lines[0]);
  const ids = lines[1]
    .split(",")
    .filter((id) => /^[\d]+$/.test(id))
    .map((id) => parseInt(id));

  const nextTimes = ids
    .map((id) => {
      let next = 0;
      while (next < start) next += id;
      return [next, id];
    })
    .sort((a, b) => a[0] - b[0]);

  const earliest = nextTimes[0];
  return (earliest[0] - start) * earliest[1];
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

// answer:
