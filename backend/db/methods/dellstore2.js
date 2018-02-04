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


var categoriesList = () => {
  Categories.findAll().then(
    (items) => {
      console.log("The contents of categories:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


var customersList = () => {
  Customers.findAll().then(
    (items) => {
      console.log("The contents of customers:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
      console.log(`${items.length} found in database`);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


var customerHistoryList = () => {
  CustomerHistory.findAll().then(
    (items) => {
      console.log("The contents of customer history:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
      console.log(`${items.length} found in database`);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


var inventoryList = () => {
  Inventory.findAll().then(
    (items) => {
      console.log("The contents of inventory:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
      console.log(`${items.length} found in database`);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


var ordersList = () => {
  Orders.findAll().then(
    (items) => {
      console.log("The contents of orders:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
      console.log(`${items.length} found in database`);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


var orderLinesList = () => {
  OrderLines.findAll().then(
    (items) => {
      console.log("The contents of order lines:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
      console.log(`${items.length} found in database`);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


var productsList = () => {
  Products.findAll().then(
    (items) => {
      console.log("The contents of products:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
      console.log(`${items.length} found in database`);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


var reorderList = () => {
  Reorder.findAll().then(
    (items) => {
      console.log("The contents of reorder:");
      items.forEach((item) => {
        console.log(JSON.stringify(item));
      });
      console.log(`${items.length} found in database`);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );
};


module.exports = {
  dbTables,
  categoriesList,
  customersList,
  customerHistoryList,
  inventoryList,
  ordersList,
  orderLinesList,
  productsList,
  reorderList
};
