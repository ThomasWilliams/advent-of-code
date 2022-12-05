import * as fs from "fs/promises";

export const readInput = async (inputPath: string): Promise<string> => {
  const fileHandle = await fs.open(inputPath, "r");
  return fileHandle.readFile({ encoding: "utf8" });
};

export const readInputLines = async (inputPath: string): Promise<string[]> => {
  const inputString = await readInput(inputPath);
  return inputString.split(/[\n]+/);
};

export const readInputLinesAsInts = async (inputPath: string): Promise<number[]> => {
  const lines = await readInputLines(inputPath);
  return lines.map((l) => parseInt(l));
};

export const run = (fn: () => Promise<unknown>): void => {
  fn()
    .then((answer) => {
      console.log(`answer: ${answer}`);
      process.exit(0);
    })
    .catch((e) => {
      console.log(`ERROR!`, e);
      process.exit(1);
    });
};

export const runWithTimer = (fn: () => Promise<unknown>, time = 60000): void => {
  const timer = new Promise((resolve, reject) => {
    setTimeout(reject, time, `Function timed out after ${time}ms`);
  });

  Promise.race([timer, fn()])
    .then((answer) => {
      console.log(`answer: ${answer}`);
      process.exit(0);
    })
    .catch((e) => {
      console.log(`ERROR!`, e);
      process.exit(1);
    });
};

export const sum = (nums: number[]): number => nums.reduce((a, b) => a + b);

export const product = (nums: number[]): number => nums.reduce((a, b) => a * b);

export const tri = (n: number): number => (n * (n + 1)) / 2;

export const wait = async (millis = 100): Promise<void> =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, millis)
  );

export const permuteList = <T>(list: T[]): T[][] => {
  const result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const curr = arr.slice();
      const next = curr.splice(i, 1);
      permute(curr.slice(), m.concat(next));
    }
  };

  permute(list);

  return result;
};
