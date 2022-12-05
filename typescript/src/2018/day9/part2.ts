import { run } from "../../util";

run(async () => {
  const playerCount = 465;
  const highestMarble = 7194000;

  const marbles: number[] = [0, 1];
  const scores = Array(playerCount).fill(0);

  let pointer = 1;

  const movePointer = (n: number) => {
    pointer += n;
    if (pointer < 0) pointer += marbles.length;
    if (pointer >= marbles.length) pointer -= marbles.length;
  };

  for (let i = 2; i <= highestMarble; i++) {
    if (i % 23 === 0) {
      movePointer(-7);
      const player = i % playerCount;
      scores[player] += i + marbles.splice(pointer, 1)[0];
      if (pointer === marbles.length) pointer = 0;
    } else {
      movePointer(2);
      marbles.splice(pointer, 0, i);
    }
  }

  return scores.reduce((a, b) => Math.max(a, b));
});
