import { readInput, run } from "../util";
import { IPacket } from "./packet";
import { LiteralPacket } from "./literal-packet";
import { OperatorPacket } from "./operator-packet";
import * as path from "path";

const bitArrayToDec = (bitArray: number[]): number => {
  let dec = 0;
  let exp = 0;
  while (bitArray.length) {
    const bit = bitArray.pop();
    if (bit === undefined) break;
    dec += bit * Math.pow(2, exp++);
  }
  return dec;
};

const hexToBin: { [k: string]: string } = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const bitStream = input
    .split("")
    .map((ch) => hexToBin[ch])
    .join("")
    .split("")
    .map((c) => parseInt(c));

  const take = (n: number): number[] => {
    const ret: number[] = [];
    for (const _ of [...Array(n).keys()]) {
      const nextBit = bitStream.shift();
      if (nextBit === undefined) break;
      ret.push(nextBit);
    }
    return ret;
  };

  const parsePacket = (): {
    packet: IPacket;
    length: number;
  } => {
    const version = bitArrayToDec(take(3));
    const typeId = bitArrayToDec(take(3));
    // console.log(`version: ${version}; typeId: ${typeId}`);

    let length = 6;

    if (typeId === 4) {
      let last = false;
      const valueArray = [];
      while (!last) {
        last = !take(1).pop();
        valueArray.push(...take(4));
        length += 5;
      }
      const value = bitArrayToDec(valueArray);
      const packet = new LiteralPacket(version, typeId, value);
      return { packet, length };
    } else {
      if (take(1)[0]) {
        const subPacketCount = bitArrayToDec(take(11));
        length += 12;

        const packet = new OperatorPacket(version, typeId, subPacketCount, true);

        for (const _ of [...Array(subPacketCount).keys()]) {
          const subPacketData = parsePacket();
          length += subPacketData.length;
          packet.addSubPacket(subPacketData.packet);
        }

        return { packet, length };
      } else {
        const subPacketLength = bitArrayToDec(take(15));
        length += 16;

        const packet = new OperatorPacket(version, typeId, subPacketLength, false);

        let runningLength = 0;
        while (runningLength < subPacketLength) {
          const subPacketData = parsePacket();
          runningLength += subPacketData.length;
          packet.addSubPacket(subPacketData.packet);
        }

        length += runningLength;
        return { packet, length };
      }
    }
  };

  const { packet } = parsePacket();
  return packet.getVersionSum();
});
