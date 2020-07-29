const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var path = require('path');
var Cloudant = require('@cloudant/cloudant');
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));




var cloudant = new Cloudant({
  account: '09a9e6fd-144f-4efd-9104-56dbbffae010-bluemix',
  plugins: {
    iamauth: {
      iamApiKey: 'iQA27jc067HbbrD28szbErd-7dxmGjbhAYqXB0L4vIC5'
    }
  }
});

// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes

app.use("/users", require("./routes/userRouter"));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
