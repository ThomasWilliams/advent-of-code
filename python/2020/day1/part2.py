from pathlib import Path

p = Path(__file__).with_name("input")
with p.open("r") as file:
    nums = [int(line.strip()) for line in file]


def find_answer():
    for i, num1 in enumerate(nums):
        for j, num2 in enumerate(nums[i + 1 :]):
            for num3 in nums[j + 1 :]:
                if num1 + num2 + num3 == 2020:
                    return num1 * num2 * num3


print(find_answer())
