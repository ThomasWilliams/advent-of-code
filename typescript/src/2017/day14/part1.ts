import { run } from "../../util";
import { generateKnotHash } from "../day10/part2";

run(async function main() {
  const input = "wenycdww";

  return [...Array(128).keys()]
    .map(
      (i) =>
        generateKnotHash(`${input}-${i}`)
          .split("")
          .map((n) => parseInt(n, 16).toString(2).padStart(4, "0"))
          .join("")
          .split("")
          .filter((n) => n === "1").length
    )
    .reduce((a, b) => a + b);
});
