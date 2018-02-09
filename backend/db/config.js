var sequelize = require('sequelize');

var dbList = [
  'DVD Store',
  'Food and nutrients'
];

var dbConfigParams = {
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
};

var allSQLConnection = [];
for (let dbName of dbList) {
  switch (dbName) {
    case 'DVD Store':
        dbConfigParams['database'] = 'dellstore2';
        allSQLConnection.push(new sequelize(dbConfigParams));
        break;
    case 'Food and nutrients':
        dbConfigParams['database'] = 'usda';
        allSQLConnection.push(new sequelize(dbConfigParams));
        break;
  }
}


module.exports = {
  allSQLConnection,
  dbList
}
