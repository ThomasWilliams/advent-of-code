import { readInput, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  let input = await readInput(filePath);

  let length = 0;

  const re = /\(([\d]+)x([\d]+)\)/;

  while (re.test(input)) {
    const m = input.match(re);
    if (!m) break;
    const repLength = m[0].length;
    const span = parseInt(m[1]);
    const times = parseInt(m[2]);
    const index = m.index ?? 0;

    length += index + span * times;

    input = input.slice(index + repLength + span);
  }

  return length + input.length;
});
