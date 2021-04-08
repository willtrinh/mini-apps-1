const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.listen(port, () => console.log(`server is running on port ${port}`));

const checkoutSchema = new mongoose.Schema ({
  name: String,
  email: String,
  password: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  zipcode: String,
  phone: String,
  ccNumber: String,
  expMonth: String,
  expYear: String,
  cvv: String
});
const User = mongoose.model('User', checkoutSchema);

app.post('/', (req, res) => {
  var data = new User(req.body);
  console.log('data ', data);
  res.status(200);
  data.save()
  .then((item) => {
    res.send('item saved to db');
  })
  .catch((err) => {
    res.status(400).send('unable to save item to db');
  })
})
