import re
from pathlib import Path

p = Path(__file__).with_name("input")
with p.open("r") as file:
    lines = [re.match("(\d+)-(\d+) (\w): (\w+)", line).groups() for line in file]

count = 0
for line in lines:
    (first, second, ch, s) = line
    try:
        if (s[int(first) - 1] == ch) != (s[int(second) - 1] == ch):
            count += 1
    except:
        pass

print(count)
