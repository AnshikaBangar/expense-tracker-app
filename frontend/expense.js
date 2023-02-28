const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
const addExpense = document.getElementById("expense");
const allExpenses = document.getElementById("allExpenses");

//Fetching the expense from database
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const tokenId = localStorage.getItem("token");
    const data = await axios.get("http://localhost:5200/expense/get-expense", {
      headers: { Authorization: tokenId },
    });
    console.log(data);
    const allExpense = data.data.allExpenses;
    for (let i = 0; i < allExpense.length; i++) {
      showOnScreen(allExpense[i]);
    }
  } catch (err) {
    console.log(err);
  }
});

//showing the data on the screen
function showOnScreen(show) {
  try {
    const newExpense = `<li id=${show.id}>${show.amount}-${show.description}-
        ${show.category}-
        <button onclick="deleteExpense(${show.id})">Delete</button></li>`;
    allExpenses.innerHTML = allExpenses.innerHTML + newExpense;
  } catch (err) {
    console.log(err);
  }
}

//deleting the expense
async function deleteExpense(key) {
  try {
    const oneExpense = document.getElementById(key);
    allExpenses.removeChild(oneExpense);
    await axios.delete(`http://localhost:3000/expense/delete-expense/${key}`);
  } catch (err) {
    console.log(err);
  }
}

//Addin a expense to the database
addExpense.addEventListener("click", postExpense);
async function postExpense(e) {
  try {
    e.preventDefault();
    const expense_obj = {
      amount: amount.value,
      description: description.value,
      category: category.value,
    };
    const data = await axios.post(
      "http://localhost:3000/expense/add-expense",
      expense_obj
    );
    showOnScreen(data.data.newExpense);
  } catch (err) {
    console.log(err);
  }
}
