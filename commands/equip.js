import stats from '../collections/stats';

module.exports = {
  name: 'equip',
  description: 'Equips an equippable item',
  aliases: ['e'],
  usage: '[itemName]',
  charRequired: true,
  guildOnly: true,
  args: true,
  async execute(message, args) {
    const user = stats.get(message.author.id);
    if(user === null){
      console.log("Equipping item on null character?");
      return;
    }
    const itemName = args.join(' ');
    const returnEquip = await stats.equipItem(itemName, message.author.id);

    if(returnEquip === 'equip success'){
      message.reply(`you've equipped ${itemName}`);
    }else{
      message.reply(returnEquip);
    }
    return;
  }
}