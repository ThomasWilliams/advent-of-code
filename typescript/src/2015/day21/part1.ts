/* eslint-disable no-constant-condition */
import { run } from "../../util";

class Player {
  static from([damage, armor]: number[]): Player {
    return new Player(damage, armor);
  }

  public hitPoints: number;

  constructor(public damage: number, public armor: number) {
    this.hitPoints = 100;
  }

  public takeHit(amount: number) {
    this.hitPoints -= Math.max(amount - this.armor, 1);
  }

  public isDead(): boolean {
    return this.hitPoints <= 0;
  }
}

const willWin = (me: Player, them: Player): boolean => {
  while (true) {
    them.takeHit(me.damage);
    if (them.isDead()) return true;

    me.takeHit(them.damage);
    if (me.isDead()) return false;
  }
};

run(async () => {
  const opponentStats = [8, 2];

  const options: number[][] = [];

  let possibleArmor = 0;
  while (true) {
    let possibleDamage = 0;
    while (!willWin(Player.from([possibleDamage, possibleArmor]), Player.from(opponentStats))) {
      possibleDamage++;
    }
    options.push([possibleDamage, possibleArmor]);
    if (possibleDamage === 0) {
      break;
    }
    possibleArmor++;
  }

  const damageCosts = [];

  console.log(options);
});
