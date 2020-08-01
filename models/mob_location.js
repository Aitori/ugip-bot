const MobLocation = (sequelize, DataTypes) =>
  sequelize.define(
    'MobLocation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      mobId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      chance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      money: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropId1: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropChance1: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      count1: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropId2: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropChance2: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      count2: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropId3: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropChance3: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      count3: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropId4: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropChance4: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      count4: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropId5: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dropChance5: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      count5: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

export default MobLocation;
