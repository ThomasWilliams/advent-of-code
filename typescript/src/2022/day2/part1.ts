import { readInput, readInputLines, run } from "../../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const scoreMe = (input: string) => input.charCodeAt(0) - 87;

  const scoreRound = ([opp, me]: string[]) => {
    switch (opp) {
      case "A":
        return me === "Y" ? 6 : me === "X" ? 3 : 0;
      case "B":
        return me === "Z" ? 6 : me === "Y" ? 3 : 0;
      case "C":
        return me === "X" ? 6 : me === "Z" ? 3 : 0;
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
