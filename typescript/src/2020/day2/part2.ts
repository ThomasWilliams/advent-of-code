import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));
  let validPasswords = 0;

  for await (const line of inputReader.lines) {
    const result = /([\d]+)-([\d]+) ([a-z]): ([a-z]+)/.exec(line);
    if (result === null) {
      throw new Error("you fucked up!");
    }

    const [i1, i2] = result.slice(1, 3).map((n) => parseInt(n, 10));
    const [char, pw] = result.slice(3, 5);
    const hasI1 = pw.charAt(i1 - 1) === char;
    const hasI2 = pw.charAt(i2 - 1) === char;
    if (hasI1 !== hasI2) {
      validPasswords++;
    }
  }

  return validPasswords;
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

// answer: 584
