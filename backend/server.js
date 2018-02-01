var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');

var sqlConnection = require('./db/config').sqlConnection;

var app = express();
var htmlPATH = path.join(path.join(path.dirname(__dirname), 'frontend'), 'dist');
app.use(express.static(htmlPATH));

var port = process.env.PORT||3000;

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
  res.send('Hello there!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
