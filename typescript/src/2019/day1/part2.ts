import { sum, run, readInputLinesAsInts } from "../../util";
import * as path from "path";

const calcFuelForNumber = (n: number): number => Math.floor(n / 3) - 2;

const calcFuelForModule = (mod: number): number => {
  const fuels: number[] = [];
  let fuel = calcFuelForNumber(mod);
  while (fuel > 0) {
    fuels.push(fuel);
    fuel = calcFuelForNumber(fuel);
  }
  return sum(fuels);
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const modules = await readInputLinesAsInts(filePath);

  return sum(modules.map((n) => calcFuelForModule(n)));
});
