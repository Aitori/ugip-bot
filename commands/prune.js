module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	guildOnly: true,
	roles: ['Admin'],
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Invalid Number');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('1-99 Please!');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('ERR!');
		});
	},
};