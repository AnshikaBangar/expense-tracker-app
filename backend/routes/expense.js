const express = require("express");

const routes = express.Router();

const manageExpense = require("../controllers/expenses");
const userAuth = require("../middleware/auth");

routes.post("/add-expense", manageExpense.addExpense);

routes.get(
  "/get-expense",
  userAuth.userAuthontication,
  manageExpense.getExpense
);

routes.delete("/delete-expense/:id", manageExpense.deleteExpense);

module.exports = routes;
