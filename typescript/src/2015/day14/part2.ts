import { readInputLines, run } from "../util";
import * as path from "path";

type Reindeer = {
  speed: number;
  flyInterval: number;
  restInterval: number;
  position: number;
  score: number;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const reindeers: Reindeer[] = lines.map((line: string): Reindeer => {
    const [speed, flyInterval, restInterval] = (line.match(/([\d]+)[^\d]+([\d]+)[^\d]+([\d]+)/) ?? [])
      .slice(1, 4)
      .map((n) => parseInt(n));
    return { speed, flyInterval, restInterval, position: 0, score: 0 };
  });

  const DURATION = 2503;

  for (let t = 1; t <= DURATION; t++) {
    let max = 0;
    for (const reindeer of reindeers) {
      const { speed, flyInterval, restInterval } = reindeer;
      const cycleInterval = flyInterval + restInterval;
      const timeInCycle = t % cycleInterval;
      if (timeInCycle > 0 && timeInCycle <= flyInterval) {
        reindeer.position += speed;
      }

      if (reindeer.position > max) {
        max = reindeer.position;
      }
    }

    for (const reindeer of reindeers) {
      if (reindeer.position === max) {
        reindeer.score++;
      }
    }
  }

  return reindeers.map(({ score }) => score).reduce((a, b) => Math.max(a, b));
});
