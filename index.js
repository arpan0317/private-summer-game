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


app.listen(process.env.PORT || 3000, () => console.log(`The server has started on port: ${process.env.PORT}`));




// set up mongoose

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  err => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes

app.use("/users", require("./routes/userRouter"));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
