var sequelize = require('sequelize');
var {sqlConnection} = require('./../config');
var dbTables = require('./../models/dellstore2');

var {Categories,
      Customers,
      CustomerHistory,
      Inventory,
      Orders,
      OrderLines,
      Products,
      Reorder} = require('./../models/dellstore2');


var getColNamesCategories = () => {
  return {
    order: ['Sr. No', 'Category Name'],
    attributes: [['category', 'Sr. No'], ['categoryname', 'Category Name']],
    include: []
  };
};

var getColNamesCustomers = () => {
  return {
    order: [
      'Customer ID',
      'First Name',
      'Last Name',
      'City',
      'State',
      'Postal code',
      'Country',
      'Region',
      'Email',
      'Phone',
      'Gender'
    ],
    attributes: [
      ['customerid', 'Customer ID'],
      ['firstname', 'First Name'],
      ['lastname', 'Last Name'],
      ['city', 'City'],
      ['state', 'State'],
      ['zip', 'Postal code'],
      ['country', 'Country'],
      ['region', 'Region'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['age', 'Age'],
      ['gender', 'Gender']
    ],
    include: []
  };
};

var getColNamesInventory = () => {
  return {
    order: [
      'Product ID',
      'Quantity in stock',
      'Sales'
    ],
    attributes: [
      ['prod_id', 'Product ID'],
      ['quan_in_stock', 'Quantity in stock'],
      ['sales', 'Sales']
    ],
    include: []
  };
};

var getColNamesOrders = () => {
  return {
    order: [
      'Order ID',
      'Order Date',
      'Net Amount',
      'Tax',
      'Total amount'
    ],
    attributes: [
      ['orderid', 'Order ID'],
      ['orderdate', 'Order Date'],
      ['netamount', 'Net Amount'],
      ['tax', 'Tax'],
      ['totalamount', 'Total amount']
    ],
    include: [{
      model: Customers,
      attributes: [
        ['customerid', 'Customer ID'],
        ['firstname', 'First Name'],
        ['lastname', 'Last Name'],
        ['city', 'City'],
        ['state', 'State'],
        ['zip', 'Postal code'],
        ['country', 'Country'],
        ['region', 'Region'],
        ['email', 'Email'],
        ['phone', 'Phone'],
        ['age', 'Age'],
        ['gender', 'Gender']
      ]
    }]
  };
};

var getColNamesProducts = () => {
  return {
    order: [
      'Product ID',
      'Category',
      'Title',
      'Actor',
      'Price',
      'Special',
      'Common Product ID'
    ],
    attributes: [
      ['prod_id', 'Product ID'],
      ['category', 'Category'],
      ['title', 'Title'],
      ['actor', 'Actor'],
      ['price', 'Price'],
      ['special', 'Special'],
      ['common_prod_id', 'Common Product ID']
    ],
    include: []
  };
};

var getColNamesReorder = () => {
  return {
    order: [
      'Product ID',
      'Date low',
      'Quantity low',
      'Date Reordered',
      'Quantity reordered',
      'Date expected'
    ],
    attributes: [
      ['prod_id', 'Product ID'],
      ['date_low', 'Date low'],
      ['quan_low', 'Quantity low'],
      ['date_reordered', 'Date Reordered'],
      ['quan_reordered', 'Quantity reordered'],
      ['date_expected', 'Date expected']
    ],
    include: []
  };
};

var getColNamesCustomerHistory = () => {
  return {
    order: [
      'Order ID',
      'Product ID',
      {
        Customer: [
          'Customer ID',
          'First Name',
          'Last Name',
          'City',
          'State',
          'Postal code',
          'Country',
          'Region',
          'Email',
          'Phone',
          'Gender'
        ]
      }
    ],
    attributes: [
      ['orderid', 'Order ID'],
      ['prod_id', 'Product ID']
    ],
    include: [{
      model: Customers,
      attributes: [
        ['customerid', 'Customer ID'],
        ['firstname', 'First Name'],
        ['lastname', 'Last Name'],
        ['city', 'City'],
        ['state', 'State'],
        ['zip', 'Postal code'],
        ['country', 'Country'],
        ['region', 'Region'],
        ['email', 'Email'],
        ['phone', 'Phone'],
        ['age', 'Age'],
        ['gender', 'Gender']
      ]
    }]
  };
};

var getColNamesOrderLines = () => {
  return {
    order: [
      'Order line ID',
      'Product ID',
      'Quantity',
      'Order date',
      {
        Order: [
          'Order ID',
          'Order Date',
          'Net Amount',
          'Tax',
          'Total amount'
        ]
      }
    ],
    attributes: [
      ['orderlineid', 'Order line ID'],
      ['prod_id', 'Product ID'],
      ['quantity', 'Quantity'],
      ['orderdate', 'Order date']
    ],
    include: [{
      model: Orders,
      attributes: [
        ['orderid', 'Order ID'],
        ['orderdate', 'Order Date'],
        ['netamount', 'Net Amount'],
        ['tax', 'Tax'],
        ['totalamount', 'Total amount']
      ]
    }]
  };
};

var tableMapping = {
  'Categories': {
    model: Categories,
    colNames: getColNamesCategories
  },
  'Customers': {
    model: Customers,
    colNames: getColNamesCustomers
  },
  'Orders': {
    model: Orders,
    colNames: getColNamesOrders
  },
  'Products': {
    model: Products,
    colNames: getColNamesProducts
  },
  'Reorder': {
    model: Reorder,
    colNames: getColNamesReorder
  },
  'Inventory': {
    model: Inventory,
    colNames: getColNamesInventory
  },
  'CustomerHistory': {
    model: CustomerHistory,
    colNames: getColNamesCustomerHistory
  },
  'OrderLines': {
    model: OrderLines,
    colNames: getColNamesOrderLines
  }
}

var getTableContents = (tableName) => {
  var tableModel;
  if (Object.keys(dbTables).indexOf(tableName) > -1) {
    tableModel = tableMapping[tableName];
  } else {
    tableModel = null;
  }
  if (tableModel === null) {
    return new Promise((resolve, reject) => {
      reject({message: 'Table not found'});
    });
  } else {
    return tableModel['model'].findAll({
      attributes: tableModel['colNames']()['attributes'],
      include: tableModel['colNames']()['include'],
      limit: 1000
    }).then(
      (items) => {
        let result = [];
        items.forEach((item) => {
          result.push(item.dataValues);
        });
        return {
          result: result,
          order: tableModel['colNames']()['order']
        };
      }
    ).catch(
      (e) => {
        return {message: 'Database error'};
      }
    );
  }
};


module.exports = {
  dbTables,
  getTableContents
};
