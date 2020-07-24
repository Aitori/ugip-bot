import Discord from 'discord.js';
import { Mobs } from '../db_models';
import Mob from '../classes/mob';
// this mobs will hold a collection of all mobs
const mobs = new Discord.Collection();

Reflect.defineProperty(mobs, 'spawnMob', {
  value: async function spawnMob(mobId, channel) {
    const mobType = await Mobs.findOne({
      where: { id: mobId },
    });

    // do some random stuff to health
    const h = Math.floor((Math.random() * mobType.maxHealth) / 10) + mobType.maxHealth;
    const s = Math.floor((Math.random() * mobType.strength) / 10) + mobType.strength;
    const e = Math.floor((Math.random() * mobType.experience) / 10) + mobType.experience;
    //check if exist
    if (mobType) {
      const newMob = new Mob({
        name: mobType.name,
        health: h,
        maxHealth: h,
        strength: s,
        dexterity: mobType.dexterity,
        willpower: mobType.willpower,
        agility: mobType.agility,
        level: mobType.level,
        image: mobType.image,
        experience: e,
      });

      newMob.displayEmbedMessage(channel);

      mobs.set()
    }else{
      console.log('Specified mob ID does not exist')
    }
  },
});
