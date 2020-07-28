import { DataTypes } from 'sequelize';
import sequelize from './db_sq';
import { shouldSync } from './config.json';
//import model definitions
import User from './models/user';
import Stat from './models/stat';
import Mob from './models/mob';
import MobLocation from './models/mob_location';
import WorldLocation from './models/world_location';
//initialize collections
import users from './collections/users';
import stats from './collections/stats';
import mobLocations from './collections/mob_locations';

const Users = new User(sequelize, DataTypes);
const Stats = new Stat(sequelize, DataTypes);
const Mobs = new Mob(sequelize, DataTypes);
const WorldLocations = new WorldLocation(sequelize, DataTypes);
const MobLocations = new MobLocation(sequelize, DataTypes);

Stats.belongsTo(Users, { foreignKey: 'userId' });

if (shouldSync)
  sequelize.sync({ force: true }).then(async () => {
    const createShop = [
      Mobs.upsert({
        name: 'HR Corp Test',
        health: 5,
        maxHealth: 5,
        experience: 20,
        image:
          'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/37777257_1750468778342200_8518056029378838528_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=s5dJo4PfkqEAX9pxsMR&_nc_ht=scontent-ort2-2.xx&oh=bf9f0e9988c4102cb2583ef8e666cb31&oe=5F41ADDD',
      }),
      WorldLocations.upsert({
        name: 'mobtest',
        maxMobCount: 3,
      }),
      MobLocations.upsert({
        location: 'mobtest',
        mobId: 1,
        chance: 0.3,
      }),
    ];
    await Promise.all(createShop);
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

export { Users, Stats, Mobs, MobLocations, WorldLocations };
