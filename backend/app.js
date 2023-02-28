const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const signup = require("./routes/user");
const sequelize = require("./utils/database");
const expenseDetail=require("./routes/expense");

const User=require("./models/signupdb")
const Expense=require("./models/expensedb")

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/user", signup);
app.use("/expense",expenseDetail);

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
