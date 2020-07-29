const Stat = (sequelize, DataTypes) =>
  sequelize.define(
    'Stat',
    {
      userId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      // necessary stats
      health: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      maxHealth: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      mana: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      maxMana: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      // attribute stats
      strength: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
      dexterity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      intelligence: {
        type: DataTypes.INTEGER,
        defaultValue: 4,
      },
      agility: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      luck: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      willpower: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      // other stats cuz yeah
      unspentStatPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      // equiped items
      headArmor: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      chestArmor: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      legArmor: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      bootArmor: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      leftRing: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      rightRing: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      leftHandWeapon: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      rightHandWeapon: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    { timestamps: false }
  );

export default Stat;
