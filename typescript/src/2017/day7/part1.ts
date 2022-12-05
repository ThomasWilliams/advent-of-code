import { readInputLines, run } from "../../util";
import * as path from "path";

type Program = {
  weight: number;
  children: string[];
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const programs: { [key: string]: Program } = {};
  for (const line of lines) {
    const [, name, weight] = line.match(/^([a-z]+) \(([\d]+)\)/) ?? [];
    const children = /->/.test(line) ? line.split(" -> ")[1].split(", ") : [];
    programs[name] = { weight: parseInt(weight), children };
  }

  const allChildren = new Set<string>();
  for (const { children } of Object.values(programs)) {
    for (const child of children) {
      allChildren.add(child);
    }
  }

  for (const name of Object.keys(programs)) {
    if (!allChildren.has(name)) {
      return name;
    }
  }

  throw new Error("didn't find it");
});
