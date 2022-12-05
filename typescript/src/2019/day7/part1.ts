import { run, readInput, permuteList } from "../../util";
import { runProgram } from "../day5/part2";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const program = (await readInput(filePath)).split(",").map((n) => parseInt(n));

  return permuteList([...Array(5).keys()])
    .map((seq) => {
      let output = 0;
      for (const phase of seq) {
        output = runProgram(program, [phase, output]).pop() ?? 0;
      }

      return output;
    })
    .reduce((a, b) => Math.max(a, b));
});
