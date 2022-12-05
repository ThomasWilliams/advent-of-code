import { run } from "../../util";

run(async () => {
  const serialNumber = 18;

  const getKey = (...args: number[]): string => args.join(",");

  const getHundreds = (n: number): number => Math.floor(n / 100) % 10;

  const getCellPower = ((): ((x: number, y: number) => number) => {
    const cellPowers = new Map<string, number>();
    return (x: number, y: number): number => {
      const key = getKey(x, y);
      if (cellPowers.has(key)) {
        return cellPowers.get(key) ?? 0;
      }

      const rackId = x + 10;
      const power = getHundreds((rackId * y + serialNumber) * rackId) - 5;

      cellPowers.set(key, power);
      return power;
    };
  })();

  let maxBlockKey = "";
  let maxBlockPower = Number.NEGATIVE_INFINITY;

  for (let size = 1; size <= 300; size++) {
    for (let x = 1; x <= 301 - size; x++) {
      for (let y = 1; y <= 301 - size; y++) {
        let blockPower = 0;
        for (let dx = 0; dx < size; dx++) {
          for (let dy = 0; dy < size; dy++) {
            blockPower += getCellPower(x + dx, y + dy);
          }
        }

        if (blockPower > maxBlockPower) {
          maxBlockPower = blockPower;
          maxBlockKey = getKey(x, y, size);
        }
      }
    }
  }

  return maxBlockKey;
});
