import { run, readInputLines } from "../../../util";
import * as path from "path";

class Particle {
  generation = 0;

  constructor(public x: number, public y: number, public dx: number, public dy: number) {}

  move() {
    this.x += this.dx;
    this.y += this.dy;
    this.generation++;
  }

  static fromLine(line: string): Particle {
    const [x, y, dx, dy] = (line.match(/(-?[\d]+)/g) ?? []).map((n) => parseInt(n));
    return new Particle(x, y, dx, dy);
  }
}

class Plot {
  private xMin = Number.POSITIVE_INFINITY;
  private xMax = Number.NEGATIVE_INFINITY;
  private yMin = Number.POSITIVE_INFINITY;
  private yMax = Number.NEGATIVE_INFINITY;
  private xRange;
  private yRange;
  private particles: Particle[];

  constructor(lines: string[]) {
    this.particles = lines.map((line) => {
      const particle = Particle.fromLine(line);
      this.xMin = Math.min(this.xMin, particle.x);
      this.xMax = Math.max(this.xMax, particle.x);
      this.yMin = Math.min(this.yMin, particle.y);
      this.yMax = Math.max(this.yMax, particle.y);
      return particle;
    });
    this.xRange = this.xMax - this.xMin;
    this.yRange = this.yMax - this.yMin;
  }

  toString(): string {
    return JSON.stringify(
      {
        xMin: this.xMin,
        xMax: this.xMax,
        yMin: this.yMin,
        yMax: this.yMax,
        xRange: this.xRange,
        yRange: this.yRange,
        particleCount: this.particles.length,
      },
      null,
      2
    );
  }

  // draw(): boolean[][] {
  //   const xDiff = 0 - this.xMin;
  //   const yDiff = 0 - this.yMin;
  //   for (let row = 0; row < this.xRange; row++) {
  //     for (let col = 0; col < this.yRange; col++) {

  //     }
  //   }
  //   return [];
  // }
}

run(async () => {
  const filePath = path.resolve(__dirname, "input");
  const lines = await readInputLines(filePath);

  const plot = new Plot(lines);

  console.log(plot.toString());
});
