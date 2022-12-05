import { run } from "../../util";
import md5 from "md5";

run(async function main() {
  const input = "uqwqemis";
  const passwordChars: string[] = [];
  let i = 1;

  while (passwordChars.length < 8) {
    const hash = md5(`${input}${i++}`);
    if (/^00000/.test(hash)) {
      passwordChars.push(hash.charAt(5));
    }
  }

  return passwordChars.join("");
});
