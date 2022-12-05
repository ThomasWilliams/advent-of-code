import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const joltages = fileContents
    .split("\n")
    .map((n) => parseInt(n))
    .sort((a, b) => a - b);

  const joltageCounts: number[] = [];

  const getPathsForJoltage = (joltage = 0): number => {
    if (joltageCounts[joltage]) return joltageCounts[joltage];

    const validNextJoltages = joltages.filter((j) => j > joltage && j <= joltage + 3);
    if (!validNextJoltages.length) return 1;

    const joltageCount = validNextJoltages.map(getPathsForJoltage).reduce((a, b) => a + b);
    joltageCounts[joltage] = joltageCount;
    return joltageCount;
  };

  return getPathsForJoltage(0);
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
