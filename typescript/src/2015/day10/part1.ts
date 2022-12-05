import { run } from "../util";

const morph = (input: string): string => {
  const chars: Array<string | number> = [];
  let curr = "";
  let count = 0;
  for (const ch of input) {
    if (curr === ch) {
      count++;
    } else {
      if (count) {
        chars.push(count);
        chars.push(curr);
      }
      curr = ch;
      count = 1;
    }
  }
  chars.push(count);
  chars.push(curr);
  return chars.join("");
};

run(async function main() {
  let input = "1113222113";

  const times = 40;
  for (let i = 0; i < times; i++) {
    input = morph(input);
  }

  return input.length;
});
