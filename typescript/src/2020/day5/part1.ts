import * as path from "path";
import InputReader from "../input-reader";

async function main() {
  const inputReader = new InputReader(path.resolve(__dirname, "input"));

  let maxSeatId = 0;

  for await (const line of inputReader.lines) {
    const row = parseInt(line.slice(0, 7).replace(/B/g, "1").replace(/F/g, "0"), 2);
    const col = parseInt(line.slice(7).replace(/R/g, "1").replace(/L/g, "0"), 2);
    const seatId = row * 8 + col;
    maxSeatId = Math.max(maxSeatId, seatId);
  }

  return maxSeatId;
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

// answer: 963
