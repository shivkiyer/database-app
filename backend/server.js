var express = require('express');

var sqlConnection = require('./db/config').sqlConnection;

var app = express();
var port = process.env.PORT||3000;

sqlConnection.authenticate().then(
  () => {
    console.log("Connection to SQL database established");
    sqlConnection.close();
  }
).catch(
  (e) => {
    console.log(e);
  }
);

app.get('/', (req, res) => {
  console.log("GET request on /");
  res.send('Hello there!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
