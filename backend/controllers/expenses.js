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
    });
    res.json({ newExpense: data });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const data = await expensedatabase.findAll();
    res.json({ allExpenses: data });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const data = await expensedatabase.destroy({ where: { id: expenseId } });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
};
