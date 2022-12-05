import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const nums = fileContents
    .split("\n")
    .map((n) => parseInt(n))
    .concat(0)
    .sort((a, b) => a - b);

  let ones = 0;
  let threes = 1;
  [...nums.slice(1).keys()].forEach((i) => {
    const diff = nums[i + 1] - nums[i];
    if (diff === 1) ones++;
    if (diff === 3) threes++;
  });
  return ones * threes;
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
