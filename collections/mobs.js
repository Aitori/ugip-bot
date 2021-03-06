import Discord from 'discord.js';
import { Mobs } from '../db_models';
import Mob from '../classes/mob';
// this mobs will hold a collection of all mobs in collections of key channel
const mobs = new Discord.Collection();

Reflect.defineProperty(mobs, 'spawnMob', {
  value: async function spawnMob(mobToSpawn, channel) {
    const mobType = await Mobs.findOne({
      where: { id: mobToSpawn.mobId },
    });

    //check if exist
    if (mobType) {
      // do some random stuff to health
      const h = Math.floor((Math.random() * mobType.maxHealth) / 10) + mobType.maxHealth;
      const s = Math.floor((Math.random() * mobType.strength) / 10) + mobType.strength;
      const e = Math.floor((Math.random() * mobType.experience) / 10) + mobType.experience;
      const dropTable = [
        { dropId: mobToSpawn.dropId1, chance: mobToSpawn.dropChance1, count: mobToSpawn.count1 },
        { dropId: mobToSpawn.dropId2, chance: mobToSpawn.dropChance2, count: mobToSpawn.count2 },
        { dropId: mobToSpawn.dropId3, chance: mobToSpawn.dropChance3, count: mobToSpawn.count3 },
        { dropId: mobToSpawn.dropId4, chance: mobToSpawn.dropChance4, count: mobToSpawn.count4 },
        { dropId: mobToSpawn.dropId5, chance: mobToSpawn.dropChance5, count: mobToSpawn.count5 },
      ];
      const newMob = new Mob({
        name: mobType.name,
        health: h,
        maxHealth: h,
        strength: s,
        dexterity: mobType.dexterity,
        willpower: mobType.willpower,
        luck: mobType.luck,
        intelligence: mobType.intelligence,
        agility: mobType.agility,
        level: mobToSpawn.level,
        image: mobType.image,
        experience: e,
        ability: mobType.ability,
        dropTable: dropTable,
        money: mobToSpawn.money,
      });
      // see if collection for that channel exists
      if (!mobs.has(channel.name)) {
        const newCollection = new Discord.Collection();
        mobs.set(channel.name, newCollection);
      }
      const currChannelMobCollection = mobs.get(channel.name);
      // if the mob type exists already, change name to unique
      let concatName = newMob.name.replace(/\s+/g, '').toLowerCase();
      let key = concatName;
      let mobCount = 1;
      while (currChannelMobCollection.has(key)) {
        key = concatName.concat(++mobCount);
      }
      if (mobCount > 1) {
        newMob.name = newMob.name.concat(mobCount);
      }
      currChannelMobCollection.set(key, newMob);
      newMob.displayEmbedMessage(channel);
    } else {
      console.log('Specified mob ID does not exist: ', mobToSpawn.mobId);
    }
  },
});

export default mobs;
