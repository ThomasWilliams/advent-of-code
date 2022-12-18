import { readInputLines, run } from "../../util";
import * as path from "path";

type Packet = Array<number | Packet>;

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

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const packets: Packet[] = (await readInputLines(filePath))
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => JSON.parse(s))
    .concat([[[2]], [[6]]]);

  const sortedPackets = packets.sort(comparePackets);

  return (
    (sortedPackets.findIndex((p) => JSON.stringify(p) === "[[2]]") + 1) *
    (sortedPackets.findIndex((p) => JSON.stringify(p) === "[[6]]") + 1)
  );
});
