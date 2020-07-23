'use strict';
// require discord for obvious reasons
import Discord from 'discord.js';
// require configuration
import { prefix, token } from './config.json';
// service imports
import checkCommand from './services/check_command';
import checkCooldown from './collections/cooldown';
// collection imports
import commands from './collections/commands';

import users from './collections/users';
import stats from './collections/stats';
import { Users, Stats } from './db_models';

// initialize important things
const client = new Discord.Client();

// client listener for ready
client.once('ready', async () => {
  const storedUsers = await Users.findAll();
  const storedStats = await Stats.findAll();
  storedUsers.forEach((e) => users.set(e.id, e));
  storedStats.forEach((e) => stats.set(e.userId, e));
  console.log('Ugip Ugip Lets Roll!');
});


// on message listener
client.on('message', async (message) => {
  let currChannel = message.guild.channels.cache.find((channel) => channel.name === 'mobtest');
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
