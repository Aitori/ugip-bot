const WorldLocation = (sequelize, DataTypes) =>
  sequelize.define(
    'WorldLocation',
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      maxMobCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      effectId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

export default WorldLocation;
