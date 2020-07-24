import users from '../collections/users';
import stats from '../collections/stats';
import mobs from '../collections/mobs';

module.exports = {
  name: 'attack',
  description: 'Attacks a certain mob as your character!',
  aliases: ['a'],
  usage: '[command mobName]',
  charRequired: true,
  guildOnly: true,
  args: true,
  async execute(message, args) {
    const user = users.get(message.author.id);
    if(!user){
      console.log("Error: User attacked without a character!");
      return;
    }
    const stat = stats.get(message.author.id);
    if(!stat){
      console.log("Error: User attacked without stats!");
      return;
    }
    const mob = mobs.get(args[0].replace(/\s+/g, '').toLowerCase());
    if(!mob){
      console.log(`Error: mob not found!`)
      message.reply(`${args[0]} not found!`);
      return;
    }

    // if everything is good, then initiate attack logic
    const d = Math.floor((Math.random() * stat.strength) / 10) + stat.strength;
    await mob.onAttacked(d, message.author.id, stats, users, message);
  }
}