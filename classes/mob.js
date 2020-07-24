import Discord from 'discord.js';
import giveExperience from '../services/give_experience';
// basic mob class to extend off of
class Mob {
  constructor({
    name,
    health,
    maxHealth,
    strength,
    dexterity,
    intelligence,
    luck,
    willpower,
    agility,
    image,
    level,
    experience,
  } = {}) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.health = health;
    this.strength = strength;
    this.dexterity = dexterity;
    this.willpower = willpower;
    this.agility = agility;
    this.image = image;
    this.level = level;
    this.experience = experience;
    this.luck = luck;
    this.intelligence = intelligence;
  }
  // Math.floor(Math.random() * (Max - Min + 1)) + Min
  onAttacked(damage, userId, stats, users, message) {
    const returnDamage = Math.floor(Math.random() * 2) - 2;
    stats.subtractStat(userId, returnDamage, 'health');
    this.health -= damage;
    if (this.health <= 0) {
      this.onDeath(userId, users, message);
    } else {
      this.displayEmbedMessage(message.channel);
    }
  }
  // on death make
  onDeath(userId, users, message) {
    const giveExp = Math.floor((Math.random() * this.experience) / 10) + this.experience;
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
