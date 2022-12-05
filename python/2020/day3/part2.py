from pathlib import Path
import functools

p = Path(__file__).with_name("input")
with p.open("r") as file:
    lines = [line.strip() for line in file]

counts = []
for n in [1, 3, 5, 7]:
    x = 0
    count = 0
    for line in lines:
        if line[x] == "#":
            count += 1
        x = (x + n) % len(line)
    counts.append(count)

x = 0
count = 0
for line in lines[::2]:
    if line[x] == "#":
        count += 1
    x = (x + 1) % len(line)
counts.append(count)

prod = functools.reduce(lambda a, b: a * b, counts)

print(prod)
