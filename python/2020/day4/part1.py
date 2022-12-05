from pathlib import Path
import re

p = Path(__file__).with_name("input")
with p.open("r") as file:
    data = file.read()

chunks = re.split("\n\n", data)

required_bits = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

count = 0
for chunk in chunks:
    bits = [bit.split(":")[0] for bit in re.split("[\n\s]+", chunk)]
    not_found = [bit for bit in required_bits if bit not in bits]
    if len(not_found) == 0:
        count += 1

print(count)
