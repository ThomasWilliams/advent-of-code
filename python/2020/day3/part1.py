from pathlib import Path

p = Path(__file__).with_name("input")
with p.open("r") as file:
    lines = [line.strip() for line in file]

x = 0
count = 0
for line in lines:
    if line[x] == "#":
        count += 1
    x = (x + 3) % len(line)

print(count)
