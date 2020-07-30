const ItemStore = (sequelize, DataTypes) =>
  sequelize.define(
    'ItemStore',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: 'Sample Item',
      },
      maxHealth: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      maxMana: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      strength: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dexterity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      willpower: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      agility: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      luck: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      intelligence: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: '',
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
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

export default ItemStore;
