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
app.set('views', htmlPATH);

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


app.get('/api', (req, res) => {
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
