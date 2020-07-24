const Mob = (sequelize, DataTypes) =>
  sequelize.define(
    'Mob',
    {
      name: {
        type: DataTypes.STRING,
        defaultName: 'Sample Mob',
      },
      health: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
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
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      experience: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 1,
      },
    },
    { timestamps: false }
  );

export default Mob;
