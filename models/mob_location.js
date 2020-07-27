const MobLocation = (sequelize, DataTypes) =>
  sequelize.define(
    'MobLocation',
    {
      location: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      mobId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      maxCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      chance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

export default MobLocation;
