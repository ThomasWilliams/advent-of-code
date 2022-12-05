import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));

  const dirs = ["E", "S", "W", "N"];
  const vectors = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];
  let currentDir = 0;
  const coord = [0, 0];

  for await (const line of inputReader.lines) {
    const result = /([NSEWLRF])([\d]+)/.exec(line);
    if (!result) throw new Error("you fucked up!");

    const action = result[1];
    const value = parseInt(result[2]);

    if (action === "L" || action === "R") {
      const turn = (value / 90) * (action === "L" ? -1 : 1);
      currentDir = (currentDir + turn + dirs.length) % dirs.length;
      continue;
    }

    const vectorIndex = action === "F" ? currentDir : dirs.indexOf(action);
    const [x0, y0] = vectors[vectorIndex].map((n) => n * value);
    coord[0] += x0;
    coord[1] += y0;
  }

  return Math.abs(coord[0]) + Math.abs(coord[1]);
}

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });
