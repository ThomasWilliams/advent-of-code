import { readInput, run } from "../../util";
import * as path from "path";

const combineSteps = (first: string, second: string): string => {
  if (first === "n" && second === "sw") return "nw";
  if (first === "n" && second === "se") return "ne";
  if (first === "ne" && second === "nw") return "n";
  if (first === "ne" && second === "s") return "se";
  if (first === "se" && second === "n") return "ne";
  if (first === "se" && second === "sw") return "s";
  if (first === "s" && second === "ne") return "se";
  if (first === "s" && second === "nw") return "sw";
  if (first === "sw" && second === "se") return "s";
  if (first === "sw" && second === "n") return "nw";
  if (first === "nw" && second === "s") return "sw";
  if (first === "nw" && second === "ne") return "n";

  if (first === "n" && second === "s") return "";
  if (first === "ne" && second === "sw") return "";
  if (first === "nw" && second === "se") return "";
  if (first === "s" && second === "n") return "";
  if (first === "se" && second === "nw") return "";
  if (first === "sw" && second === "ne") return "";
  return first;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  let steps = (await readInput(filePath)).split(",");

  let didReduce = true;
  let loops = 0;
  while (didReduce) {
    console.log(steps.length);
    didReduce = false;
    const newSteps: string[] = [];
    let pos = 0;

    while (pos < steps.length) {
      const curr = steps[pos];
      const next = steps[pos + 1] ?? "";

      const combo = combineSteps(curr, next);
      if (combo !== curr) {
        didReduce = true;
        pos++;
      }
      if (combo) {
        newSteps.push(combo);
      }
      pos++;
    }

    steps = newSteps;
    loops++;
  }

  console.log(loops);

  return steps.length;
});
