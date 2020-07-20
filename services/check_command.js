const checkCommand = (command, message, args, prefix) => {
  if (!command) return 'Command not found!';

  // if the command is server only and is text, exit
  if (command.guildOnly && message.channel.type !== 'text') {
    return "I can't execute that command inside DMs!";
  }

  // if args are not up to par
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return reply;
  }
  return null;
};

export default checkCommand;

