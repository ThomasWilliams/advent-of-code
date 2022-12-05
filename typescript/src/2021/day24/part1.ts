import { readInputLines, run } from "../util";
import * as path from "path";

enum Operation {
  inp = "inp",
  add = "add",
  mul = "mul",
  div = "div",
  mod = "mod",
  eql = "eql",
}

enum Variable {
  w = "w",
  x = "x",
  y = "y",
  z = "z",
}

interface IInstruction {
  operation: Operation;
  variable: Variable;
}

interface InputInstruction extends IInstruction {
  operation: Operation.inp;
}

interface OperationInstruction extends IInstruction {
  operation: Exclude<Operation, Operation.inp>;
  operand: Variable | number;
}

type Instruction = InputInstruction | OperationInstruction;

type Process = Instruction[];

type Vector = {
  [k in keyof typeof Variable]: number;
};

const parseInstruction = (s: string): Instruction => {
  const match = s.match(/^(inp|add|mul|div|mod|eql) (w|x|y|z) ?(w|x|y|z|-?[\d]+)?$/);
  if (!match) throw new Error(`parsing error for ${s}`);

  const operation: Operation = match[1] as Operation;
  const variable: Variable = match[2] as Variable;
  if (operation === Operation.inp) {
    return { operation, variable };
  } else if (!match[3]) {
    throw new Error(`parsing error for ${s}`);
  } else if (!isNaN(parseInt(match[3]))) {
    return { operation, variable, operand: parseInt(match[3]) };
  } else {
    return { operation, variable, operand: match[3] as Variable };
  }
};

const isInputInstruction = (i: Instruction): i is InputInstruction => i.operation === Operation.inp;

function applyInstruction(vector: Vector, instruction: OperationInstruction): Vector;
function applyInstruction(vector: Vector, instruction: InputInstruction, input: number): Vector;
function applyInstruction(vector: Vector, instruction: Instruction, input?: number): Vector {
  if (isInputInstruction(instruction)) {
    return { ...vector, [instruction.variable]: input };
  }

  const { operation, variable, operand } = instruction;
  const op = typeof operand === "number" ? operand : vector[operand];
  switch (operation) {
    case "add":
      return { ...vector, [variable]: vector[variable] + op };
    case "mul":
      return { ...vector, [variable]: vector[variable] * op };
    case "div":
      return { ...vector, [variable]: (vector[variable] / op) >> 0 };
    case "mod":
      return { ...vector, [variable]: vector[variable] % op };
    case "eql":
      return { ...vector, [variable]: Number(vector[variable] === op) };
  }
  throw new Error(`instruction ${instruction} has unknown operation type`);
}

const applyProcess = (vector: Vector, process: Process, input: number): Vector => {
  return process.reduce(
    (v, instruction) =>
      instruction.operation === Operation.inp
        ? applyInstruction(v, instruction, input)
        : applyInstruction(v, instruction),
    vector
  );
};

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const instructions = (await readInputLines(filePath)).map((s) => parseInstruction(s));

  const processes: Process[] = [];

  for (const instruction of instructions) {
    if (instruction.operation === "inp") {
      processes.push([instruction]);
    } else {
      processes[processes.length - 1].push(instruction);
    }
  }

  const baseVector = { w: 0, x: 0, y: 0, z: 0 };

  for (const [i, process] of processes.entries()) {
    console.log(`============ process #${i + 1} ============`);
    for (let input = 1; input <= 9; input++) {
      for (let z = 0; z < 150; z++) {
        if (applyProcess({ ...baseVector, z }, process, input).z === 0) {
          console.log({ input, z });
        }
      }
    }
  }

  // for (let input = 1; input <= 9; input++) {
  //   for (let z = 0; z < 50; z++) {
  //     if (applyProcess({ ...baseVector, z }, processes[processes.length - 1], input).z === 0) {
  //       console.log({ input, z });
  //     }
  //   }
  // }

  // let largest = "";
  // const findLargest = (vector: Vector, model: string): boolean => {
  //   if (model.length >= processes.length) return false;

  //   for (let input = 9; input >= 1; input--) {
  //     const v = applyProcess(vector, processes[model.length], input);
  //     if (model.length < processes.length - 1) {
  //       if (findLargest(v, model + input)) {
  //         return true;
  //       }
  //     } else {
  //       // console.log(model + input);
  //       // console.log(v.z);
  //       if (v.z === 0) {
  //         largest = model + input;
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
  // };

  // findLargest(baseVector, "");

  // return largest;
});
