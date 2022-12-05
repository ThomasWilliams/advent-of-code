import { run } from "../../util";

class Node {
  constructor(private _value: number, private _next: Node | null = null) {}

  get next(): Node | null {
    return this._next;
  }

  set next(node: Node | null) {
    this._next = node;
  }

  get value(): number {
    return this._value;
  }
}

run(async function main() {
  const cycle = 349;
  const steps = 50000000;

  let pointer = new Node(0);
  pointer.next = pointer;

  const dummy = new Node(0);

  for (let step = 1; step <= steps; step++) {
    for (let i = 0; i < cycle; i++) {
      pointer = pointer.next ?? dummy;
    }

    const insert: Node = new Node(step, pointer.next);
    pointer.next = insert;
    pointer = insert;
  }

  while (pointer?.next?.value !== 0) {
    pointer = pointer.next ?? dummy;
  }

  return pointer?.next?.value;
});
