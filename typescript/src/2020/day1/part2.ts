import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));

  const nums: number[] = [];
  const products: Array<{ sum: number; product: number }> = [];

  for await (const line of inputReader.lines) {
    const num = parseInt(line);
    const prod = products.find(({ sum }) => num + sum === 2020);
    if (prod) {
      return num * prod.product;
    }

    for (const otherNum of nums) {
      products.push({
        sum: num + otherNum,
        product: num * otherNum,
      });
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

// answer: 79734368
