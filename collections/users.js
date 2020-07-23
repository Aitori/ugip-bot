import Discord from 'discord.js';
import { Users } from '../db_models';

const users = new Discord.Collection();
// EXPERIENCE
Reflect.defineProperty(users, 'addExperience', {
  value: async function addExperience(id, amount) {
    const user = users.get(id);
    if (user) {
      user.experience += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, experience: amount });
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

    const newUser = await Users.create({ id: id, experience: amount });
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

    const newUser = await Users.create({ id: id, experience: 0 });
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
// MONEY
Reflect.defineProperty(users, 'addMoney', {
  value: async function addMoney(id, amount) {
    const user = users.get(id);
    if (user) {
      user.money += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, money: amount });
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

    const newUser = await Users.create({ id: id, money: amount });
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

    const newUser = await Users.create({ id: id, money: 0 });
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
// LEVEL
Reflect.defineProperty(users, 'addLevel', {
  value: async function addLevel(id, amount) {
    const user = users.get(id);
    if (user) {
      user.level += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, level: amount });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'setLevel', {
  value: async function setLevel(id, amount) {
    const user = users.get(id);
    if (user) {
      user.level = Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, level: amount });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'subtractLevel', {
  value: async function subtractLevel(id, amount) {
    const user = users.get(id);
    if (user) {
      user.level -= Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ id: id, level: 1 });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'getLevel', {
  value: function getLevel(id) {
    const user = users.get(id);
    return user ? user.level : 0;
  },
});

Reflect.defineProperty(users, 'setTitle', {
  value: async function setTitle(id, title) {
    const user = users.get(id);
    if (user) {
      user.title = title;
      return user.save();
    }

    const newUser = await Users.create({ id: id, title: title });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'setClass', {
  value: async function setClass(id, c) {
    const user = users.get(id);
    if (user) {
      user.class = c;
      return user.save();
    }

    const newUser = await Users.create({ id: id, class: c });
    users.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(users, 'getTitle', {
  value: function getTitle(id) {
    const user = users.get(id);
    return user ? user.title : 0;
  },
});

Reflect.defineProperty(users, 'getClass', {
  value: function getClass(id) {
    const user = users.get(id);
    return user ? user.class : 0;
  },
});

export default users;