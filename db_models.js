import { DataTypes } from 'sequelize';
import sequelize from './db_sq';

import User from './models/user';

const Users = new User(sequelize, DataTypes);

export { Users };
