import { run, readInputLinesAsInts } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");

  return (await readInputLinesAsInts(filePath)).map((n) => Math.floor(n / 3) - 2).reduce((a, b) => a + b);
});
