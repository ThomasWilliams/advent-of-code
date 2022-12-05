import { run } from "../util";
import md5 from "md5";

run(async function main() {
  const input = "bgvyzdsv";

  let num = 0;

  while (num < 100000000) {
    num++;
    const hash = md5(`${input}${num}`);
    if (/^00000/.test(hash)) {
      console.log(hash);
      return num;
    }
  }
  throw new Error("didn't work");
});
