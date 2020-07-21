import Discord from 'discord.js';

module.exports = {
  name: 'character',
  description: 'Displays character information!',
  cooldown: 0,
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(message.author.username)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
    message.channel.send(embed);
  },
};
