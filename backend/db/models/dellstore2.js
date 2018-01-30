var sequelize = require('sequelize');
var {sqlConnection} = require('./../config');

var Categories = sqlConnection.define('Categories', {
  category: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  categoryname: {
    type: sequelize.STRING(50),
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


var Customers = sqlConnection.define('Customers', {
  customerid: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  lastname: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  address1: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  address2: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  city: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  state: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  zip: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  country: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  region: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  email: {
    type: sequelize.STRING(50),
    allowNull: true
  },
  phone: {
    type: sequelize.STRING(50),
    allowNull: true
  },
  creditcardtype: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  creditcard: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  creditcardexpiration: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  username: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  password: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  age: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  income: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  gender: {
    type: sequelize.STRING(1),
    allowNull: true
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'customers',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var CustomerHistory = sqlConnection.define('Customer_History', {
  customerid: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: false
  },
  orderid: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: false
  },
  prod_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: false
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

CustomerHistory.belongsTo(Customers, {foreignKey: 'customerid'});


module.exports = {
  Categories,
  Customers,
  CustomerHistory
};
