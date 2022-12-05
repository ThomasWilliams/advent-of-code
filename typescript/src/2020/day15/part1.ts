const sample = [0, 3, 6];
const input = [13, 0, 10, 12, 1, 5, 8];

const getNthSpoken = (seed: number[], n: number): number => {
  const arr = seed.slice();
  const lastSpokenMap: Map<number, number[]> = new Map();

  const addToLastSpoken = (key: number, val: number): void => {
    const valArray = lastSpokenMap.get(key) || [];
    valArray.unshift(val);
    lastSpokenMap.set(key, valArray.slice(0, 2));
  };

  arr.forEach((n, i) => addToLastSpoken(n, i + 1));

  while (arr.length < n) {
    const i = arr.length;
    const lastNumber = arr[i - 1];
    const lastSpokenArray = lastSpokenMap.get(lastNumber) || [];
    const thisNumber = lastSpokenArray.length < 2 ? 0 : lastSpokenArray[0] - lastSpokenArray[1];
    arr.push(thisNumber);
    addToLastSpoken(thisNumber, i + 1);
  }

  return arr.pop() || 0;
};

async function main() {
  return getNthSpoken(input, 30000000);
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

// answer:
