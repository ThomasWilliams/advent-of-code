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

  type Job = {
    step: string;
    doneAt: number;
  };

  const ready = [...allSteps.values()].filter((step) => !Object.keys(deps).includes(step));
  const inProgress: Job[] = [];
  const out: string[] = [];
  let t = 0;

  const jobFromStep = (step: string): Job => ({ step, doneAt: t + step.charCodeAt(0) - 4 });

  while (ready.length || inProgress.length) {
    const done: string[] = [];
    for (const [i, { step, doneAt }] of inProgress.entries()) {
      if (doneAt === t) {
        done.push(step);
        inProgress.splice(i, 1);
      }
    }

    while (done.length) {
      const doneStep = done.sort().shift() ?? "";
      out.push(doneStep);
      for (const [step, depArray] of Object.entries(deps)) {
        if (!depArray.length) {
          delete deps[step];
          continue;
        } else if (!depArray.includes(doneStep)) {
          continue;
        } else if (depArray.length === 1) {
          ready.push(step);
          delete deps[step];
        } else {
          deps[step] = depArray.filter((s) => s !== doneStep);
        }
      }
    }

    while (inProgress.length < 5 && ready.length) {
      const nextStep = ready.sort().shift() ?? "";
      inProgress.push(jobFromStep(nextStep));
    }

    t++;
  }

  return t - 1;
});
