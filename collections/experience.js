import Discord from 'discord.js';
import { Users } from '../db_models';

const experience = new Discord.Collection();

Reflect.defineProperty(experience, 'add', {
  value: async function add(id, amount) {
    const user = experience.get(id);
    if (user) {
      user.experience += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, experience: amount });
    experience.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(experience, 'getExperience', {
  value: function getExperience(id) {
    const user = experience.get(id);
    return user ? user.experience : 0;
  },
});

export default experience;