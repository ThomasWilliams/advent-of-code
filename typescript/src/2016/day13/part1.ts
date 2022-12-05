import { run } from "../../util";

run(async () => {
  const input = 1362;

  const getBits = (n: number): number => n.toString(2).split("").filter(Boolean).length;

  const getWallChecker = () => {
    const cache = new Map<string, boolean>();
    const getKey = (x: number, y: number) => `${x},${y}`;

    return (x: number, y: number): boolean => {
      const key = getKey(x, y);
      if (cache.has(key)) {
        return cache.get(key) ?? false;
      }

      const bits = getBits(x * x + 3 * x + 2 * x * y + y + y * y + input);
      return Boolean(bits % 2);
    };
  };

  const isWall = getWallChecker();
});
