var sequelize = require('sequelize');

// var dbConfigParams = {
//   database: 'dellstore2',
//   username: 'databaseuser',
//   password: 'database123',
//   host: 'localhost',
//   dialect: 'postgres',
//   operatorsAliases: sequelize.op,
//   logging: false,
//
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 60000,
//     idle: 60000
//   }
// };
//
// var createDB = (dbIndex) => {
//   var dbName;
//   var db;
//   if (dbIndex === undefined) {
//     db = new sequelize(dbConfigParams);
//   } else {
//       switch (dbIndex) {
//         case 0:
//             dbName = 'dellstore2';
//             dbConfigParams['database'] = dbName;
//             db = new sequelize(dbConfigParams);
//             break;
//         case 1:
//             dbName = 'usda';
//             dbConfigParams['database'] = dbName;
//             db = new sequelize(dbConfigParams);
//             break;
//       }
//   }
//   return db;
// };


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
