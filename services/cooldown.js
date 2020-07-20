import Discord from 'discord.js';

const cooldowns = new Discord.Collection();

const cooldownCheck = (command, message) => {
  // if cooldown dictionary doesn't exist
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  // set up cooldown variables
  const now = Date.now();
  const defaultCooldown = 1;
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || defaultCooldown) * 1000;

  // cooldown logic
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      message.reply(
        `Please wait ${timeLeft.toFixed(1)} before trying the \`${
          command.name
        }\` command.`
      );
      return false;
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  return true;
};

export default cooldownCheck;
