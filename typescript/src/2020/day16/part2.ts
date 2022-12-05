import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const sections = fileContents.split("\n\n");
  const validNums: boolean[] = [];
  const rules: Record<string, number[]> = {};
  const possiblePositions: Record<string, boolean[]> = {};

  sections[0].split("\n").forEach((line) => {
    const type = (line.match(/^(.+):/) || [])[1];
    const nums = [...line.matchAll(/[\d]+/g)].map((a) => parseInt(a[0]));
    rules[type] = nums;
    for (let i = nums[0]; i <= nums[1]; i++) {
      validNums[i] = true;
    }
    for (let i = nums[2]; i <= nums[3]; i++) {
      validNums[i] = true;
    }
  });

  const rulesCount = Object.keys(rules).length;
  Object.keys(rules).forEach((type) => {
    possiblePositions[type] = Array(rulesCount).fill(true);
  });

  const myTicket = sections[1]
    .split("\n")[1]
    .split(",")
    .map((n) => parseInt(n));

  const validTickets = sections[2]
    .split("\n")
    .slice(1)
    .map((line) => line.split(",").map((n: string) => parseInt(n)))
    .filter((arr) => arr.every((n) => validNums[n]));

  const checkRule = (type: string, n: number): boolean => {
    const rule = rules[type];
    return (n >= rule[0] && n <= rule[1]) || (n >= rule[2] && n <= rule[3]);
  };

  const possibleTypes: string[][] = Array(Object.keys(rules).length);
  const translation: string[] = Array(possibleTypes.length).fill(null);
  for (const i of possibleTypes.keys()) {
    const column = validTickets.map((vals) => vals[i]);
    possibleTypes[i] = Object.keys(rules).filter((type) => column.every((val) => checkRule(type, val)));
  }

  while (translation.some((s) => s === null)) {
    const [i, arr] = [...possibleTypes.entries()].find(([i, arr]) => !translation[i] && arr.length === 1) || [-1, [""]];
    const type = arr[0];
    translation[i] = type;
    possibleTypes.forEach((arr, i) => {
      const removeAt = arr.findIndex((val) => val === type);
      if (removeAt >= 0) {
        arr.splice(removeAt, 1);
        possibleTypes[i] = arr;
      }
    });
  }

  return myTicket.filter((n, i) => /departure/.test(translation[i])).reduce((a, b) => a * b);
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
