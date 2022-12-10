import { readInputLines, run } from "../../util";
import * as path from "path";

class Puter {
  x: number;
  cycle: number;
  signals: string[];

  constructor() {
    this.x = 1;
    this.cycle = 0;
    this.signals = [];
  }

  noop() {
    this.tick();
  }

  add(n: number) {
    this.tick();
    this.tick();
    this.x += n;
  }

  tick() {
    const i = this.cycle++;
    const ch = Math.abs((i % 40) - this.x) <= 1 ? "#" : ".";
    this.signals[i] = ch;
  }
}

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  const puter = new Puter();

  for (const line of input) {
    if (line === "noop") {
      puter.noop();
    } else {
      puter.add(parseInt(line.split(" ")[1]));
    }
  }

  const rowSize = 40;
  for (let row = 0; row < 6; row++) {
    console.log(puter.signals.slice(row * rowSize, (row + 1) * rowSize).join(""));
  }
});
