import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });

  const passports: Array<Record<string, string>> = fileContents
    .split(/[\n]{2,}/)
    .map((passportString) =>
      Object.fromEntries(passportString.split(/[\s]+/).map((fieldString) => fieldString.split(":")))
    );

  return passports.filter(validatePassport).length;
}

function validatePassport(passport: Record<string, string>): boolean {
  const validators: Record<string, RegExp> = {
    byr: /^(19[2-9][0-9]|200[0-2])$/,
    iyr: /^20(1[0-9]|20)$/,
    eyr: /^20(2[0-9]|30)$/,
    hgt: /^(1([5-8][0-9]|9[0-3])cm|(59|6[0-9]|7[0-6])in)$/,
    hcl: /^#[0-9a-f]{6}$/,
    ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
    pid: /^[0-9]{9}$/,
  };

  for (const [field, validator] of Object.entries(validators)) {
    if (!validator.test(passport[field])) {
      return false;
    }
  }
  return true;
}

main()
  .then((num) => {
    console.log(`answer: ${num}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(`ERROR!`, e);
    process.exit(1);
  });

// answer: 184
