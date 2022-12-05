import { run, readInputLines } from "../../util";
import * as path from "path";

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const input = await readInputLines(filePath);

  const deps: { [k: string]: string[] } = {};
  const allSteps = new Set<string>();

  for (const line of input) {
    const steps = (line.match(/ ([A-Z]) /g) ?? []).map((s) => s.trim()).reverse();
    steps.forEach((step) => allSteps.add(step));

    if (!deps[steps[0]]) {
      deps[steps[0]] = [];
    }

    deps[steps[0]].push(steps[1]);
  }

  const queue = [...allSteps.values()].filter((step) => !Object.keys(deps).includes(step));
  const out: string[] = [];

  while (queue.length) {
    const nextStep = queue.sort().shift() ?? "";

    out.push(nextStep);
    for (const [step, depArray] of Object.entries(deps)) {
      if (!depArray.length) {
        delete deps[step];
        continue;
      } else if (!depArray.includes(nextStep)) {
        continue;
      } else if (depArray.length === 1) {
        queue.push(step);
        delete deps[step];
      } else {
        deps[step] = depArray.filter((s) => s !== nextStep);
      }
    }
  }

  return out.join("");
});
