import { run } from "../../util";
import md5 from "md5";

run(async () => {
  const salt = "ihaygndm";
  const countNeeded = 64;

  const getHash: (i: number) => string = (() => {
    const cache: string[] = [];

    return (index: number): string => {
      if (cache[index]) return cache[index];

      const hash = md5(`${salt}${index}`);

      cache[index] = hash;
      return hash;
    };
  })();

  const hasFiveInARow: (i: number, s: string) => boolean = (() => {
    const fiveInARowCache = new Map<string, string[]>();

    return (index: number, str: string): boolean => {
      const key = getHash(index);
      if (fiveInARowCache.has(key)) {
        return (fiveInARowCache.get(key) ?? []).includes(str);
      }

      const matchChars = [...key.matchAll(/(.)\1{4}/g)].map((m) => m[1]);

      fiveInARowCache.set(key, matchChars);
      return matchChars.includes(str);
    };
  })();

  const getThreeInARowChar = (hash: string): string | null => {
    for (let i = 0; i < hash.length - 2; i++) {
      const ch = hash.charAt(i);
      if (hash.charAt(i + 1) === ch && hash.charAt(i + 2) === ch) {
        return ch;
      }
    }
    return null;
  };

  const indexIsValid = (index: number): boolean => {
    const hash = getHash(index);
    const ch = getThreeInARowChar(hash);
    if (ch === null) return false;

    for (let j = index + 1; j <= index + 1000; j++) {
      if (hasFiveInARow(j, ch)) {
        return true;
      }
    }
    return false;
  };

  let i = -1;
  let validCount = 0;

  while (validCount < countNeeded) {
    if (i % 500 === 0) console.log(i);
    if (indexIsValid(++i)) validCount++;
  }

  return i;
});
