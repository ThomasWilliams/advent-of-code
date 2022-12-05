import { readInput, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const fishes = input.split(",").map((n) => parseInt(n));
  const days = 80;

  let newFishes = 0;
  for (let t = 0; t < days; t++) {
    for (const [i, fish] of fishes.entries()) {
      if (fish === 0) {
        newFishes++;
        fishes[i] = 6;
      } else {
        fishes[i]--;
      }
    }

    for (let i = 0; i < newFishes; i++) {
      fishes.push(8);
    }
    newFishes = 0;
  }

  return fishes.length;
});

// answer: 360610
