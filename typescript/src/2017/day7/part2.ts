import { readInputLines, run } from "../../util";
import * as path from "path";

type Program = {
  weight: number;
  children: string[];
  totalWeight?: number;
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

  const findRoot = (): string => {
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
  };

  const getAndPopulateTotalWeight = (programName: string): number => {
    const program = programs[programName];
    const childWeight = program.children.length
      ? program.children.map((name) => getAndPopulateTotalWeight(name)).reduce((a, b) => a + b)
      : 0;
    program.totalWeight = program.weight + childWeight;
    return program.totalWeight;
  };

  const findBadDisc = (name: string, target: number): number => {
    const sortedChildren = programs[name].children
      .map((name) => ({ name, ...programs[name] }))
      .sort((a, b) => (a.totalWeight ?? a.weight) - (b.totalWeight ?? b.weight));

    if (sortedChildren[0].totalWeight !== sortedChildren[1].totalWeight) {
      return findBadDisc(sortedChildren[0].name, sortedChildren[1].totalWeight ?? 0);
    }

    if (sortedChildren.at(-1)?.totalWeight !== sortedChildren.at(-2)?.totalWeight) {
      return findBadDisc(sortedChildren.at(-1)?.name ?? "", sortedChildren.at(-2)?.totalWeight ?? 0);
    }

    const { weight, totalWeight } = programs[name];
    return weight + (target - (totalWeight ?? 0));
  };

  const root = findRoot();
  getAndPopulateTotalWeight(root);
  return findBadDisc(root, 0);
});
