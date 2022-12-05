import { readInputLines, run } from "../util";
import * as path from "path";

run(async function main() {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const originalWires: Record<string, string | number> = {};
  for (const line of lines) {
    const key = line.match(/-> ([a-z]+)/)?.[1] ?? "null";
    originalWires[key] = line.slice(0, line.indexOf(" ->"));
  }
  let wires = { ...originalWires };

  const findSignal = (key: string): number => {
    const value = wires[key];
    if (value === undefined) throw new Error(`can't find wire for key: ${key}`);

    if (typeof value === "number") {
      return value;
    } else if (/^[\d]+$/.test(value)) {
      const signal = +value;
      wires[key] = signal;
      return signal;
    } else if (/LSHIFT/.test(value)) {
      const [, wire, shift] = value.match(/([a-z]+) LSHIFT ([\d]+)/) ?? [];
      const signal = findSignal(wire) << +shift;
      wires[key] = signal;
      return signal;
    } else if (/RSHIFT/.test(value)) {
      const [, wire, shift] = value.match(/([a-z]+) RSHIFT ([\d]+)/) ?? [];
      const signal = findSignal(wire) >> +shift;
      wires[key] = signal;
      return signal;
    } else if (/AND/.test(value)) {
      const [, leftWire, rightWire] = value.match(/([a-z0-9]+) AND ([a-z0-9]+)/) ?? [];
      const left = isNaN(+leftWire) ? findSignal(leftWire) : +leftWire;
      const right = isNaN(+rightWire) ? findSignal(rightWire) : +rightWire;
      const signal = left & right;
      wires[key] = signal;
      return signal;
    } else if (/OR/.test(value)) {
      const [, leftWire, rightWire] = value.match(/([a-z0-9]+) OR ([a-z0-9]+)/) ?? [];
      const left = isNaN(+leftWire) ? findSignal(leftWire) : +leftWire;
      const right = isNaN(+rightWire) ? findSignal(rightWire) : +rightWire;
      const signal = left | right;
      wires[key] = signal;
      return signal;
    } else if (/NOT/.test(value)) {
      const [, wire] = value.match(/NOT ([a-z]+)/) ?? [];
      const signal = ~findSignal(wire);
      wires[key] = signal;
      return signal;
    } else {
      const signal = findSignal(value);
      wires[key] = signal;
      return signal;
    }
  };

  // console.log(JSON.stringify(wires, null, 2));

  const newB = findSignal("a");
  wires = { ...originalWires, b: newB };
  return findSignal("a");
});
