var sequelize = require('sequelize');

var sqlConnection = new sequelize({
  database: 'dellstore2',
  username: 'databaseuser',
  password: 'database123',
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: sequelize.op,
  logging: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 60000
  }
});

var dbList = [
  'DVD Store',
  'Food and nutrients'
];

module.exports = {
  sqlConnection,
  dbList
}
