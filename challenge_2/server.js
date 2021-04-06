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
  var keysArr = Object.keys(parsedData).join(',');
  // console.log(keysArr);
  getChildren(parsedData);
  res.end();
});

// Get children data of parsed data
const getChildren = (obj) => {
  var children = Object.values(obj);
  children.splice(children.length - 1, 1);
  console.log(children);
  // recursively get nested data
  for (child of obj.children) {
    getChildren(child);
  }

}





app.listen(port, () => console.log(`server is listening on port ${port}`));
