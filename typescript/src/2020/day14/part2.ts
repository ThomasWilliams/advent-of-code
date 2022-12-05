import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));
  const maskRegex = /mask = ([X\d]{36})/;
  const memRegex = /mem\[([\d]+)\] = ([\d]+)/;

  let mask = "000000000000000000000000000000000000";
  const mem: Map<number, number> = new Map();

  const fillInFloats = (address: string[]): string[][] => {
    const firstX = address.indexOf("X");
    if (firstX < 0) return [address];

    const tails = fillInFloats(address.slice(firstX + 1));
    const filledAddresses: string[][] = [];
    tails.forEach((tail) => {
      filledAddresses.push([...address.slice(0, firstX), "0", ...tail]);
      filledAddresses.push([...address.slice(0, firstX), "1", ...tail]);
    });
    return filledAddresses;
  };

  const getMaskedAddresses = (address: number): number[] => {
    const binVals = address.toString(2).padStart(36, "0").split("");
    for (const [i, val] of mask.split("").entries()) {
      if (val === "0") continue;
      binVals[i] = val;
    }
    return fillInFloats(binVals).map((binArray) => parseInt(binArray.join(""), 2));
  };

  for await (const line of inputReader.lines) {
    if (maskRegex.test(line)) {
      mask = maskRegex.exec(line)?.[1] ?? mask;
    }

    if (memRegex.test(line)) {
      const [address, value] = (memRegex.exec(line) || ["0", "0", "0"]).slice(1, 3).map((x) => parseInt(x));
      getMaskedAddresses(address).forEach((maskedAddress) => {
        mem.set(maskedAddress, value);
      });
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
