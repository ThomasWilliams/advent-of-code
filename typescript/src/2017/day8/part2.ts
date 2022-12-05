import { readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const registers: { [k: string]: number } = {};
  let maxRegisterVal = 0;

  const getRegisterValue = (regKey: string): number => {
    if (!registers[regKey]) registers[regKey] = 0;
    return registers[regKey];
  };

  const doComparison = (value: number, amt: number, op: string): boolean => {
    switch (op) {
      case "<":
        return value < amt;
      case "<=":
        return value <= amt;
      case ">":
        return value > amt;
      case ">=":
        return value >= amt;
      case "==":
        return value == amt;
      case "!=":
        return value != amt;
      default:
        return false;
    }
  };

  const doUpdate = (regKey: string, amt: number, op: string) => {
    if (!registers[regKey]) registers[regKey] = 0;
    switch (op) {
      case "inc":
        registers[regKey] += amt;
        break;
      case "dec":
        registers[regKey] -= amt;
        break;
    }

    maxRegisterVal = Math.max(maxRegisterVal, registers[regKey]);
  };

  for (const line of lines) {
    const [, toUpdate, updateOp, updateAmt, toCompare, compareOp, compareAmt] =
      line.match(/([a-z]+) (inc|dec) (-?[\d]+) if ([a-z]+) ([^\s]+) (-?[\d]+)/) ?? [];

    const compareValue = getRegisterValue(toCompare);
    const conditionMet = doComparison(compareValue, parseInt(compareAmt), compareOp);

    if (conditionMet) {
      doUpdate(toUpdate, parseInt(updateAmt), updateOp);
    }
  }

  return maxRegisterVal;
});
