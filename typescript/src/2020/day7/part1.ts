import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const rules: Record<string, string[]> = {};
  fileContents.split("\n").reduce((rules, line) => {
    const color = (line.match(/^(.+) bags contain/) || [])[1];
    const otherColors = [...line.matchAll(/\d (.+?) bag/g)].map((match) => match[1]);

    rules[color] = otherColors;
    return rules;
  }, rules);

  const colorQueue = ["shiny gold"];
  const containers: Set<string> = new Set();

  while (colorQueue.length) {
    const current = colorQueue.shift() || "";
    for (const [comp, compArray] of Object.entries(rules)) {
      if (compArray.includes(current)) {
        containers.add(comp);
        colorQueue.push(comp);
      }
    }
  }

  return containers.size;
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
