let titleInput = document.getElementById("title");
let amountInput = document.getElementById("amount");
let addBtn = document.getElementById("add-btn");
let expenseList = document.getElementById("expense-list");
let totalAmountEl = document.getElementById("total-amount");

/* BROKEN: LocalStorage loaded incorrectly */
let expenses;
try {
  expenses = JSON.parse(localStorage.getItem("expenses"));
} catch {
  expenses = []; // sometimes loads null
}

/* WRONG total calculation (intentional bug) */
  let total = 0;

function updateTotalAdd(expenses) {
if (expenses!=0){
  // missing logic to sum amounts
  total=total+Number(expenses);
  totalAmountEl.innerText = total;
}
}

function updateTotalDelete(expenses) {

  // missing logic to sum amounts
total=total-Number(expenses);
  totalAmountEl.innerText = total;
}

/* Does NOT save properly */
function saveData() {
  localStorage.setItem("expenses", expenses);
}

/* BROKEN RENDER FUNCTION */
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((exp, index) => {
    let li = document.createElement("li");
    li.classList.add("expense-item");

    /* Amount missing ₹ sometimes */
    li.innerHTML = `
      <span>${exp.title} - ${exp.amount}</span>
      <span class="delete-btn" onclick="deleteExpense(${index})">X</span>
    `;

    expenseList.appendChild(li);
  });

  // missing updateTotal() here (INTENTIONAL BUG)
}

addBtn.addEventListener("click", () => {
  let title = titleInput.value;
  let amount = Number(amountInput.value);

  /* Allows empty title, zero & negative amounts */
  let expense = {
    title: title,
    amount: amount
  };

  /* BROKEN push logic */
  if (!expenses) {
    expenses = [];
  }

  expenses.push(expense);

  updateTotalAdd(amount);

  saveData();
  renderExpenses();

  titleInput.value = "";
  amountInput.value = "";
});

/* BROKEN DELETE FEATURE */
function deleteExpense(index) {
  updateTotalDelete(Number(expenses[index].amount))
  expenses.splice(index, 1);
  saveData();
  renderExpenses();
  /* missing updateTotal() */
}

/* Render BEFORE data is loaded properly */
renderExpenses();
