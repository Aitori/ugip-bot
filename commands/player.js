import Discord from 'discord.js';
import stats from '../collections/stats';
import users from '../collections/users';

module.exports = {
  name: 'player',
  description: 'Displays character information!',
  aliases: ['c', 'character', 'p', 'user'],
  usage: '[command]',
  categories: ['test'],
  guildOnly: true,
  cooldown: 0,
  async execute(message) {
    let user = users.get(message.author.id);
    let userStats = stats.getUserStats(message.author.id);
    // if user doesn't exist temp create a user, we change this later
    // this is temp till we make a create user
    if (!userStats) {
      await users.addMoney(message.author.id, 10);
      await stats.setStat(message.author.id, 10, 'maxHealth');
      userStats = stats.getUserStats(message.author.id);
      user = users.get(message.author.id);
    }
    // make embed message
    const embed = new Discord.MessageEmbed()
      .setColor('#B20000')
      .setAuthor('RPG Ugip                                                  Character Information!')
      .setTitle(`${user.title}${message.author.username}`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Health', value: `${userStats.health}/${userStats.maxHealth}` },
        { name: 'Mana', value: `${userStats.mana}/${userStats.maxMana}` }
      )
      .addFields(
        { name: 'Strength', value: `${userStats.strength}`, inline: true },
        { name: 'Dexterity', value: `${userStats.dexterity}`, inline: true },
        { name: 'Wisdom', value: `${userStats.wisdom}`, inline: true },
        { name: 'Agility', value: `${userStats.agility}`, inline: true },
        { name: 'Luck', value: `${userStats.luck}`, inline: true },
        { name: 'Willpower', value: `${userStats.willpower}`, inline: true }
      );
    message.channel.send(embed);
  },
};
