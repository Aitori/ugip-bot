import { DataTypes } from 'sequelize';
import sequelize from './db_sq';
import { shouldSync } from './config.json';
//import model definitions
import User from './models/user';
import Stat from './models/stat';
import Mob from './models/mob';
import MobLocation from './models/mob_location';
import WorldLocation from './models/world_location';
import ItemStore from './models/item_store';
import UserItem from './models/user_item';
//initialize collections
import users from './collections/users';
import stats from './collections/stats';
import mobLocations from './collections/mob_locations';

import parseJsonToDatabase from './temp/parseJsonToDatabase';

const Users = User(sequelize, DataTypes);
const Stats = Stat(sequelize, DataTypes);
const Mobs = Mob(sequelize, DataTypes);
const WorldLocations = WorldLocation(sequelize, DataTypes);
const MobLocations = MobLocation(sequelize, DataTypes);
const ItemStoreShop = ItemStore(sequelize, DataTypes);
const UserItems = UserItem(sequelize, DataTypes);

Stats.belongsTo(Users, { foreignKey: 'userId' });

if (shouldSync)
  sequelize.sync({ force: true }).then(async () => {
    await parseJsonToDatabase(Mobs, WorldLocations, MobLocations)
    // after database is synced, then iniatialize, but move this somewhere else maybe?
    const storedUsers = await Users.findAll();
    const storedStats = await Stats.findAll();
    const storedWorldLocations = await WorldLocations.findAll();
    const storedMobLocations = await MobLocations.findAll();
    storedUsers.forEach((e) => users.set(e.id, e));
    storedStats.forEach((e) => stats.set(e.userId, e));
    storedWorldLocations.forEach((e) => mobLocations.set(e.name, e));
    storedMobLocations.forEach((e) => {
      const currLocation = mobLocations.get(e.location);
      if (!currLocation) {
        console.log('Location not found for said mob!');
      } else {
        if (!currLocation.mobs) {
          currLocation.mobs = [];
        }
        currLocation.mobs.push(e);
      }
    });
  });

export { Users, Stats, Mobs, MobLocations, WorldLocations, ItemStoreShop, UserItems };
