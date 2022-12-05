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
    .map(({ name, sectorId }) => {
      const rotateBy = parseInt(sectorId) % 26;
      const newName = name
        .split("")
        .map((ch) => {
          if (ch === "-") return " ";
          const alphaIndex = ch.charCodeAt(0) - 97;
          const newIndex = (alphaIndex + rotateBy) % 26;
          return String.fromCharCode(newIndex + 97);
        })
        .join("");
      return `${newName} ${sectorId}`;
    })
    .find((s) => /northpole/i.test(s));
});
