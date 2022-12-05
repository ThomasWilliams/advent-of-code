import * as path from "path";
import InputReader from "../../util/input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));

  const nums: number[] = [];

  for await (const line of inputReader.lines) {
    const num = parseInt(line);
    const otherNum = nums.find((n) => n + num === 2020);
    if (otherNum) {
      return num * otherNum;
    }
    nums.push(num);
  }

  console.log("you fucked up!");
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
