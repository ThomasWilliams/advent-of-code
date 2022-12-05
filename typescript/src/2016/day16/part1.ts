import { run } from "../../util";

const append = (a: string): string => {
  const b = a
    .split("")
    .reverse()
    .map((ch) => (ch === "1" ? "0" : "1"))
    .join("");
  return [a, b].join("0");
};

const calcChecksum = (data: string): string => {
  const checksumChars = [];
  const dataChars = data.split("");
  while (dataChars.length > 1) {
    const a = dataChars.shift();
    const b = dataChars.shift();
    checksumChars.push(a === b ? "1" : "0");
  }
  return checksumChars.join("");
};

run(async () => {
  const input = "01111010110010011";
  const diskLength = 272;

  let data = input;
  while (data.length < diskLength) {
    data = append(data);
  }

  data = data.substring(0, diskLength);

  let checkSum = calcChecksum(data);
  while (checkSum.length % 2 === 0) {
    checkSum = calcChecksum(checkSum);
  }

  return checkSum;
});
