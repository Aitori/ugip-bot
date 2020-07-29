const UserItem = (sequelize, DataTypes) =>
  sequelize.define(
    'UserItem',
    {
      userId: {
        type: DataTypes.INTEGER,
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
    },
    {
      timestamps: false,
    }
  );

export default UserItem;
