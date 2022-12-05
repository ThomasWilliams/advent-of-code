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
  const coord: [number, number] = [0, 0];
  let waypoint: [number, number] = [10, 1];
  const turnRight = ([x, y]: [number, number]): [number, number] => [y, -x];
  const turnLeft = ([x, y]: [number, number]): [number, number] => [-y, x];

  for await (const line of inputReader.lines) {
    const result = /([NSEWLRF])([\d]+)/.exec(line);
    if (!result) throw new Error("you fucked up!");

    const action = result[1];
    const value = parseInt(result[2]);

    if (action === "L" || action === "R") {
      const turns = value / 90;
      const turnFn = action === "R" ? turnRight : turnLeft;
      for (let i = 0; i < turns; i++) {
        waypoint = turnFn(waypoint);
      }
    }

    if (dirs.includes(action)) {
      const [x0, y0] = vectors[dirs.indexOf(action)].map((n) => n * value);
      waypoint[0] += x0;
      waypoint[1] += y0;
    }

    if (action === "F") {
      const [x0, y0] = waypoint.map((n) => n * value);
      coord[0] += x0;
      coord[1] += y0;
    }
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
