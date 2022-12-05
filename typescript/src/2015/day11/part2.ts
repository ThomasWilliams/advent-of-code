import { run } from "../util";

const rotate = (input: string): string => {
  const chars = input.split("");
  for (let i = chars.length - 1; i >= 0; i--) {
    if (chars[i] === "z") {
      chars[i] = "a";
    } else {
      chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
      break;
    }
  }
  return chars.join("");
};

const isValid = (input: string): boolean => {
  if (/[iol]/.test(input)) return false;
  if (!/(.)\1.*(.)\2/.test(input)) return false;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 3; i <= alphabet.length; i++) {
    const run = alphabet.slice(i - 3, i);
    if (input.includes(run)) return true;
  }
  return false;
};

run(async function main() {
  let input = "hxbxwxba";

  let valid = false;
  while (!valid) {
    input = rotate(input);
    valid = isValid(input);
  }

  valid = false;
  while (!valid) {
    input = rotate(input);
    valid = isValid(input);
  }

  return input;
});
