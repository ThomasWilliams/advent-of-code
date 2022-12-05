export const reg = (input: number[]) => {
  return {
    addr: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    addi: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    mulr: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    muli: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    banr: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    bani: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    borr: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    bori: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    gtir: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    gtri: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    gtrr: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    eqir: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    eqri: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
    eqrr: ([a, b, c]: number[]): number[] => {
      const vals = input.slice();
      return vals;
    },
  };
};

export class Register {
  constructor(private _values: number[]) {}

  static operationList(): string[] {
    return [
      "addr",
      "addi",
      "mulr",
      "muli",
      "banr",
      "bani",
      "borr",
      "bori",
      "gtir",
      "gtri",
      "gtrr",
      "eqir",
      "eqri",
      "eqrr",
    ];
  }

  addr([a, b, c]: number[]) {
    this._values[c] = this._values[a] + this._values[b];
    return this;
  }

  addi([a, b, c]: number[]) {
    this._values[c] = this._values[a] + b;
    return this;
  }

  mulr([a, b, c]: number[]) {
    this._values[c] = this._values[a] * this._values[b];
    return this;
  }

  muli([a, b, c]: number[]) {
    this._values[c] = this._values[a] * b;
    return this;
  }

  banr([a, b, c]: number[]) {
    this._values[c] = this._values[a] & this._values[b];
    return this;
  }

  bani([a, b, c]: number[]) {
    this._values[c] = this._values[a] & b;
    return this;
  }

  borr([a, b, c]: number[]) {
    this._values[c] = this._values[a] | this._values[b];
    return this;
  }

  bori([a, b, c]: number[]) {
    this._values[c] = this._values[a] | b;
    return this;
  }

  gtir([a, b, c]: number[]) {
    this._values[c] = a > this._values[b] ? 1 : 0;
    return this;
  }

  gtri([a, b, c]: number[]) {
    this._values[c] = this._values[a] > b ? 1 : 0;
    return this;
  }

  gtrr([a, b, c]: number[]) {
    this._values[c] = this._values[a] > this._values[b] ? 1 : 0;
    return this;
  }

  eqir([a, b, c]: number[]) {
    this._values[c] = a === this._values[b] ? 1 : 0;
    return this;
  }

  eqri([a, b, c]: number[]) {
    this._values[c] = this._values[a] === b ? 1 : 0;
    return this;
  }

  eqrr([a, b, c]: number[]) {
    this._values[c] = this._values[a] === this._values[b] ? 1 : 0;
    return this;
  }

  get values(): number[] {
    return this._values.slice();
  }
}
