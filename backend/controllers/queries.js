var getTableContents = (dbIndex, tableName, offset, limit) => {
  var tableModel;
  var noOfRows;
  switch (dbIndex) {
    case 0:
        dbTables = require('./../db/methods/dellstore2').dbTables;
        tableMapping = require('./../db/methods/dellstore2').tableMapping;
        break;
    case 1:
        dbTables = require('./../db/methods/usda').dbTables;
        tableMapping = require('./../db/methods/usda').tableMapping;
        break;
  }

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
    return tableModel['model'].count().then(
      (count) => {
        noOfRows = count;
      }
    ).catch(
      (e) => {
        console.log("e");
      }
    ).then(
      () => {
        return tableModel['model'].findAll({
          attributes: tableModel['colNames']()['attributes'],
          include: tableModel['colNames']()['include'],
          offset: offset,
          limit: limit
        }).then(
          (items) => {
            let result = [];
            items.forEach((item) => {
              result.push(item.dataValues);
            });
            return {
              result: result,
              order: tableModel['colNames']()['order'],
              count: noOfRows
            };
          }
        ).catch(
          (e) => {
            console.log('Error');
            return {message: 'Database error'};
          }
        );
    });
  }
};


module.exports = {
  getTableContents
};
