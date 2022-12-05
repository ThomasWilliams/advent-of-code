import { BasePacket } from "./packet";

export class LiteralPacket extends BasePacket {
  constructor(version: number, typeId: number, public value: number) {
    super(version, typeId);
  }

  getVersionSum(): number {
    return this.version;
  }

  getValue(): number {
    return this.value;
  }
}
