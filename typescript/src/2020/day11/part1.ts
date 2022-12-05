import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  let seats: string[][] = fileContents.split("\n").map((row) => row.split(""));
  const adjOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let changed = true;
  while (changed) {
    changed = false;
    const next: string[][] = seats.map((row) => row.slice());

    for (const [row, seatRow] of seats.entries()) {
      for (const [col, seat] of seatRow.entries()) {
        if (seat === ".") continue;
        const adjOccupied: number = adjOffsets
          .map(([x, y]) => [row + x, col + y])
          .filter(([x, y]) => x >= 0 && x < seats.length && y >= 0 && y < seatRow.length && seats[x][y] === "#").length;
        if (seat === "L" && !adjOccupied) {
          changed = true;
          next[row][col] = "#";
        }
        if (seat === "#" && adjOccupied >= 4) {
          changed = true;
          next[row][col] = "L";
        }
      }
    }

    seats = next;
  }

  return seats.map((row) => row.filter((seat) => seat === "#").length).reduce((a, b) => a + b);
}

const printSeats = (seats: (string | number)[][]) => console.log(seats.map((row) => row.join(" ")).join("\n"));

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
