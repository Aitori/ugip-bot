import Discord from 'discord.js';
import { Stats } from '../db_models';

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

export default stats;