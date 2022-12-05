import { run, readInput } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const nums = (await readInput(filePath)).split(/[\s]+/).map((n) => parseInt(n));

  let index = 0;
  const getMetadataSum = (): number => {
    const childCount = nums[index++];
    const metaCount = nums[index++];

    const childValues: number[] = [];
    const metaValues: number[] = [];

    for (let i = 0; i < childCount; i++) {
      childValues.push(getMetadataSum());
    }

    for (let i = 0; i < metaCount; i++) {
      metaValues.push(nums[index++]);
    }

    if (childCount === 0) {
      return metaValues.reduce((a, b) => a + b);
    } else {
      return metaValues.map((i) => childValues[i - 1] ?? 0).reduce((a, b) => a + b);
    }
  };

  return getMetadataSum();
});
