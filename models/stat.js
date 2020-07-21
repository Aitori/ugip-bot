const Stat = (sequelize, DataTypes) =>
  sequelize.define(
    'Stat',
    {
      // necessary stats
      health: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      maxHealth: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      mana: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      maxMana: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      // attribute stats
      strength: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dexterity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      wisdom: {
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
      willpower: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );

export default Stat;
