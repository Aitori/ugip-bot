// require discord for obvious reasons
import Discord from 'discord.js';
// require configuration
import { prefix, token } from './config.json';
// service imports
import checkCommand from './services/check_command';
import checkCooldown from './collections/cooldown';

import users from './collections/users';
import stats from './collections/stats';

import { Users } from './db_models';
import commands from './collections/commands';
// initialize important things
const client = new Discord.Client();

// client listener for ready
client.once('ready', async () => {
  const storedUsers = await Users.findAll();
  storedUsers.forEach((user) => users.set(user.id, user));

  console.log('Ready!');
});

// on message listener
client.on('message', async (message) => {
  // if the message was by bot or isn't a command, exit
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // parse the message string
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    commands.get(commandName) ||
    commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  const commandValid = checkCommand(command, message, args, prefix);
  if (commandValid != null) {
    message.reply(commandValid);
    return;
  }

  // check for cooldown of command
  if (!checkCooldown(command, message)) return;

  // execute command!
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Oops ugip ugip!');
  }
});

client.login(token);
