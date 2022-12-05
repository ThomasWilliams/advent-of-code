import { run } from "../../util";

run(async () => {
  const input = 409551;

  const scoreboard = [3, 7];
  let i = 0;
  let j = 1;

  while (scoreboard.length < input + 10) {
    const sum = scoreboard[i] + scoreboard[j];
    if (sum >= 10) {
      scoreboard.push(1);
      scoreboard.push(sum - 10);
    } else {
      scoreboard.push(sum);
    }

    i += 1 + scoreboard[i];
    i %= scoreboard.length;
    j += 1 + scoreboard[j];
    j %= scoreboard.length;
  }

  return scoreboard.slice(input, input + 10).join("");
});
