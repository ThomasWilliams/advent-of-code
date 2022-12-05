import { run } from "../../util";

class Generator {
  private readonly divisor = 2147483647;

  constructor(private value: number, private factor: number, private multiple: number) {}

  iterate() {
    do {
      this.value = (this.value * this.factor) % this.divisor;
    } while (this.value % this.multiple !== 0);
  }

  getBinTail(): string {
    const binValue = this.value.toString(2);
    return binValue.substring(binValue.length - 16);
  }
}

run(async function main() {
  // const genA = new Generator(65, 16807, 4);
  // const genB = new Generator(8921, 48271, 8);
  const genA = new Generator(516, 16807, 4);
  const genB = new Generator(190, 482718, 8);

  let count = 0;
  for (let i = 0; i < 5000000; i++) {
    genA.iterate();
    genB.iterate();

    if (genA.getBinTail() === genB.getBinTail()) {
      count++;
    }
  }

  return count;
});
