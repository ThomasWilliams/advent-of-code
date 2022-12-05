import { run, readInput } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const tileInputs = input.split(/[\n]{2}/);
});
