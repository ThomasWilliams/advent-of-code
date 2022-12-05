export class IntcodeComputer {
  private memory: number[] = [];
  private pointer = 0;
  private opcode = 99;
  private relativeBase = 0;
  private parameterModes: number[] = [];
  private getNthDigit = (num: number, n: number) => Math.floor(num / 10 ** (n - 1)) % 10;

  constructor(private data: number[]) {}

  private resetMemory() {
    this.memory = this.data.slice();
    this.pointer = 0;
  }

  private getCurrentInt(): number {
    return this.memory[this.pointer];
  }

  private setOpcode(instruction: number) {
    this.opcode = instruction % 100;
  }

  private setParameterModes(instruction: number) {
    this.parameterModes = [this.getNthDigit(instruction, 3), this.getNthDigit(instruction, 4), 0];
  }

  private getArgIndex(index: number, parameterMode: number): number {
    switch (parameterMode) {
      case 1:
        return index;
      case 2:
        return this.memory[index + this.relativeBase];
      default:
        return this.memory[index];
    }
  }

  private getArgIndexes(): number[] {
    return this.parameterModes.map((mode, i) => this.getArgIndex(this.pointer + i + 1, mode));
  }

  private add() {
    const [i1, i2, i3] = this.getArgIndexes();
    this.memory[i3] = this.memory[i1] + this.memory[i2];
    this.pointer += 4;
  }

  private multiply() {
    const [i1, i2, i3] = this.getArgIndexes();
    this.memory[i3] = this.memory[i1] * this.memory[i2];
    this.pointer += 4;
  }

  private readInput(input: number[]) {
    const [i1] = this.getArgIndexes();
    this.memory[i1] = input.shift() ?? 0;
    this.pointer += 2;
  }

  private writeOutput(output: number[]) {
    const [i1] = this.getArgIndexes();
    output.push(this.memory[i1]);
    this.pointer += 2;
  }

  private jumpIfTrue() {
    const [i1, i2] = this.getArgIndexes();
    if (this.memory[i1] !== 0) {
      this.pointer = this.memory[i2];
    } else {
      this.pointer += 3;
    }
  }

  private jumpIfFalse() {
    const [i1, i2] = this.getArgIndexes();
    if (this.memory[i1] === 0) {
      this.pointer = this.memory[i2];
    } else {
      this.pointer += 3;
    }
  }

  private lessThan() {
    const [i1, i2, i3] = this.getArgIndexes();
    this.memory[i3] = this.memory[i1] < this.memory[i2] ? 1 : 0;
    this.pointer += 4;
  }

  private equals() {
    const [i1, i2, i3] = this.getArgIndexes();
    this.memory[i3] = this.memory[i1] === this.memory[i2] ? 1 : 0;
    this.pointer += 4;
  }

  private updateRelativeBase() {
    const [i1] = this.getArgIndexes();
    this.relativeBase += this.memory[i1];
    this.pointer += 2;
  }

  public run(input: number[]): number[] {
    this.resetMemory();

    const output: number[] = [];

    while (this.pointer < this.memory.length) {
      const instruction = this.getCurrentInt();
      this.setOpcode(instruction);
      this.setParameterModes(instruction);

      switch (this.opcode) {
        case 1:
          this.add();
          break;

        case 2:
          this.multiply();
          break;

        case 3:
          this.readInput(input);
          break;

        case 4:
          this.writeOutput(output);
          break;

        case 5:
          this.jumpIfTrue();
          break;

        case 6:
          this.jumpIfFalse();
          break;

        case 7:
          this.lessThan();
          break;

        case 8:
          this.equals();
          break;

        case 9:
          this.updateRelativeBase();
          break;

        case 99:
          return output;

        default:
          this.pointer++;
      }
    }

    throw new Error("invalid instructions");
  }
}
