import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));

  const TREE = "#";
  let i = 0;
  let trees = 0;

  for await (const line of inputReader.lines) {
    if (line.charAt(i) === TREE) {
      trees++;
    }
    i = (i + 3) % line.length;
  }

  return trees;
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
