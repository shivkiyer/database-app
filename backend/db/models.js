var sequelize = require('sequelize');
var {sqlConnection} = require('./config');

var Categories = sqlConnection.define('Categories', {
  category: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  categoryname: {
    type: sequlize.STRING(50),
    allowNull: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'categories',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var CustomerHistory = sqlConnection.define('Customer_History', {
  customerid: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  orderid: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  prod_id: {
    type: sequelize.INTEGER,
    allowNull: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'cust_hist',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var Customers = sqlConnection.define('Customers', {

});


module.exports = {
  Categories,
  CustomerHistory
}
