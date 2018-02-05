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


var Orders = sqlConnection.define('Orders', {
  orderid: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  orderdate: {
    type: sequelize.DATE,
    allowNull: false
  },
  customerid: {
    type: sequelize.INTEGER,
    primaryKey: false
  },
  netamount: {
    type: sequelize.DECIMAL(12,2),
    alowNull: false
  },
  tax: {
    type: sequelize.DECIMAL(12,2),
    allowNull: false
  },
  totalamount: {
    type: sequelize.DECIMAL(12,2),
    allowNull: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'orders',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});

Orders.belongsTo(Customers, {foreignKey: 'customerid'});


var Products = sqlConnection.define('Products', {
  prod_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  category: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: false
  },
  title: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  actor: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  price: {
    type: sequelize.DECIMAL(12,2),
    allowNull: false
  },
  special: {
    type: sequelize.INTEGER
  },
  common_prod_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: false
  },
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'products',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var Reorder = sqlConnection.define('Reorder', {
  prod_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: false
  },
  date_low: {
    type: sequelize.DATE,
    allowNull: false
  },
  quan_low: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: false
  },
  date_reordered: {
    type: sequelize.DATE
  },
  quan_reordered: {
    type: sequelize.INTEGER
  },
  date_expected: {
    type: sequelize.DATE
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'reorder',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});

Reorder.removeAttribute('id');


var Inventory = sqlConnection.define('Inventory', {
  prod_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  quan_in_stock: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  sales: {
    type: sequelize.INTEGER,
    allowNull: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'inventory',

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

CustomerHistory.removeAttribute('id');
CustomerHistory.belongsTo(Customers, {foreignKey: 'customerid'});


var OrderLines = sqlConnection.define('Order_Lines', {
  orderlineid: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
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
    primaryKey: true
  },
  quantity: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  orderdate: {
    type: sequelize.DATE,
    allowNull: false
  },
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'orderlines',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});

OrderLines.belongsTo(Orders, {foreignKey: 'orderid'});


module.exports = {
  Categories,
  Customers,
  CustomerHistory,
  Inventory,
  Orders,
  OrderLines,
  Products,
  Reorder
};
