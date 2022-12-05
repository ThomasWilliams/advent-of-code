import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));
  const maskRegex = /mask = ([X\d]{36})/;
  const memRegex = /mem\[([\d]+)\] = ([\d]+)/;

  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const mem: Map<number, number> = new Map();

  const getMaskedValue = (value: number): number => {
    const binVals = value.toString(2).padStart(36, "0").split("");
    for (const [i, val] of mask.split("").entries()) {
      if (val === "X") continue;
      binVals[i] = val;
    }
    return parseInt(binVals.join(""), 2);
  };

  for await (const line of inputReader.lines) {
    if (maskRegex.test(line)) {
      mask = maskRegex.exec(line)?.[1] ?? mask;
    }

    if (memRegex.test(line)) {
      const [address, value] = (memRegex.exec(line) || ["0", "0", "0"]).slice(1, 3).map((x) => parseInt(x));
      mem.set(address, getMaskedValue(value));
    }
  }

  return [...mem.values()].reduce((a, b) => a + b);
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

// answer: 963
