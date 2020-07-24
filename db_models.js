import { DataTypes } from 'sequelize';
import sequelize from './db_sq';
import { shouldSync } from './config.json';

import User from './models/user';
import Stat from './models/stat';
import Mob from './models/mob';

const Users = new User(sequelize, DataTypes);
const Stats = new Stat(sequelize, DataTypes);
const Mobs = new Mob(sequelize, DataTypes);

Stats.belongsTo(Users, { foreignKey: 'userId' });

// initialize a mob
const createTempMobs = async () => {
  await Mobs.create({
    name: 'HR',
    health: 5,
    maxHealth: 5,
    experience: 20,
    image:
      'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/37777257_1750468778342200_8518056029378838528_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=s5dJo4PfkqEAX9pxsMR&_nc_ht=scontent-ort2-2.xx&oh=bf9f0e9988c4102cb2583ef8e666cb31&oe=5F41ADDD',
  });
};

if (shouldSync) sequelize.sync({ force: true });

export { Users, Stats, Mobs, createTempMobs };
  