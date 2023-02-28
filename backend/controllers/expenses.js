const expensedatabase = require("../models/expensedb");

exports.addExpense = async (req, res) => {
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    console.log(amount, description, category);
    const data = await expensedatabase.create({
      amount: amount,
      description: description,
      category: category,
      userId:expenseId
    });
    res.json({ newExpense: data });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
};

let expenseId;

exports.getExpense = async (req, res) => {
  expenseId = req.user.id;
  try {
    const data = await expensedatabase.findAll({
      where: { userId: expenseId },
    });
    res.json({ allExpenses: data });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleteExpenseId = req.params.id;
    const data = await expensedatabase.destroy({
      where: { id: deleteExpenseId },
    });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
};
