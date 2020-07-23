import Discord from 'discord.js';
import giveExperience from '../services/give_experience';
// basic mob class to extend off of
class Mob {
  constructor(name, health, attack, dexterity, willpower, agility, image, level) {
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.attack = attack;
    this.dexterity = dexterity;
    this.willpower = willpower;
    this.agility = agility;
    this.image = image;
    this.level = level;
  }
  // Math.floor(Math.random() * (Max - Min + 1)) + Min
  onAttacked(damage, userId, stats, users, message) {
    const returnDamage = Math.floor(Math.random() * 5) - 2;
    stats.subtractStat(userId, returnDamage, 'health');
    this.health -= damage;
    if (this.health <= 0) {
      this.onDeath(userId, users, message);
    }
  }
  // on death make
  onDeath(userId, users, message) {
    const giveExp = Math.floor((Math.random() * this.level) / 10) + this.level;
    const giveMoney = Math.floor((Math.random() * this.level) / 5) + this.level * 3;
    giveExperience(userId, giveExp, message);
    users.addMoney(userId, giveMoney);
  }

  displayEmbedMessage(channel) {
    const embed = new Discord.MessageEmbed()
      .setColor('#B40000')
      .setAuthor('RPG Ugip                                                  Mob!')
      .setTitle(this.name)
      .setImage(this.image)
      .addFields({ name: 'Health', value: `${this.health}/${this.maxHealth}` });
    this.message = channel.send(embed);
  }
}

export default Mob;
