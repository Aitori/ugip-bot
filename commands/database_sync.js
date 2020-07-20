import sequelize from '../db_sq';

module.exports = {
	name: 'databasesync',
	description: 'Syncs the database',
	cooldown: 5,
	async execute(message) {
    try {
      await sequelize.sync({force: true});
      message.channel.send('Synced!');
    }
    catch (error) {
      message.channel.send('Sync failed :( -- ' + error);
    }
	},
};