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
  const layers: number[][] = [];

  for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
    const layer = [0, 0, 0];
    for (let i = layerIndex * layerSize; i < (layerIndex + 1) * layerSize; i++) {
      layer[parseInt(digits[i])]++;
    }
    layers.push(layer);
  }

  const minLayer = layers.reduce((min, next) => (next[0] < min[0] ? next : min));
  return minLayer[1] * minLayer[2];
});
