import { DataTypes } from 'sequelize';
import sequelize from './db_sq';
import { shouldSync } from './config.json';

import User from './models/user';
import Stat from './models/stat';

const Users = new User(sequelize, DataTypes);
const Stats = new Stat(sequelize, DataTypes);

Stats.belongsTo(Users, { foreignKey: 'userId' });

if (shouldSync) sequelize.sync({ force: true });

export { Users, Stats };
