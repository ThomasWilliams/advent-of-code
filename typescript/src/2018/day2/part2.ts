import { readInputLines, run } from "../../util";
import * as path from "path";

const compare = (line1: string, line2: string): number => {
  if (line1.length !== line2.length) {
    return -1;
  }

  const different: number[] = [];
  for (let i = 0; i < line1.length; i++) {
    if (line1.charAt(i) !== line2.charAt(i)) {
      different.push(i);
    }
  }
  return different.length === 1 ? different[0] : -1;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  while (lines.length) {
    const line1 = lines.shift() ?? "";
    for (const line2 of lines) {
      const diff = compare(line1, line2);
      if (diff >= 0) {
        return line1
          .split("")
          .filter((_, i) => i !== diff)
          .join("");
      }
    }
  }
});
