import { run, readInput } from "../../util";
import * as path from "path";
import { IntcodeComputer } from "../util/intcode-computer";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const data = (await readInput(filePath)).split(",").map((n) => parseInt(n));

  const program = new IntcodeComputer(data);

  return program.run([1]);
});
