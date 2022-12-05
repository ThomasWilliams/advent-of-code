from pathlib import Path
import re

p = Path(__file__).with_name("input")
with p.open("r") as file:
    data = file.read()

chunks = re.split("\n\n", data)

required_bits = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]


def validate_bits(bits):
    not_found = [bit for bit in required_bits if bit not in [b[0] for b in bits]]
    if len(not_found) > 0:
        return False
    for [k, v] in bits:
        if k == "byr" and not (1920 <= int(v) <= 2002):
            return False
        if k == "iyr" and not (2010 <= int(v) <= 2020):
            return False
        if k == "eyr" and not (2020 <= int(v) <= 2030):
            return False
        if k == "hgt":
            return False


count = 0
for chunk in chunks:
    bits = [bit.split(":") for bit in re.split("[\n\s]+", chunk)]


print(count)
