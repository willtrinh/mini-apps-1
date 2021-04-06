const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const app = express();
const port = 9000;
// This object will contain key-value pairs,
//where the value can be a string or array (when extended is false),
// or any type (when extended is true).
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));

// convert json data to csv
const jsonToCsv = (obj) => {
  fs.appendFile('./data/result.csv', obj.join(',') + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// Get children data of parsed data
const getChildren = (obj) => {
  var children = Object.values(obj);
  // remove the nested children array
  children.splice(children.length - 1);
  jsonToCsv(children);
  // recursively get nested data
  for (child of obj.children) {
    getChildren(child);
  }
}

// post requests handler
app.post('/', (req, res) => {
  var parsedData = JSON.parse(req.body.data);
  var keysArr = Object.keys(parsedData);
  // remove the children element from array
  keysArr.pop();
  // add json data keys
  fs.writeFile('./data/result.csv', keysArr.join(',') + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  })

  // get nested data
  getChildren(parsedData);

  // send file back to the user to download
  var filePath = { root: path.join(__dirname, './data') };
  var file = 'result.csv';
  fs.readFile('./data/result.csv', 'utf8', (err) => {
    if (err) {
      console.log('can\'t read file. ', err);
    } else {
      res.sendFile(file, filePath, (err) => {
        if (err) {
          console.log('unable to send csv file. ', err);
        }
      });
    }
  })
});


app.listen(port, () => console.log(`server is listening on port ${port}`));
