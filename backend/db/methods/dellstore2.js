var sequelize = require('sequelize');
var {sqlConnection} = require('./../config');
var {Categories,
      Customers,
      CustomerHistory} = require('./../models/dellstore2');

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
  )
};


module.exports = {
  categoriesList
};
