import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));

  const availableSeats = Array(1024).fill(true);

  for await (const line of inputReader.lines) {
    const row = parseInt(line.slice(0, 7).replace(/B/g, "1").replace(/F/g, "0"), 2);
    const col = parseInt(line.slice(7).replace(/R/g, "1").replace(/L/g, "0"), 2);
    const seatId = row * 8 + col;
    availableSeats[seatId] = false;
  }

  for (const i of availableSeats.keys()) {
    if (i === 0) continue;
    if (availableSeats[i] && !availableSeats[i - 1]) return i;
  }

  console.log("you fucked up!");
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

// answer: 592
