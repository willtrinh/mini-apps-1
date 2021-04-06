const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 9000;

app.use(express.static('client'));

app.post('/', (req, res) => {
  res.send('POST request sent');
})

app.listen(port, () => console.log(`server is listening on port ${port}`));
