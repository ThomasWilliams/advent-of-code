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

  const connected = new Set<number>();

  const walk = (node: number, visited: number[] = []) => {
    connected.add(node);
    for (const child of graph[node]) {
      if (!visited.includes(child)) {
        walk(child, visited.concat(child));
      }
    }
  };

  walk(0);

  return connected.size;
});
