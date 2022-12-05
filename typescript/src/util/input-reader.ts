import * as fs from "fs";
import * as readline from "readline";

export default class InputReader {
  private fileStream;

  constructor(private path: string) {
    this.fileStream = fs.createReadStream(path);
  }

  public get lines() {
    return readline.createInterface({
      input: this.fileStream,
      crlfDelay: Infinity,
    });
  }
}
