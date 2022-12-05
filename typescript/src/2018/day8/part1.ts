import { run, readInput } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const nums = (await readInput(filePath)).split(/[\s]+/).map((n) => parseInt(n));

  let index = 0;
  const getMetadataSum = (): number => {
    const childCount = nums[index++];
    const metaCount = nums[index++];

    let metadataSum = 0;
    for (let i = 0; i < childCount; i++) {
      metadataSum += getMetadataSum();
    }

    for (let i = 0; i < metaCount; i++) {
      metadataSum += nums[index++];
    }

    return metadataSum;
  };

  return getMetadataSum();
});
