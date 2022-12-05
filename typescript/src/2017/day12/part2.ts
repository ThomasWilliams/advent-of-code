import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const graph: number[][] = [];
  for (const line of lines) {
    const nums = (line.match(/([\d]+)/g) ?? []).map((n) => parseInt(n));
    graph[nums[0]] = nums.slice(1);
  }

  const groups: Array<Set<number>> = [];

  let pos = 0;
  while (pos < graph.length) {
    const group = new Set<number>();

    const walk = (node: number, visited: number[] = []) => {
      group.add(node);
      for (const child of graph[node]) {
        if (!visited.includes(child)) {
          walk(child, visited.concat(child));
        }
      }
    };

    walk(pos);
    groups.push(group);

    while (groups.some((group) => group.has(pos))) {
      pos++;
    }
  }

  return groups.length;
});
