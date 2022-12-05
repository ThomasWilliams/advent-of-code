import { run } from "../../util";

run(async () => {
  const input = 3014387;
  const elves = new Set([...new Array(input).keys()].map((n) => n + 1));

  let take = false;
  while (elves.size > 1) {
    for (const elf of elves) {
      if (take) {
        elves.delete(elf);
      }
      take = !take;
    }
  }

  return [...elves.values()][0];
});
