// basic mob class to extend off of
class Mob {
  constructor(health, attack, dexterity, willpower, agility, image, level, channel) {
    this.health = health;
    this.attack = attack;
    this.dexterity = dexterity;
    this.willpower = willpower;
    this.agility = agility;
    this.image = image;
    this.level = level;
    this.channel = channel;
  }
  // Math.floor(Math.random() * (Max - Min + 1)) + Min
  onAttacked(damage, userId, stats, users, message) {
    const returnDamage = Math.floor(Math.random() * 5) - 2;
    stats.subtractStat(userId, returnDamage, 'health');
    this.health -= damage;
    if(this.health <= 0) {
      this.onDeath(userId, users, message);
    }
  }
  // on death make
  onDeath(userId, users, message) {
    const giveExp = Math.floor(Math.random() * this.level / 10) + this.level
    users.addExperience(userId, giveExp, message);
  }
}

export default Mob;