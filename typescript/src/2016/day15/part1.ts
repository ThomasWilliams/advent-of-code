/* eslint-disable no-constant-condition */
import { readInputLines, run } from "../../util";
import * as path from "path";

type Disc = {
  size: number;
  p0: number;
};

const lineToDisc = (line: string): Disc => {
  const [size, p0] = (line.match(/ [\d]+/g) ?? []).map((n) => parseInt(n.trim()));
  return { size, p0 };
};

const getPositionOfDisc = ({ size, p0 }: Disc, t: number): number => (t + p0) % size;

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);
  const discs = lines.map((line) => lineToDisc(line));

  let t = -1;
  controlLoop: while (true) {
    t++;
    for (const [i, disc] of discs.entries()) {
      if (getPositionOfDisc(disc, t + i + 1) !== 0) {
        continue controlLoop;
      }
    }
    return t;
  }
});
