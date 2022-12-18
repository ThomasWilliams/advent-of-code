import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const pairInputs = input.split("\n\n");

  type Packet = Array<number | Packet>;

  const packetPairs: Packet[][] = pairInputs.map((input) => input.split("\n").map((line) => JSON.parse(line)));

  const comparePackets = (left: Packet, right: Packet): number => {
    for (let i = 0; i < left.length; i++) {
      if (i >= right.length) {
        return 1;
      }

      const leftItem = left[i];
      const rightItem = right[i];

      if (typeof leftItem === "number" && typeof rightItem === "number") {
        if (leftItem === rightItem) continue;
        return leftItem < rightItem ? -1 : 1;
      }

      const packetsAreInOrder = comparePackets(
        typeof leftItem === "number" ? [leftItem] : leftItem,
        typeof rightItem === "number" ? [rightItem] : rightItem
      );

      if (packetsAreInOrder !== 0) {
        return packetsAreInOrder;
      }
    }
    return right.length > left.length ? -1 : 0;
  };

  return packetPairs
    .map(([left, right], i) => [comparePackets(left, right) <= 0, i] as [boolean, number])
    .filter(([c]) => c)
    .map(([, i]) => i + 1)
    .reduce((a, b) => a + b, 0);
});
