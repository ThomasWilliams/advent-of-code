import { readInputLines, run } from "../../util";
import * as path from "path";

class Puter {
  x: number;
  cycle: number;
  signals: number[];

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
    this.cycle++;
    if (this.cycle % 40 === 20 && this.cycle <= 220) {
      this.signals.push(this.cycle * this.x);
    }
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

  return puter.signals.reduce((a, b) => a + b);
});
