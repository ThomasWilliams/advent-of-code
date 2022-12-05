import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const molecule = lines.pop() ?? "";
  const nextGenMolecules = new Set<string>();

  console.log(molecule);

  const replacementRegex = /^([\w]+) => ([\w]+)$/;
  for (const line of lines) {
    if (!line || !replacementRegex.test(line)) continue;

    const [, from, to] = line.match(replacementRegex) ?? [];
    if (!from || !to) continue;

    for (const { index } of molecule.matchAll(new RegExp(from, "g"))) {
      nextGenMolecules.add(molecule.slice(0, index) + molecule.slice(index).replace(from, to));
    }
  }

  return nextGenMolecules.size;
});
