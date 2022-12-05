import { run } from "../util";

const sieve = (n: number): number[] => {
  const primesFound = Array(n).fill(true);
  for (let p = 2; p <= n; p++) {
    if (!primesFound[p]) continue;
    for (let q = p ** 2; q <= n; q += p) {
      primesFound[q] = false;
    }
  }
  return primesFound.map((bool, i) => (bool ? i : bool)).filter(Boolean);
};

const findCoprimes = (n: number): number[] => [...new Array(n + 1).keys()].filter((i) => i && n % 1 === 0);

const giftTotal = (house: number): number =>
  findCoprimes(house)
    .map((n) => n * 10)
    .reduce((a, b) => a + b);

run(async function main() {
  const input = 33100000;

  const target = giftTotal(input);
  console.log(target);

  // for (let house = 1; house <= input; house++) {
  //   if (giftTotal(house) === target) {
  //     return house;
  //   }
  // }
});
