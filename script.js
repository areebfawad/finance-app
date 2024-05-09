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
    clearInput();
  }
}

function addExpenditure() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (!isNaN(amount) && amount > 0) {
    totalExpenditure += amount;
    transactions.push({ type: "Expenditure", amount: amount, time: new Date() });
    updateSummary();
    updateTransactionHistory();
    clearInput();
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
  const transactionTable = document.getElementById("transaction-table");
  const tbody = transactionTable.querySelector("tbody");
  tbody.innerHTML = "";
  
  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");
    
    // Transaction Type
    const typeCell = document.createElement("td");
    typeCell.textContent = transaction.type;
    row.appendChild(typeCell);
    
    // Date
    const dateCell = document.createElement("td");
    const date = new Date(transaction.time);
    dateCell.textContent = date.toLocaleDateString();
    row.appendChild(dateCell);
    
    // Time
    const timeCell = document.createElement("td");
    timeCell.textContent = date.toLocaleTimeString();
    row.appendChild(timeCell);
    
    // Balance
    const balanceCell = document.createElement("td");
    const balance = calculateBalance(index);
    balanceCell.textContent = balance.toFixed(2);
    row.appendChild(balanceCell);
    
    tbody.appendChild(row);
  });
}

function calculateBalance(transactionIndex) {
  let balance = 0;
  for (let i = 0; i <= transactionIndex; i++) {
    const transaction = transactions[i];
    if (transaction.type === "Income") {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  }
  return balance;
}

function clearInput() {
  document.getElementById("amount").value = ""; // Reset input field to empty string
}
 