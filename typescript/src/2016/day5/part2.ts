import { run } from "../../util";
import md5 from "md5";

run(async function main() {
  const input = "uqwqemis";
  const passwordChars: { [k: string]: string } = {};
  let i = 1;

  while (Object.keys(passwordChars).length < 8) {
    const hash = md5(`${input}${i++}`);
    if (/^00000[0-7]/.test(hash)) {
      console.log(`found one at ${i}`);
      passwordChars[hash.charAt(5)] = hash.charAt(6);
    }
  }

  console.log(JSON.stringify(passwordChars));

  return Object.entries(passwordChars)
    .sort(([k1], [k2]) => parseInt(k1) - parseInt(k2))
    .map(([_, ch]) => ch)
    .join("");
});
