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

  const calcOrbits = (node: string, depth = 0): number => {
    const children = tree[node];
    return children ? children.map((child) => depth + 1 + calcOrbits(child, depth + 1)).reduce((a, b) => a + b) : 0;
  };

  return calcOrbits("COM");
});
