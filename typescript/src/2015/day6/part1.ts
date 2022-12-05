import { readInputLines, run } from "../util";
import * as path from "path";

enum InstructionType {
  TurnOn,
  TurnOff,
  Toggle,
}

type Instruction = {
  instructionType: InstructionType;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const grid = new Array(1000).fill(0).map((_) => new Array(1000).fill(false));

  const instructions: Instruction[] = lines.map((line) => parseInstruction(line));

  for (const { instructionType, xMin, xMax, yMin, yMax } of instructions) {
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        grid[x][y] =
          instructionType === InstructionType.TurnOn
            ? true
            : instructionType === InstructionType.TurnOff
            ? false
            : !grid[x][y];
      }
    }
  }

  return grid.map((row) => row.filter(Boolean).length).reduce((a, b) => a + b);
});

const parseInstruction = (line: string): Instruction => {
  const re = /(turn off|turn on|toggle) ([\d]{1,3}),([\d]{1,3}) through ([\d]{1,3}),([\d]{1,3})/g;
  const [, type, x1, y1, x2, y2] = [...line.matchAll(re)][0];
  return {
    instructionType: parseInstructionType(type),
    xMin: Math.min(parseInt(x1), parseInt(x2)),
    xMax: Math.max(parseInt(x1), parseInt(x2)),
    yMin: Math.min(parseInt(y1), parseInt(y2)),
    yMax: Math.max(parseInt(y1), parseInt(y2)),
  };
};

const parseInstructionType = (type: string): InstructionType => {
  switch (type) {
    case "turn on":
      return InstructionType.TurnOn;
    case "turn off":
      return InstructionType.TurnOff;
    case "toggle":
      return InstructionType.Toggle;
    default:
      throw new Error("boom");
  }
};
