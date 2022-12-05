import * as path from "path";
import * as fs from "fs/promises";
import { stringify } from "querystring";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const [rawRules, messages] = fileContents.split("\n\n").map((s) => s.split("\n"));

  const ruleStrings: Map<string, string> = new Map();
  const possibleStrings: Map<string, string[]> = new Map();

  const indexRegex = /^([\d]+): /;
  for (const ruleString of rawRules) {
    const index = /^([\d]+): /.exec(ruleString)?.[1] ?? "0";
    ruleStrings.set(index, ruleString.replace(indexRegex, ""));
  }

  const cartesianProduct = (...arrs: unknown[][]): unknown[] =>
    arrs.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

  const getPossibleStrings = (index: string): string[] => {
    if (possibleStrings.has(index)) return possibleStrings.get(index) || [];

    const ruleString = ruleStrings.get(index);
    if (!ruleString) throw new Error("you fucked up!");

    if (/"[\w]+"/.test(ruleString)) {
      const strings = [/"([\w]+)"/.exec(ruleString)?.[1] ?? ""];
      possibleStrings.set(index, strings);
      return strings;
    }

    const strings: string[] = [];
    ruleString.split(" | ").forEach((r) => {
      const childPossibles = r.split(" ").map((n) => getPossibleStrings(n.trim()));
      const combinedPossibles: string[] = cartesianProduct(...childPossibles).map((arr) =>
        arr instanceof Array ? arr.join("") : arr
      ) as string[];
      Array.prototype.push.apply(strings, combinedPossibles);
    });
    possibleStrings.set(index, strings);
    return strings;
  };

  const validMessages = getPossibleStrings("0");
  // console.log(possibleStrings);
  return messages.filter((message) => validMessages.includes(message)).length;
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
