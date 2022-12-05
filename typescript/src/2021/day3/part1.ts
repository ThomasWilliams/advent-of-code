import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const bitArrays = await readInputLines(filePath);

  const sums = bitArrays.reduce<number[]>((sums, bitArray) => {
    // for (const bit of bitArray)
    bitArray.split("").forEach((ch, i) => {
      if (ch === "1") {
        sums[i]++;
      }
    });
    return sums;
  }, Array(bitArrays[0].length).fill(0));

  const gammaBin = sums.map((sum) => (sum >= bitArrays.length / 2 ? "1" : "0")).join("");
  const epsilonBin = sums.map((sum) => (sum < bitArrays.length / 2 ? "1" : "0")).join("");
  return parseInt(gammaBin, 2) * parseInt(epsilonBin, 2);
});

// answer: 749376
