import { run } from "../../util";

class Generator {
  private readonly divisor = 2147483647;

  constructor(private value: number, private factor: number) {}

  iterate() {
    this.value = (this.value * this.factor) % this.divisor;
  }

  getBinTail(): string {
    const binValue = this.value.toString(2);
    return binValue.substring(binValue.length - 16);
  }
}

run(async function main() {
  // const genA = new Generator(65, 16807);
  // const genB = new Generator(8921, 48271);
  const genA = new Generator(516, 16807);
  const genB = new Generator(190, 48271);

  let count = 0;
  for (let i = 0; i < 40000000; i++) {
    genA.iterate();
    genB.iterate();

    if (genA.getBinTail() === genB.getBinTail()) {
      count++;
    }
  }

  return count;
});
