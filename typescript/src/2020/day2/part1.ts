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

    const [min, max] = result.slice(1, 3).map((n) => parseInt(n, 10));
    const [char, pw] = result.slice(3, 5);
    const times = pw.split("").filter((c) => c === char).length;
    if (min <= times && times <= max) {
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

// answer: 439
