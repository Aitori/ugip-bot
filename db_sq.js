const { Sequelize } = require('sequelize');
console.log("HELOO");
// initialize sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

export default sequelize;