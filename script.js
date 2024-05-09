let totalIncome = 0;
let totalExpenditure = 0;
let transactions = [];

function addIncome() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (!isNaN(amount) && amount > 0) {
    totalIncome += amount;
    transactions.push({ type: "Income", amount: amount, time: new Date() });
    updateSummary();
    updateTransactionHistory();
  }
}

function addExpenditure() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (!isNaN(amount) && amount > 0) {
    totalExpenditure += amount;
    transactions.push({ type: "Expenditure", amount: amount, time: new Date() });
    updateSummary();
    updateTransactionHistory();
  }
}

function updateSummary() {
  const balance = totalIncome - totalExpenditure;
  const balanceElement = document.getElementById("balance-value");
  balanceElement.textContent = balance.toFixed(2);

  const savingsElement = document.getElementById("savings-value");
  savingsElement.textContent = balance.toFixed(2);
  if (balance >= 0) {
    savingsElement.style.color = "green";
    savingsElement.textContent = "Savings: " + balance.toFixed(2);
  } else {
    savingsElement.style.color = "red";
    savingsElement.textContent = "Loss: " + balance.toFixed(2);
  }

  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expenditure").textContent = totalExpenditure.toFixed(2);
}

function updateTransactionHistory() {
  const transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = "";
  transactions.forEach(transaction => {
    const listItem = document.createElement("li");
    const date = new Date(transaction.time);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    listItem.textContent = `${formattedDate} - ${transaction.type}: $${transaction.amount.toFixed(2)}`;
    transactionList.appendChild(listItem);
  });
}
