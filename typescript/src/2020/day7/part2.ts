import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const rules: Record<string, [number, string][]> = {};
  fileContents.split("\n").reduce((rules, line) => {
    const color = (line.match(/^(.+) bags contain/) || [])[1];
    const otherColors = [...line.matchAll(/([\d]+) (.+?) bag/g)].map((match): [number, string] => [
      parseInt(match[1]),
      match[2],
    ]);

    rules[color] = otherColors;
    return rules;
  }, rules);

  console.log(rules);

  const getInsideCount = (color: string): number =>
    rules[color].map(([count, insideColor]) => count * getInsideCount(insideColor)).reduce((a, b) => a + b, 1);

  return getInsideCount("shiny gold") - 1;
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
