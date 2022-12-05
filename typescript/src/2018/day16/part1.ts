import { run, readInput } from "../../util";
import * as path from "path";

type Sample = {
  before: number[];
  input: number[];
  after: number[];
};

const codeMap = [
  "addr",
  "addi",
  "mulr",
  "muli",
  "banr",
  "bani",
  "borr",
  "bori",
  "setr",
  "seti",
  "gtir",
  "gtri",
  "gtrr",
  "eqir",
  "eqri",
  "eqrr",
];

const register = (register: number[]) => {
  // console.log({ register });
  return (input: number[]) => {
    // console.log({ input });
    const opCode = codeMap[input[0]];
    const opPre = opCode.slice(0, 2);
    const a = opCode === "seti" || opCode.charAt(2) === "i" ? input[1] : register[input[1]];
    const b = opCode.charAt(3) === "i" ? input[2] : register[input[2]];
    const values = register.slice();
    switch (opPre) {
      case "ad":
        values[input[3]] = a + b;
        break;
      case "mu":
        values[input[3]] = a * b;
        break;
      case "ba":
        values[input[3]] = a & b;
        break;
      case "bo":
        values[input[3]] = a | b;
        break;
      case "se":
        values[input[3]] = a;
        break;
      case "gt":
        values[input[3]] = a > b ? 1 : 0;
        break;
      case "eq":
        values[input[3]] = a === b ? 1 : 0;
        break;
    }
    return values;
  };
};

const registersAreEqual = (a: number[], b: number[]): boolean => {
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const testSample = ({ before, input, after }: Sample): boolean => {
  const op = register(before);
  let passCount = 0;
  for (let i = 0; i < codeMap.length; i++) {
    const result = op([i].concat(input.slice(1)));
    console.log({ opCode: codeMap[i], before, input, result });
    if (registersAreEqual(result, after)) {
      // console.log("HIT");
      passCount++;
    }

    if (passCount >= 3) {
      return true;
    }
  }
  return false;
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  // const samples: Sample[] = input
  //   .split("\n\n")
  //   .slice(0, -1)
  //   .map((str) => {
  //     const nums = (str.match(/[\d+]/g) ?? []).map((n) => parseInt(n));
  //     return {
  //       before: nums.slice(0, 4),
  //       input: nums.slice(4, 8),
  //       after: nums.slice(8),
  //     };
  //   });

  // let total = 0;
  // for (const sample of samples) {
  //   if (testSample(sample)) {
  //     total++;
  //   }
  // }

  // return total;

  const sample = {
    before: [3, 2, 1, 1],
    input: [9, 2, 1, 2],
    after: [3, 2, 2, 1],
  };

  return testSample(sample);
});
