import { readInputLines, run } from "../../util";
import * as path from "path";

const getLetterCounts = (name: string): { [k: string]: number } =>
  name
    .split("")
    .filter((ch) => ch !== "-")
    .reduce((counts, ch) => ({ ...counts, [ch]: (counts[ch] || 0) + 1 }), {} as { [k: string]: number });

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  return lines
    .map((line) => {
      const [, name, sectorId, checksum] = line.match(/([a-z-]+)-([\d]+)\[([a-z]+)\]/) ?? [];
      return { name, sectorId, checksum };
    })
    .filter(
      ({ name, checksum }) =>
        Object.entries(getLetterCounts(name))
          .sort(([ch1, count1], [ch2, count2]) => {
            if (count1 !== count2) return count2 - count1;
            return ch1.charCodeAt(0) - ch2.charCodeAt(0);
          })
          .map(([ch]) => ch)
          .slice(0, 5)
          .join("") === checksum
    )
    .map(({ sectorId }) => parseInt(sectorId))
    .reduce((a, b) => a + b);
});
