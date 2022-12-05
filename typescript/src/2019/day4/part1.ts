import { run } from "../../util";

run(async () => {
  const min = 156218;
  const max = 652527;

  let count = 0;

  for (let num = min; num <= max; num++) {
    const digits = `${num}`.split("").map((n) => parseInt(n));

    const hasDupe = digits.some((d, i, arr) => d === arr[i + 1]);
    if (!hasDupe) continue;

    const hasDecrease = digits.every((d, i, arr) => arr[i + 1] < d);
    if (hasDecrease) continue;

    count++;
  }

  return count;
});
