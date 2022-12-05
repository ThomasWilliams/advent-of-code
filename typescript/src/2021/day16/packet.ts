export interface IPacket {
  version: number;
  typeId: number;
  getVersionSum: () => number;
  getValue: () => number;
}

export abstract class BasePacket implements IPacket {
  constructor(public version: number, public typeId: number) {}

  abstract getVersionSum(): number;

  abstract getValue(): number;
}
