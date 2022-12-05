import { run, readInputLines } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const orbits = await readInputLines(filePath);

  const tree: { [k: string]: string[] } = {};

  const addOrbit = (parent: string, child: string) => {
    if (!tree[parent]) {
      tree[parent] = [child];
    } else {
      tree[parent].push(child);
    }
  };

  for (const orbit of orbits) {
    const [parent, child] = orbit.split(")");
    addOrbit(parent, child);
  }

  const findPath = (node: string): string[] => {
    const path = [node];
    while (path[0] !== "COM") {
      path.unshift(Object.keys(tree).find((key) => tree[key].includes(path[0])) || "");
    }
    return path;
  };

  const youPath = findPath("YOU");
  const sanPath = findPath("SAN");

  while (youPath[0] === sanPath[0]) {
    youPath.shift();
    sanPath.shift();
  }

  return youPath.length + sanPath.length - 2;
});
