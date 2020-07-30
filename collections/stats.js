import Discord from 'discord.js';
import { Stats, ItemStoreShop, UserItems } from '../db_models';

const stats = new Discord.Collection();

Reflect.defineProperty(stats, 'setStat', {
  value: async function setStat(id, amount, statType) {
    const stat = stats.get(id);
    if (stat) {
      stat[statType] = Number(amount);
      return stat.save();
    }

    const newStats = await Stats.create({ userId: id });
    newStats[statType] = amount;
    newStats.save();
    stats.set(id, newStats);
    return newStats;
  },
});

Reflect.defineProperty(stats, 'addStat', {
  value: async function addStat(id, amount, statType) {
    const stat = stats.get(id);
    if (stat) {
      stat[statType] += Number(amount);
      return stat.save();
    }

    const newStats = await Stats.create({ userId: id });
    newStats[statType] = amount;
    newStats.save();
    stats.set(id, newStats);
    return newStats;
  },
});

Reflect.defineProperty(stats, 'subtractStat', {
  value: async function subtractStat(id, amount, statType) {
    const stat = stats.get(id);
    if (stat) {
      stat[statType] -= Number(amount);
      return stat.save();
    }

    const newStats = await Stats.create({ userId: id });
    newStats[statType] = amount;
    newStats.save();
    stats.set(id, newStats);
    return newStats;
  },
});

Reflect.defineProperty(stats, 'getStat', {
  value: function getStat(id, statType) {
    const stat = stats.get(id);
    return stat ? stat[statType] : 0;
  },
});

Reflect.defineProperty(stats, 'getUserStats', {
  value: function getUserStats(id) {
    const stat = stats.get(id);
    return stat ? stat : null;
  },
});

// equips items, can use the use stat but won't modify the stats properly
Reflect.defineProperty(stats, 'equipItem', {
  value: async function equipItem(itemId, userId) {
    const itemType = await ItemStoreShop.findOne({
      where: { id: itemId },
    });
    // check if item exists if not return
    if (itemType == null) {
      console.log(`Cannot equip item that does not exist! ItemID: ${itemId}`);
      return 'item does not exist';
    }

    // verify user has item
    const userItemObject = await UserItems.findOne({
      where: {
        userId: userId,
        itemId: itemId,
      },
    });

    if (userItemObject == null) {
      return 'user does not have item'
    }

    // just a check to make sure user exists
    const userStats = stats.get(userId);
    if(userStats == null) {
      return 'user does not have a user create'
    }

    // if all conditions are met then begin item check
    if(itemType.stackable === true) {
      return 'cannot equip this'
    }

    // check if current slot is taken
    if(!userStats[itemType.slot] === '') {
      const unequipReturn = await stats.unequipItem(itemType.slot, userId);
      if(!unequipReturn === 'unequip success'){
        return unequipReturn;
      }
    }

    // if we all good here, then begin adding stats
    userStats.maxHealth += itemType.maxHealth;
    userStats.maxMana += itemType.maxMana;
    userStats.strength += itemType.strength;
    userStats.dexterity += itemType.dexterity;
    userStats.willpower += itemType.willpower;
    userStats.agility += itemType.agility;
    userStats.luck += itemType.luck;
    userStats.intelligence += itemType.intelligence;
    userStats[itemType.slot] = itemType.name;
    await userStats.save();
    return 'equip success';
  },
});

// equips items, can use the use stat but won't modify the stats properly
Reflect.defineProperty(stats, 'unequipItem', {
  value: async function unequipItem(slot, userId) {
    // just a check to make sure user exists
    const userStats = stats.get(userId);
    if(userStats == null) {
      return 'user does not have a user create'
    }

    if(userStats[slot] === '') {
      return 'user does not have equip in slot'
    }

    const itemType = await ItemStoreShop.findOne({
      where: {
        name: userStats[slot],
      }
    })
    // if we all good here, then begin adding stats
    userStats.maxHealth -= itemType.maxHealth;
    userStats.maxMana -= itemType.maxMana;
    userStats.strength -= itemType.strength;
    userStats.dexterity -= itemType.dexterity;
    userStats.willpower -= itemType.willpower;
    userStats.agility -= itemType.agility;
    userStats.luck -= itemType.luck;
    userStats.intelligence -= itemType.intelligence;
    userStats[itemType.slot] = '';
    await userStats.save();
    return 'unequip success';
  },
});

export default stats;
