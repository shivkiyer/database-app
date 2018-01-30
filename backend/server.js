var express = require('express');
var path = require('path');

var sqlConnection = require('./db/config').sqlConnection;

var app = express();
var htmlPATH = path.join(path.join(path.dirname(__dirname), 'frontend'), 'dist');
app.use(express.static('/mnt/sda6/database-app/frontend/src/'));

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

var {categoriesList} = require('./db/methods/dellstore2');

categoriesList();

app.get('/', (req, res) => {
  console.log("GET request on /");
  res.send('Hello there!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
