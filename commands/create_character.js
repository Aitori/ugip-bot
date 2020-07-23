import Discord from 'discord.js';
import stats from '../collections/stats';
import users from '../collections/users';

module.exports = {
  name: 'createcharacter',
  description: 'Creates a player',
  aliases: ['cp', 'createp'],
  usage: '[command]',
  cooldown: 0,
  async execute(message) {
    let user = users.get(message.author.id);
    let userStats = stats.getUserStats(message.author.id);
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
    let embedMsg = await message.author.send(embed);
    message.author.send(
      'For the next minute, you can type in the stats first letter to allocate point in that stat!'
    );

    const statAbbrev = {
      s: 'strength',
      d: 'dexterity',
      i: 'intelligence',
      a: 'agility',
      l: 'luck',
      w: 'willpower',
    };
    const filter = (m) => m.author.id === message.author.id;
    const collector = embedMsg.channel.createMessageCollector(filter, { time: 60000 });

    collector.on('collect', async (m) => {
      if (m.content.length === 1 && m.content in statAbbrev && userStats.unspentStatPoints > 0) {
        stats.addStat(message.author.id, 1, statAbbrev[m]);
        stats.subtractStat(message.author.id, 1, 'unspentStatPoints');
      } else if (userStats.unspentStatPoints <= 0) {
        message.author.send('You no longer have any unallocated stat points!');
      }
      const embedEdit = new Discord.MessageEmbed()
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
      await embedMsg.edit(embedEdit);
    });

    collector.on('end', () => {
      message.author.send(
        'Point allocation has ended! Use `insert command here` to allocate any points you have!'
      );
    });
  },
};
