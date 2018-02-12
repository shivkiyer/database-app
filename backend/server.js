var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');

var {allSQLConnection, dbList} = require('./db/config');
var dbMethods;
var dbUtils = require('./db/methods/dbUtils');

var app = express();
var htmlPATH = path.join(path.join(path.dirname(__dirname), 'frontend'), 'dist');
app.use(express.static(htmlPATH));

var port = process.env.PORT||3000;

var sqlConnection = allSQLConnection[0];
sqlConnection.authenticate().then(
  () => {
    console.log("Connection to SQL database established");
  }
).catch(
  (e) => {
    console.log(e);
  }
);

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization, sid');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.get('/', (req, res) => {
  if (dbList.length > 0) {
    res.send(dbList);
  } else {
    res.status(400).send({
      message: 'Cannot connect to database'
    });
  }
});

app.get('/api/:id', (req, res) => {
  let dbIndex = parseInt(req.params.id);
  let dbName = dbUtils.getDBFile(dbIndex);
  if (dbName.length === 0) {
    res.status(400).send({message: 'No database found'});
  }
  dbMethods = require('./db/methods/' + dbName);
  res.send({
    dbName: dbList[dbIndex],
    dbTables: Object.keys(dbMethods.dbTables)
  });
});


// trydb = require('./db/models/usda');
// trydb.NutData.findAll({
//   attributes: [
//     ['ndb_no', 'Sr No'],
//     ['nutr_no', 'Nutrition no'],
//     ['nutr_val', 'Nutrition value'],
//     ['num_data_pts', 'Numeric data points'],
//     ['std_error', 'Standard error'],
//     ['src_cd', 'Source CD'],
//     ['deriv_cd', 'Derive CD'],
//     ['ref_ndb_no', 'Ref No'],
//     ['add_nutr_mark', 'Add nutrition mark'],
//     ['num_studies', 'Numerical studies'],
//     ['min', 'Min'],
//     ['max', 'Max'],
//     ['df', 'DF'],
//     ['low_eb', 'Low eb'],
//     ['up_eb', 'Up eb'],
//     ['stat_cmt', 'Static CMT'],
//     ['cc', 'CC']
//   ],
//   includes: [
//     {
//       model: trydb.DeriveCD,
//       attributes: [
//         ['deriv_cd', 'Derive CD'],
//         ['derivcd_desc', 'Description']
//       ]
//     },
//     {
//       model: trydb.FoodDescription,
//       attributes: [
//         ['long_desc', 'Long description'],
//         ['shrt_desc', 'Short description'],
//         ['comname', 'Common name'],
//         ['manufacname', 'Manufaturers name']
//       ]
//     },
//     {
//       model: trydb.NutritionDefinition,
//       attributes: [
//         ['units', 'Units'],
//         ['tagname', 'Tag name'],
//         ['nutrdesc', 'Description']
//       ]
//     },
//     {
//       model: trydb.SourceCD,
//       attributes: [
//         ['src_cd', 'Source CD'],
//         ['srccd_desc', 'Description']
//       ]
//     }
//   ]
// }).then(
//   (items) => {
//     items.forEach((item) => {
//       console.log(JSON.stringify(item));
//     });
//   }
// ).catch(
//   (e) => {
//     console.log(e);
//   }
// );

app.get('/api/:id/:name/:offset/:limit', (req, res) => {
  let dbIndex = parseInt(req.params.id);
  let dbOffset = parseInt(req.params.offset);
  let rowLimit = parseInt(req.params.limit);
  let tableName = req.params.name;
  let dbName = dbUtils.getDBFile(dbIndex);
  if (dbName.length === 0) {
    res.status(400).send({message: 'No database found'});
  } else {
    // dbMethods = require('./db/methods/' + dbName);
    dbMethods = require('./controllers/queries');
    dbMethods.getTableContents(dbIndex, tableName, dbOffset, rowLimit).then(
      (result) => {
        res.send(result);
      }
    ).catch(
      (e) => {
        res.send(e);
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
