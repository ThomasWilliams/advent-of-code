import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  let seats: string[][] = fileContents.split("\n").map((row) => row.split(""));
  const vectors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const coordIsValid = ([x, y]: [number, number]): boolean =>
    x >= 0 && x < seats.length && y >= 0 && y < seats[0].length;

  let changed = true;
  while (changed) {
    changed = false;
    const next: string[][] = seats.map((row) => row.slice());

    for (const [row, seatRow] of seats.entries()) {
      for (const [col, seat] of seatRow.entries()) {
        if (seat === ".") continue;
        const adjOccupied = vectors
          .map(([x0, y0]) => {
            let [x, y] = [row + x0, col + y0];
            while (coordIsValid([x, y])) {
              const seat = seats[x][y];
              if (seat === "#") return true;
              if (seat === "L") return false;
              x += x0;
              y += y0;
            }
            return false;
          })
          .filter(Boolean).length;
        // const adjOccupied: number = adjOffsets
        //   .map(([x, y]) => [row + x, col + y])
        //   .filter(([x, y]) => x >= 0 && x < seats.length && y >= 0 && y < seatRow.length && seats[x][y] === "#").length;
        if (seat === "L" && !adjOccupied) {
          changed = true;
          next[row][col] = "#";
        }
        if (seat === "#" && adjOccupied >= 5) {
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
