import re
from pathlib import Path

p = Path(__file__).with_name("input")
with p.open("r") as file:
    lines = [re.match("(\d+)-(\d+) (\w): (\w+)", line).groups() for line in file]

count = 0
for line in lines:
    (minCount, maxCount, ch, s) = line
    if int(minCount) <= s.count(ch) <= int(maxCount):
        count += 1

print(count)
