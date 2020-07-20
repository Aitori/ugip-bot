const User = (sequelize, DataTypes) => sequelize.define('User', {
    
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      experience: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
    },
);

export default User;