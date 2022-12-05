import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const ids: [number, number][] = fileContents
    .split("\n")[1]
    .replace(/x/g, "0")
    .split(",")
    .map((id, i): [number, number] => {
      const n = parseInt(id);
      if (n === 0) return [0, 0];
      let a = n - i;
      while (a < 0) a += n;
      return [n, a];
    })
    .filter(([id]) => Boolean(id))
    .sort((a, b) => b[0] - a[0]);

  console.log(ids);

  return ids.reduce(([n, a], [n0, a0]) => {
    console.log(n, a, "-", n0, a0);
    while (a % n0 !== a0) a += n;
    return [n * n0, a];
  })[1];
}

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });

// answer:
