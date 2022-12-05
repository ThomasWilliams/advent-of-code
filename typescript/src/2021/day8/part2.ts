import { readInputLines, run } from "../util";
import * as path from "path";

const union = (a: string, b: string): string => a.concat([...b].filter((c) => !a.includes(c)).join(""));

const intersect = (a: string, b: string): string => [...a].filter((c) => b.includes(c)).join("");

const diff = (a: string, b: string): string => [...a].filter((c) => !b.includes(c)).join("");

const xUnion = (a: string, b: string): string => diff(union(a, b), intersect(a, b));

const contains = (a: string, b: string): boolean => [...b].every((ch) => a.includes(ch));

const equal = (a: string, b: string): boolean => [...a].sort().join("") === [...b].sort().join("");

const getOutputValue = (signals: string[], outputs: string[]): number => {
  const lengthIndex = signals.reduce<string[][]>((acc, curr) => {
    const length = curr.length;
    if (acc[length]) {
      acc[length].push(curr);
    } else {
      acc[length] = [curr];
    }
    return acc;
  }, []);

  /*
   *  0
   * 1 2
   *  3
   * 4 5
   *  6
   */
  const segments: string[] = [];

  // segment 0
  segments[0] = diff(lengthIndex[3][0], lengthIndex[2][0]);

  // segment 6
  segments[6] = diff(
    diff(lengthIndex[6].find((s) => contains(s, lengthIndex[4][0])) || "", lengthIndex[4][0]),
    segments[0]
  );

  // segment 3
  segments[3] = diff(
    diff(lengthIndex[5].find((s) => contains(s, lengthIndex[2][0])) || "", lengthIndex[2][0]),
    `${segments[0]}${segments[6]}`
  );

  // segments 2 & 4
  const sixAndNine = lengthIndex[6].filter((s) => contains(s, segments[3]));
  const uniqueSixAndNineSegs = xUnion(sixAndNine[0], sixAndNine[1]);
  segments[2] = intersect(uniqueSixAndNineSegs, lengthIndex[2][0]);
  segments[4] = diff(uniqueSixAndNineSegs, lengthIndex[2][0]);

  // segment 1
  segments[1] = diff(diff(lengthIndex[4][0], lengthIndex[2][0]), segments[3]);

  // segment 5
  segments[5] = diff(
    diff(diff(diff(diff(diff(lengthIndex[7][0], segments[0]), segments[1]), segments[2]), segments[3]), segments[4]),
    segments[6]
  );

  const nums: string[] = [];

  nums[0] = lengthIndex[6].find((num) => !num.includes(segments[3])) ?? "";
  nums[1] = lengthIndex[2][0];
  nums[2] = lengthIndex[5].find((num) => !num.includes(segments[5])) ?? "";
  nums[3] = lengthIndex[5].find((num) => num.includes(segments[2]) && num.includes(segments[5])) ?? "";
  nums[4] = lengthIndex[4][0];
  nums[5] = lengthIndex[5].find((num) => !num.includes(segments[2])) ?? "";
  nums[6] = lengthIndex[6].find((num) => !num.includes(segments[2])) ?? "";
  nums[7] = lengthIndex[3][0];
  nums[8] = lengthIndex[7][0];
  nums[9] = lengthIndex[6].find((num) => !num.includes(segments[4])) ?? "";

  return parseInt(outputs.map((output) => nums.findIndex((n) => equal(n, output))).join(""));
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = (await readInputLines(filePath)).map((line) => {
    const [signals, outputs] = line.split("|").map((segment) => segment.split(" ").filter(Boolean));
    return { signals, outputs };
  });

  return input.map(({ signals, outputs }) => getOutputValue(signals, outputs)).reduce((a, b) => a + b);
});

// answer: 986179
