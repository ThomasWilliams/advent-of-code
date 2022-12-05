import { run, readInput } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInput(filePath);

  const digits = input.split("");
  const width = 25;
  const height = 6;
  const layerSize = width * height;
  const layerCount = digits.length / layerSize;

  const image: string[][] = [];

  const getColor = (index: number): string => {
    for (let bit = index; bit < digits.length; bit += layerSize) {
      if (digits[bit] === "2") continue;
      return digits[bit] === "0" ? "." : "#";
    }
    return "?";
  };

  for (let row = 0; row < height; row++) {
    image[row] = [];
    for (let col = 0; col < width; col++) {
      image[row][col] = getColor(row * width + col);
    }
  }

  image.forEach((row) => console.log(row.join("")));
});
