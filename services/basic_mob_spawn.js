import mobs from '../collections/mobs';

const basicMobSpawn = async (mobLocations, message) => {
  const shouldSpawn = Math.floor(Math.random() * 10);
  // if get spawn then spawn
  if (shouldSpawn === 3) {
    const locationToAddMob = mobLocations.random();
    if (locationToAddMob.mobs.length > locationToAddMob.maxMobCount) {
      return;
    }
    const sum = locationToAddMob.mobs.reduce((acc, el) => acc + el.chance, 0);
    let accumulationCount = 0;
    const selectionChoices = locationToAddMob.mobs.map(
      (el) => (accumulationCount = el + accumulationCount)
    );
    const selector = Math.random() * sum;
    const mobToSpawn = locationToAddMob.mobs[selectionChoices.filter(el => el <= selector).length];
    const channelToSpawnIn = message.guild.channels.cache.find((channel) => channel.name === locationToAddMob.name);
    mobs.spawnMob(mobToSpawn.mobId, channelToSpawnIn);
  }
};

export default basicMobSpawn;
