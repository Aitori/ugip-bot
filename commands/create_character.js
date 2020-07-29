import Discord from 'discord.js';
import stats from '../collections/stats';
import users from '../collections/users';

module.exports = {
  name: 'createcharacter',
  description: 'Creates a character!',
  aliases: ['cp', 'createp'],
  usage: '[command]',
  cooldown: 0,
  async execute(message) {
    let user = users.get(message.author.id);
    let userStats = stats.get(message.author.id);
    // get collection to create user
    if (!userStats) {
      // give ten money on user creation
      await users.addMoney(message.author.id, 10);
      await stats.setStat(message.author.id, 10, 'maxHealth');
      userStats = stats.getUserStats(message.author.id);
      user = users.get(message.author.id);
      if (message.channel.type !== 'dm') message.reply('sent a character creation prompt to you!');
    } else {
      message.reply('you already have a character');
      return;
    }
    // make embed message
    const embed = new Discord.MessageEmbed()
      .setColor('#B40000')
      .setAuthor('RPG Ugip                                                  Character Creation!')
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
    await message.author.send(embed);
    message.author.send('Use `|addStat` to use your remaining stat points for upgrades!');
  },
};
