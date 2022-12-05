import { readInputLines, run } from "../util";
import * as path from "path";

const permute = (input: string[]): string[][] => {
  const permutations: string[][] = [];

  const perm = (arr: string[], m: string[]) => {
    if (!arr.length) {
      permutations.push(m);
      return;
    }

    for (const i of arr.keys()) {
      const curr = arr.slice();
      const next = curr.splice(i, 1);
      perm(curr.slice(), m.concat(next));
    }
  };

  perm(input, []);

  return permutations;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const graph: Record<string, Record<string, number>> = {};

  for (const line of lines) {
    const [, key, gainOrLose, amt, adj] =
      line.match(/([A-Za-z]+) would (lose|gain) ([\d]+) happiness units by sitting next to ([A-Za-z]+)/) ?? [];
    if (!graph[key]) {
      graph[key] = {};
    }
    graph[key][adj] = parseInt(amt) * (gainOrLose === "lose" ? -1 : 1);
  }

  const getNetHappiness = (seat1: string, seat2: string): number => {
    return graph[seat1][seat2] + graph[seat2][seat1];
  };

  const seatings = permute(Object.keys(graph));

  let optimalSeating: { happiness: number; seating: string[] } = {
    happiness: Number.NEGATIVE_INFINITY,
    seating: [],
  };

  seatings.forEach((seating) => {
    const happiness = seating
      .map((seat, i) => getNetHappiness(seat, seating[(i + 1) % seating.length]))
      .reduce((a, b) => a + b);
    if (happiness > optimalSeating.happiness) {
      optimalSeating = { happiness, seating };
    }
  });

  const worstPairing = optimalSeating.seating.reduce((worst, seat, i, arr) => {
    const happiness = getNetHappiness(seat, arr[(i + 1) % arr.length]);
    return Math.min(happiness, worst);
  }, Number.POSITIVE_INFINITY);

  return optimalSeating.happiness - worstPairing;
});
