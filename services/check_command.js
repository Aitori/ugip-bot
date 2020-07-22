const checkCommand = (command, message, args, prefix) => {
  if (!command) return 'Command not found!';

  // if the command is server only and is text, exit
  if (command.guildOnly && message.channel.type !== 'text') {
    return "Can't use this here...";
  }

  // check if command is allowed to be use in channel
  if (command.guildOnly && command.channels && !command.channels.includes(message.channel.name)) {
    return `Can't use \`${command.name}\` in this channel!`;
  }

  // check if categroy is valid
  if (
    command.guildOnly &&
    command.categories &&
    !command.categories.includes(message.channel.parent.name)
  ) {
    return `Can't use \`${command.name}\` in this category!`;
  }

  // check for validity in roles
  if (
    command.guildOnly &&
    command.roles &&
    command.roles.filter((role) => {
      let found = false;
      message.member.roles.cache.forEach((v) => {
        if (v.name == role) found = true;
      });
      return found;
    }) == 0
  ) {
    return `Can't use \`${command.name}\` no permissions!`;
  }

  // check args
  if (command.args && command.channels) {
    // if args are not up to par
    let reply = `No arguments? ${message.author}`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return reply;
  }
  return null;
};

export default checkCommand;
