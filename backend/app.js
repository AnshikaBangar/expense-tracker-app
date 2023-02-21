const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const signup = require("./routes/user");
const sequelize = require("./utils/database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/signup", signup);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
