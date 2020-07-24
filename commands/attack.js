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
  async execute(message, args) {
    const user = users.get(message.author.id);
    if(!user){
      console.log("Error: User attacked without a character!");
      return;
    }
    const stat = stats.get(message.author.id);
    if(!stat){
      console.log("Error: User attacked without stats!");
    }
    const mob = mob.get(args[0]);
  }
}