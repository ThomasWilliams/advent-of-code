import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const scoreMe = (input: string) => (input === "X" ? 0 : input === "Y" ? 3 : 6);

  const scoreRound = ([opp, me]: string[]) => {
    switch (opp) {
      case "A":
        return me === "Y" ? 1 : me === "X" ? 3 : 2;
      case "B":
        return me === "Z" ? 3 : me === "Y" ? 2 : 1;
      case "C":
        return me === "X" ? 2 : me === "Z" ? 1 : 3;
      default:
        return 0;
    }
  };

  return lines
    .map((line) => {
      const [opp, me] = line.split(" ");
      return scoreMe(me) + scoreRound([opp, me]);
    })
    .reduce((a, b) => a + b);
});
