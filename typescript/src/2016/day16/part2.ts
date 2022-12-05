import { run } from "../../util";

const calcChecksum = (data: string[]): string[] => {
  const checksumChars = [];
  while (data.length > 1) {
    const a = data.shift();
    const b = data.shift();
    checksumChars.push(a === b ? "1" : "0");
  }
  return checksumChars;
};

run(async () => {
  const input = "01111010110010011";
  const diskLength = 35651584;

  console.log("sequencing...");
  const data = input.split("");
  while (data.length < diskLength) {
    data.push("0");
    const remaining = diskLength - data.length;
    for (let i = data.length - 2, count = 0; i >= 0 && count < remaining; i--, count++) {
      data.push(data[i] === "1" ? "0" : "1");
    }
    console.log(`sequence length: ${data.length}`);
  }

  console.log("calculating checksum...");
  let p = data.length;
  while (p % 2 === 0) {
    p /= 2;
    for (let i = 0; i <= p; i++) {
      data[i] = data[2 * i] === data[2 * i + 1] ? "1" : "0";
    }
    console.log(`checksum length: ${p}`);
  }

  return data.slice(0, p).join("");
});
