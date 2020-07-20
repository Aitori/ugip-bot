const User = (sequelize, DataTypes) => sequelize.define('User', { 
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
    },
);

export default User;