const UserItem = (sequelize, DataTypes) =>
  sequelize.define(
    'UserItem',
    {
      userId: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      itemId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      rarity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      enchantLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

export default UserItem;
