import { readInputLines, run } from "../util";
import * as path from "path";

class Node {
  children: Map<string, Node> = new Map<string, Node>();
  indices: number[] = [];
}

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const bitArrays = await readInputLines(filePath);

  const root = new Node();
  root.indices = [...bitArrays.keys()];

  console.log("building tree");
  for (const [i, bitArray] of bitArrays.entries()) {
    let pointer: Node = root;
    for (let j = 0; j < bitArray.length; j++) {
      const bit = bitArray.charAt(j);
      if (!pointer.children.has(bit)) {
        pointer.children.set(bit, new Node());
      }

      const child = pointer.children.get(bit);
      if (!child) throw new Error("how did I get here?");

      child.indices.push(i);
      pointer = child;
    }
  }

  const findLeaf = (node: Node, comparator: (a: number, b: number) => boolean): string => {
    if (node.indices.length < 1) {
      throw new Error("no valid bitarray");
    }

    if (node.indices.length === 1) {
      return bitArrays[node.indices[0]];
    }

    const zeroesChild = node.children.get("0");
    const onesChild = node.children.get("1");

    if (zeroesChild) {
      if (!onesChild || comparator(zeroesChild.indices.length, onesChild.indices.length)) {
        return findLeaf(zeroesChild, comparator);
      } else {
        return findLeaf(onesChild, comparator);
      }
    } else {
      if (onesChild) {
        return findLeaf(onesChild, comparator);
      } else {
        throw new Error("no valid bitarray");
      }
    }
  };

  const o2Generator = findLeaf(root, (a, b) => a > b);
  const co2Scrubber = findLeaf(root, (a, b) => a <= b);

  return parseInt(o2Generator, 2) * parseInt(co2Scrubber, 2);
});

// answer: 2372923
