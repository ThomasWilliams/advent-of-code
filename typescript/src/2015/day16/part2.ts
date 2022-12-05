import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const sues = new Map<number, Record<string, number>>();
  for (const [i, line] of lines.entries()) {
    const sue = line
      .replace(/^Sue [\d]+: /, "")
      .split(", ")
      .reduce((sue, rawProp): Record<string, number> => {
        const [key, value] = rawProp.split(": ");
        return { ...sue, [key]: parseInt(value) };
      }, {} as Record<string, number>);
    sues.set(i + 1, sue);
  }

  const match: Record<string, number> = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  // for (const [key, value] of Object.entries(match)) {
  //   for (const [i, sue] of sues) {
  //     if (sue[key] !== undefined && sue[key] !== value) {
  //       sues.delete(i);
  //     }
  //   }
  // }

  sueLoop: for (const [i, sue] of sues) {
    for (const [key, value] of Object.entries(sue)) {
      if (["cats", "trees"].includes(key)) {
        if (value <= match[key]) {
          continue sueLoop;
        }
      } else if (["pomeranians", "goldfish"].includes(key)) {
        if (value >= match[key]) {
          continue sueLoop;
        }
      } else if (value !== match[key]) {
        continue sueLoop;
      }
    }
    return i;
  }

  // return [...sues][0][0];
});
