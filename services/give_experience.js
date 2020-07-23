import users from '../collections/users';
import stats from '../collections/stats';
import experience_chart from '../other/experience_chart';

// function to give experience but account for leveling up
const giveExperience = async (userId, amount, message) => {
  // add initial experience
  await users.addExperience(userId, amount);
  // get all the info of current user now
  let newExp = await users.getExperience(userId);
  let level = await users.getLevel(userId);
  // stat data
  let userStats = await users.getUserStats(userId);
  // non user stat data
  let cap = experience_chart[level];
  let levelUp = false;
  // handle leveling up
  while (newExp > cap) {
    levelUp = true;
    newExp -= cap;
    level += 1;
    userStats.maxHealth += 5;
    cap = experience_chart[level];
    message.channel.send(`${message.author} has leveled up to level ${level}`);
  }

  // update database values
  if (levelUp) {
    await users.setExperience(userId, newExp);
    await users.setLevel(userId, level);
    await stats.setStat(userId, userStats.maxHealth, 'maxHealth');
    await stats.setStat(userId, userStats.maxHealth, 'health');
  }
};

export default giveExperience;
