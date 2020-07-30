import users from '../collections/users';
import stats from '../collections/stats';
import mobs from '../collections/mobs';

module.exports = {
  name: 'attack',
  description: 'Attacks a certain mob as your character!',
  aliases: ['a'],
  usage: '[mobName]',
  charRequired: true,
  guildOnly: true,
  args: true,
  async execute(message, args) {
    // make sure user exists
    const user = users.get(message.author.id);
    if(!user){
      console.log("Error: User attacked without a character!");
      return;
    }
    // make sure stats exist
    const stat = stats.get(message.author.id);
    if(!stat){
      console.log("Error: User attacked without stats!");
      return;
    }
    // if the channel is not a text channel, DIE
    if(message.channel.type === 'dm'){
      console.log("Can't create mob in a DM");
      return;
    }
    // check if mob exists in this location
    const channel = mobs.get(message.channel.name);
    if(!channel) {
      message.reply(`${message.channel.name} doesn't have mobs!`);
      return;
    }
    const mob = channel.get(args[0].replace(/\s+/g, '').toLowerCase());
    if(!mob){
      console.log(`Error: mob not found!`)
      message.reply(`${args[0]} not found in ${message.channel.name}!`);
      return;
    }

    // if everything is good, then initiate attack logic
    const d = Math.floor((Math.random() * stat.strength) / 10) + stat.strength;
    await mob.onAttacked(d, message.author.id, stats, users, message);
  }
}