import { Sequelize } from 'sequelize';
import Discord from 'discord.js';
import { Stats, ItemStoreShop, UserItems } from '../db_models';
import sequelize from '../db_sq';

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
  value: async function equipItem(itemName, userId) {
    const itemType = await ItemStoreShop.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        sequelize.fn('lower', itemName)
      ),
    });
    // check if item exists if not return
    if (itemType == null) {
      console.log(`Cannot equip item that does not exist! Item Name: ${itemName}`);
      return "this item doesn't exist!";
    }

    // verify user has item
    const userItemObject = await UserItems.findOne({
      where: {
        userId: userId,
        itemId: itemType.id,
      },
    });

    if (userItemObject == null) {
      return "you don't have this item!";
    }

    // just a check to make sure user exists
    const userStats = stats.get(userId);
    if (userStats == null) {
      return 'you need to create a character first!';
    }

    // if all conditions are met then begin item check
    if (itemType.stackable === true) {
      return 'Cannot equip this item!';
    }

    // check if current slot is taken
    if (!userStats[itemType.slot] === '') {
      const unequipReturn = await stats.unequipItem(itemType.slot, userId);
      if (!unequipReturn === 'unequip success') {
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
    if (userStats == null) {
      return 'you need to create a character first!';
    }

    if (userStats[slot] === '') {
      return 'nothing is equipped in this slot!';
    }

    const itemType = await ItemStoreShop.findOne({
      where: {
        name: userStats[slot],
      },
    });
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
