// require filesystem to read in commands
const fs = require('fs');
// require discord for obvious reasons
const Discord = require('discord.js');
// require configuration
const { prefix, token } = require('./config.json');
// service imports
import checkCommand from './services/check_command';
import cooldownCheck from './services/cooldown';

// initialize important things
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

// read in files
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// client listener for ready
client.once('ready', async () => {
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
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

	const commandValid = checkCommand(command, message, args, prefix);
	if(commandValid != null) {
		message.reply(commandValid);
		return;
	}

	// check for cooldown of command
	if(!cooldownCheck(cooldowns, command, message)) return;
 
  // execute command!
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Oops ugip ugip!');
  }
});

client.login(token);
