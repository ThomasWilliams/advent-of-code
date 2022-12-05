import { readInput, run } from "../util";
import * as path from "path";

class Die {
  private rolls = 0;

  roll(): number {
    return ((++this.rolls - 1) % 100) + 1;
  }

  getRolls(): number {
    return this.rolls;
  }
}

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const [, pos1, , pos2] = input.match(/([\d])/g) ?? [];

  const positions = [parseInt(pos1), parseInt(pos2)];
  const scores = [0, 0];
  const die = new Die();

  const isWon = (): boolean => scores[0] >= 1000 || scores[1] >= 1000;

  let turn = 0;
  while (!isWon()) {
    const adv = Array(3)
      .fill(0)
      .map(() => die.roll())
      .reduce((a, b) => a + b);
    positions[turn] = ((positions[turn] + adv - 1) % 10) + 1;
    scores[turn] += positions[turn];
    turn = 1 - turn;
  }

  return Math.min(...scores) * die.getRolls();
});
