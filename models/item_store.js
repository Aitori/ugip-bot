const ItemStore = (sequelize, DataTypes) =>
  sequelize.define('ItemStore', {
    name: {
      type: DataTypes.STRING,
      defaultValue: 'Sample Item',
    },
    maxHealth: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    strength: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    willpower: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    agility: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    luck: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 1,
    },
    effectId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    slot: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    stackable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

export default ItemStore;