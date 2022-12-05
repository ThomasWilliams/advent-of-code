import { run } from "../../util";

run(async () => {
  const input = 51589;

  const scoreboard = [3, 7];
  const indices = [0, 1];
  let answer = -1;

  const move = () => {
    for (let i = 0; i < indices.length; i++) {
      indices[i] += 1 + scoreboard[indices[i]];
      indices[i] %= scoreboard.length;
    }
  };

  const check = () => {
    const inputString = input.toString();

    for (let i = scoreboard.length - (inputString.length + 3); i < scoreboard.length - inputString.length; i++) {
      if (scoreboard.slice(i, i + inputString.length).join("") === inputString) {
        return i;
      }
    }
    return -1;
  };

  while (answer < 0) {
    const [i, j] = indices;
    const sum = scoreboard[i] + scoreboard[j];
    if (sum >= 10) {
      scoreboard.push(1);
      scoreboard.push(sum - 10);
    } else {
      scoreboard.push(sum);
    }

    move();
    answer = check();
  }

  return answer;
});
