import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));
  const hill: string[][] = [];
  for await (const line of inputReader.lines) {
    hill.push(line.split(""));
  }

  const slopes: Array<{ right: number; down: number }> = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];
  const TREE = "#";

  return slopes
    .map(({ right, down }) => {
      let row = 0;
      let col = 0;
      let trees = 0;
      while (row < hill.length) {
        if (hill[row][col] === TREE) {
          trees++;
        }
        row = row + down;
        col = (col + right) % hill[0].length;
      }
      return trees;
    })
    .reduce((prod, trees) => prod * trees, 1);
}

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });

// answer: 956091
