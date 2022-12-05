from pathlib import Path

p = Path(__file__).with_name("input")
with p.open("r") as file:
    nums = [int(line.strip()) for line in file]


def find_answer():
    for i, num1 in enumerate(nums):
        for num2 in nums[i + 1 :]:
            if num1 + num2 == 2020:
                return num1 * num2


print(find_answer())
