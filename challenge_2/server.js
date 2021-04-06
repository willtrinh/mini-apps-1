const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 9000;
// This object will contain key-value pairs,
//where the value can be a string or array (when extended is false),
// or any type (when extended is true).
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));

app.post('/converter', (req, res) => {
  var parsedData = JSON.parse(req.body.data);
  console.log(Object.keys(parsedData));
  res.send('hello');
})





app.listen(port, () => console.log(`server is listening on port ${port}`));
