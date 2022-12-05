import { readInputLines, run } from "../util";
import * as path from "path";

class NodeStore {
  private lookup: { [k: string]: Node } = {};

  getNode(key: string): Node {
    if (!this.lookup[key]) {
      const node = new Node(key);
      this.lookup[key] = node;
    }
    return this.lookup[key];
  }
}

class Node {
  value: string;
  links: Node[] = [];

  constructor(value: string) {
    this.value = value;
  }

  addLink(node: Node) {
    this.links.push(node);
  }
}

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const edges = (await readInputLines(filePath)).map((e) => e.split("-"));

  const store = new NodeStore();

  // construct graph
  const start = store.getNode("start");

  const queue: Node[] = [start];
  while (queue.length) {
    const node = queue.shift();
    if (!node) break;

    while (edges.some((e) => e.some((n) => n === node.value))) {
      const spliceIndex = edges.findIndex((e) => e.some((n) => n === node.value));
      const linkValue = edges.splice(spliceIndex, 1)[0].find((n) => n !== node.value);
      if (!linkValue) throw new Error("something weird happened");

      const link = store.getNode(linkValue);

      queue.push(link);
      node.addLink(link);
      link.addLink(node);
    }
  }

  // recursive walk
  const walk = (node: Node, values: string[]): number => {
    // console.log("----------------");
    // console.log(`walked: ${values}`);
    // console.log(`at: ${node.value}`);
    // console.log(`links: ${node.links.map((n) => n.value)}`);

    if (node.value === "end") {
      return 1;
    }

    if (!values.includes(node.value)) {
      values.push(node.value);
    }

    return node.links
      .filter((n) => /^[A-Z]+$/.test(n.value) || !values.includes(n.value))
      .map((n) => walk(n, values.slice()))
      .reduce((a, b) => a + b, 0);
  };

  return walk(start, []);
});

// answer: 4773
