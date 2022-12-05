import * as path from "path";
import * as fs from "fs/promises";

const preamble = 25;

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const nums = fileContents.split("\n").map((n) => parseInt(n));

  const invalidNumber = (() => {
    const sums: number[][] = [];
    for (const i of nums.keys()) {
      const num = nums[i];
      if (i >= preamble) {
        let found = false;
        for (let j = i - preamble; j < i; j++) {
          for (let k = 0; k < sums[j].length; k++) {
            if (nums[i] === sums[j][k]) {
              found = true;
              break;
            }
          }
        }
        if (!found) return num;
      }
      sums.push(nums.slice(Math.max(0, i - preamble), i).map((n) => n + num));
    }

    throw new Error("you fucked up!");
  })();

  const numRange = (() => {
    for (const i of nums.keys()) {
      let j = i;
      let target = invalidNumber;
      while (target > 0) {
        target -= nums[j++];
      }
      if (target === 0) {
        return nums.slice(i, j);
      }
    }
  })();

  if (!numRange || numRange.length < 2) throw new Error("you fucked up!");

  numRange.sort((a, b) => a - b);
  return numRange[0] + numRange[numRange.length - 1];
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

// answer: 956091
