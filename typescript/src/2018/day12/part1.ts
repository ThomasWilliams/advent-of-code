import { run, readInputLines } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  const plants: boolean[] = input[0]
    .split(": ")[1]
    .split("")
    .map((s) => s === "#");

  const rules = input.slice(2);
});
