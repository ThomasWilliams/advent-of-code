import { IPacket, BasePacket } from "./packet";

export class OperatorPacket extends BasePacket {
  public subPacketCount?: number;
  public subPacketLength?: number;
  public subPackets: IPacket[] = [];

  constructor(version: number, typeId: number, subPacketLengthOrCount: number, isNumberCount: boolean) {
    super(version, typeId);
    if (isNumberCount) {
      this.subPacketCount = subPacketLengthOrCount;
    } else {
      this.subPacketLength = subPacketLengthOrCount;
    }
  }

  addSubPacket(subPacket: IPacket) {
    this.subPackets.push(subPacket);
  }

  getVersionSum(): number {
    return this.version + this.subPackets.map((p) => p.getVersionSum()).reduce((a, b) => a + b);
  }

  getValue(): number {
    const values = this.subPackets.map((p) => p.getValue());
    switch (this.typeId) {
      case 0:
        return values.reduce((a, b) => a + b);
      case 1:
        return values.reduce((a, b) => a * b);
      case 2:
        return values.reduce((a, b) => Math.min(a, b), Number.POSITIVE_INFINITY);
      case 3:
        return values.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
      case 5:
        return values[0] > values[1] ? 1 : 0;
      case 6:
        return values[0] < values[1] ? 1 : 0;
      case 7:
        return values[0] === values[1] ? 1 : 0;
      default:
        return 0;
    }
  }
}
