const User = (sequelize, DataTypes) =>
  sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    experience: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    money: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    class: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  });

export default User;
