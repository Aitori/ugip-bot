import stats from '../collections/stats';

const statAbbrev = {
  s: 'strength',
  d: 'dexterity',
  i: 'intelligence',
  a: 'agility',
  l: 'luck',
  w: 'willpower',
  strength: 'strength',
  dexterity: 'dexterity',
  intelligence: 'intelligence',
  agility: 'agility',
  luck: 'luck',
  wisdom: 'willpower',
  str: 'strength',
  dex: 'dexterity',
  int: 'intelligence',
  agi: 'agility',
  wil: 'willpower',
};

module.exports = {
  name: 'addstat',
  description: 'Uses your unspent stat points to upgrade!',
  alias: ['as', 'stat'],
  usage: '[statName count]',
  args: true,
  charRequired: true,
  async execute(message, args) {
    if (args.length > 2) {
      message.reply("Too many arguments, Ugip doesn't understand");
      return;
    }
    // check if stat arg exists
    if (!(args[0] in statAbbrev) && !(args[1] in statAbbrev)) {
      message.reply('No argument found for a stat!');
      return;
    }
    // check if number arg exists
    if (isNaN(args[0]) && isNaN(args[1])) {
      message.reply('No number argument found :(');
      return;
    }

    let statToBeUpgraded = '';
    let amount = 0;
    if (isNaN(args[0])) {
      statToBeUpgraded = statAbbrev[args[0]];
      amount = args[1];
    } else {
      statToBeUpgraded = statAbbrev[args[1]];
      amount = args[0];
    }

    if (amount <= 0) {
      message.reply("Can't upgrade by that amount!");
      return;
    }

    const stat = stats.getUserStats(message.author.id);
    if (!stat) {
      message.reply('User not found!');
      return;
    }

    if (stat.unspentStatPoints < amount) {
      message.reply("You don't have enough remaining stat points!");
      return;
    }
    await stats.subtractStat(message.author.id, amount, 'unspentStatPoints');
    await stats.addStat(message.author.id, amount, statToBeUpgraded);
    if (statToBeUpgraded === 'willpower') {
      await stats.addStat(message.author.id, 5, 'maxHealth');
    }

    if (statToBeUpgraded === 'intelligence') {
      await stats.addStat(message.author.id, 10, 'maxMana');
    }
  },
};
