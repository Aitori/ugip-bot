import Discord from 'discord.js';
import stats from '../collections/stats';
import users from '../collections/users';

module.exports = {
  name: 'player',
  description: 'Displays character information!',
  aliases: ['c', 'character', 'p', 'user'],
  usage: '',
  charRequired: true,
  cooldown: 0,
  async execute(message) {
    let user = users.get(message.author.id);
    let userStats = stats.getUserStats(message.author.id);
    if (!user || !userStats) {
      message.reply('You have not created a user yet; use `|createcharacter');
    }
    // make embed message
    const embed = new Discord.MessageEmbed()
      .setColor('#B20000')
      .setAuthor('RPG Ugip                                                  Character Information!')
      .setTitle(`${user.title}${message.author.username}`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Health', value: `${userStats.health}/${userStats.maxHealth}` },
        { name: 'Mana', value: `${userStats.mana}/${userStats.maxMana}` },
        {
          name: 'Class',
          value: `${user.class.length === 0 ? 'No Class' : user.class}`,
          inline: true,
        },
        { name: 'Stat Points Remaining', value: `${userStats.unspentStatPoints}`, inline: true },
        { name: '\u200B', value: '\u200B', inline: true }
      )
      .addFields(
        { name: 'Strength', value: `${userStats.strength}`, inline: true },
        { name: 'Dexterity', value: `${userStats.dexterity}`, inline: true },
        { name: 'Intelligence', value: `${userStats.intelligence}`, inline: true },
        { name: 'Agility', value: `${userStats.agility}`, inline: true },
        { name: 'Luck', value: `${userStats.luck}`, inline: true },
        { name: 'Willpower', value: `${userStats.willpower}`, inline: true }
      );
    message.channel.send(embed);
  },
};
