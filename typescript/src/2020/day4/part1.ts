import * as path from "path";
import * as fs from "fs/promises";

async function main() {
  const fileHandle = await fs.open(path.resolve(__dirname, "input"), "r");
  const fileContents = await fileHandle.readFile({ encoding: "utf8" });
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const passports: Array<Record<string, unknown>> = fileContents
    .split(/[\n]{2,}/)
    .map((passportString) =>
      Object.fromEntries(passportString.split(/[\s]+/).map((fieldString) => fieldString.split(":")))
    );

  return passports.filter((passport) => requiredFields.every((field) => field in passport)).length;
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

// answer: 254
