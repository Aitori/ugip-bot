import { data as mobs } from './mobs.json';
import { data as mobLocations } from './mob_locations.json';
import { data as locations } from './locations.json';

const parseJsonToDatabase = async (Mobs, WorldLocations, MobLocations) => {
  // start with locations
  const promises = [];
  locations.forEach((worldLocation) => {
    promises.push(
      WorldLocations.upsert({
        name: worldLocation.Name,
        maxMobCount: worldLocation.MaxMobCount,
      })
    );
  });
  mobs.forEach((mob) => {
    promises.push(
      Mobs.upsert({
        id: mob.ID,
        name: mob.Name,
        health: mob.Health,
        maxHealth: mob.MaxHealth,
        strength: mob.Strength,
        dexterity: mob.Dexterity,
        willpower: mob.Willpower,
        agility: mob.Agility,
        luck: mob.Luck,
        intelligence: mob.Intelligence,
        image: mob.ImageLink,
      })
    );
  });

  mobLocations.forEach((mobLocation) => {
    promises.push(
      MobLocations.upsert({
        mobId: mobLocation.MobID,
        location: mobLocation.Location,
        chance: mobLocation.Chance,
        money: mobLocation.money,
        level: mobLocation.level,
        dropId1: mobLocation.dropId1,
        dropChance1: mobLocation.dropChance1,
        dropId2: mobLocation.dropId2,
        dropChance2: mobLocation.dropChance2,
        dropId3: mobLocation.dropId3,
        dropChance3: mobLocation.dropChance3,
        dropId4: mobLocation.dropId4,
        dropChance4: mobLocation.dropChance4,
        dropId5: mobLocation.dropId5,
        dropChance5: mobLocation.dropChance5,
        count1: mobLocation.count1,
        count2: mobLocation.count2,
        count3: mobLocation.count3,
        count4: mobLocation.count4,
        count5: mobLocation.count5,
      })
    );
  });

  await Promise.all(promises).catch((error) => console.log(error));
  console.log("ready");
};

export default parseJsonToDatabase;
