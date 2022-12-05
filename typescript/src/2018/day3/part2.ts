import { readInputLines, run } from "../../util";
import * as path from "path";

type Section = {
  id: number;
  leftMargin: number;
  topMargin: number;
  width: number;
  height: number;
};

const doesOverlap = (secA: Section, secB: Section): boolean => {
  return (
    doesTopLeftOverlap(secA, secB) ||
    doesTopRightOverlap(secA, secB) ||
    doesBottomRightOverlap(secA, secB) ||
    doesBottomLeftOverlap(secA, secB)
  );
};

const doesTopLeftOverlap = (secA: Section, secB: Section): boolean =>
  secA.leftMargin < secB.leftMargin + secB.width && secA.topMargin < secB.topMargin + secB.height;

const doesTopRightOverlap = (secA: Section, secB: Section): boolean =>
  secA.leftMargin + secA.width > secB.leftMargin && secA.topMargin < secB.topMargin + secB.height;

const doesBottomLeftOverlap = (secA: Section, secB: Section): boolean =>
  secA.leftMargin < secB.leftMargin + secB.width && secA.topMargin + secA.height > secB.topMargin;

const doesBottomRightOverlap = (secA: Section, secB: Section): boolean =>
  secA.leftMargin + secA.width > secB.leftMargin && secA.topMargin + secA.height > secB.topMargin;

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  while (lines.length) {
    const line = lines.shift() ?? "";
    const [id, leftMargin, topMargin, width, height] = (line.match(/[\d]+/g) ?? []).map((n) => parseInt(n));
    const secA: Section = { id, leftMargin, topMargin, width, height };

    let foundDupe = false;
    for (const [i, line] of lines.entries()) {
      const [id, leftMargin, topMargin, width, height] = (line.match(/[\d]+/g) ?? []).map((n) => parseInt(n));
      const secB: Section = { id, leftMargin, topMargin, width, height };

      if (doesOverlap(secA, secB)) {
        console.log(`found overlap between ${secA.id} and ${secB.id}`);
        foundDupe = true;
        lines.splice(i, 1);
      }
    }

    if (!foundDupe) {
      return secA.id;
    }
  }
});
