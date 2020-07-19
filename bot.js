const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const { Op } = require('sequelize');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const Currency = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', async () => {
  const storedBalances = await Users.findAll();
  storedBalances.forEach(b => Currency.set(b.user_id, b));
  console.log('Ready!');
});

const { Users, CurrencyShop } = require('./db_objects');

Reflect.defineProperty(Currency, 'add', {
	value: async function add(id, amount) {
		const user = Currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		Currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(Currency, 'getBalance', {
	value: function getBalance(id) {
		const user = Currency.get(id);
		return user ? user.balance : 0;
	},
});

client.on('message', async message => {
  if (message.author.bot) return;

  Currency.add(message.author.id, 1);

  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  //if (!command) return;

  // if (command.guildOnly && message.channel.type !== 'text') {
  //   return message.reply('I can\'t execute that command inside DMs!');
  // }

  // if (command.args && !args.length) {
  //   let reply = `You didn't provide any arguments, ${message.author}!`;

  //   if (command.usage) {
  //     reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
  //   }

  //   return message.channel.send(reply);
  // }
  //HERE
  console.log(commandName);
	if (commandName === 'balance') {
    const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${Currency.getBalance(target.id)}💰`);
	} else if (commandName === 'inventory') {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(t => `${t.amount} ${t.item.name}`).join(', ')}`);
	} else if (commandName === 'transfer') {
		const currentAmount = Currency.getBalance(message.author.id);
		const transferAmount = args.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author} you don't have that much.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}`);

		Currency.add(message.author.id, -transferAmount);
		Currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${Currency.getBalance(message.author.id)}💰`);
	} else if (commandName === 'buy') {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: args } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > Currency.getBalance(message.author.id)) {
			return message.channel.send(`You don't have enough currency, ${message.author}`);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		Currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought a ${item.name}`);
	} else if (commandName === 'shop') {
		const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(i => `${i.name}: ${i.cost}💰`).join('\n'), { code: true });
	} else if (commandName === 'leaderboard') {
		return message.channel.send(
			Currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.cache.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true }
		);
  }
  //HERE
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(token);

exports.main = {

}