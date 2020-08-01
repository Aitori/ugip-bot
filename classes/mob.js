import Discord from 'discord.js';
import mobs from '../collections/mobs';
import giveExperience from '../services/give_experience';
import { UserItems } from '../db_models';
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
    ability,
    dropTable,
    money,
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
    this.ability = ability;
    this.dropTable = dropTable;
    this.money = money;
  }
  // Math.floor(Math.random() * (Max - Min + 1)) + Min
  async onAttacked(damage, userId, stats, users, message) {
    this.health -= damage;
    if (this.health <= 0) {
      this.onDeath(userId, users, message);
    } else {
      const returnDamage = Math.floor(Math.random() * 2) + 2;
      stats.subtractStat(userId, returnDamage, 'health');
      await this.displayEmbedMessage(message.channel);
      message.channel.send(
        `${message.author.username} did ${damage} damage to ${this.name}. ${this.name} attack back for ${returnDamage} damage!`
      );
      // on success return true
    }
  }
  // on death make
  async onDeath(userId, users, message) {
    const giveExp = Math.floor((Math.random() * this.experience) / 10) + this.experience;
    const giveMoney = Math.floor((Math.random() * this.money) / 5) + this.money * 3;
    giveExperience(userId, giveExp, message);
    users.addMoney(userId, giveMoney);

    // function to get drops
    const filteredDropTable = this.dropTable.filter((drop) => drop.dropId !== 0);
    const selector = Math.random();
    let accSum = 0;
    let index = 0;
    if (filteredDropTable.length > 0) {
      while (index < filteredDropTable.length && accSum < selector) {
        index++;
        accSum += filteredDropTable[index].chance;
      }
      const selectedItemId = filteredDropTable[index].dropId;
      await UserItems.create({ userId: message.author.id, itemId: selectedItemId });
    }

    message.channel.send(`${message.author.username} has defeated ${this.name}`);
    mobs.delete(this.name);
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
