import Discord from 'discord.js';
import { Users } from '../db_models';

const users = new Discord.Collection();

Reflect.defineProperty(users, 'addExperience', {
  value: async function addExperience(id, amount) {
    const user = users.get(id);
    if (user) {
      user.experience += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, users: amount });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'setExperience', {
  value: async function setExperience(id, amount) {
    const user = users.get(id);
    if (user) {
      user.experience = Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, users: amount });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'subtractExperience', {
  value: async function subtractExperience(id, amount) {
    const user = users.get(id);
    if (user) {
      user.experience -= Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, users: 0 });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'getExperience', {
  value: function getExperience(id) {
    const user = users.get(id);
    return user ? user.experience : 0;
  },
});

Reflect.defineProperty(users, 'addMoney', {
  value: async function addMoney(id, amount) {
    const user = users.get(id);
    if (user) {
      user.money += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, users: amount });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'setMoney', {
  value: async function setMoney(id, amount) {
    const user = users.get(id);
    if (user) {
      user.money = Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, users: amount });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'subtractMoney', {
  value: async function subtractMoney(id, amount) {
    const user = users.get(id);
    if (user) {
      user.money -= Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, users: 0 });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'getMoney', {
  value: function getMoney(id) {
    const user = users.get(id);
    return user ? user.money : 0;
  },
});

export default users;