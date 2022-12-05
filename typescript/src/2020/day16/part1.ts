import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const sections = fileContents.split("\n\n");
  const valids: boolean[] = [];
  sections[0].split("\n").forEach((line) => {
    const nums = [...line.matchAll(/[\d]+/g)].map((a) => parseInt(a[0]));
    for (let i = nums[0]; i <= nums[1]; i++) {
      valids[i] = true;
    }
    for (let i = nums[2]; i <= nums[3]; i++) {
      valids[i] = true;
    }
  });

  return sections[2]
    .split("\n")
    .slice(1)
    .map((line) =>
      line
        .split(",")
        .map((n: string) => parseInt(n))
        .filter((n: number) => !valids[n])
        .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b, 0);
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
