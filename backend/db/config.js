var sequelize = require('sequelize');

var dbList = [
  'DVD Store',
  'Food and nutrients'
];

var db_url;

if (process.env.DATABASE_URL) {
  db_url = process.env.DATABASE_URL;
} else {
  db_url = 'postgres://databaseuser:database123@localhost:5432/dellstoreheroku';
}


var dbConfigParams = {
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
        allSQLConnection.push(new sequelize(db_url, dbConfigParams));
        break;
    case 'Food and nutrients':
        // dbConfigParams['database'] = 'usda';
        allSQLConnection.push(new sequelize(dbConfigParams));
        break;
  }
}


module.exports = {
  allSQLConnection,
  dbList
}
