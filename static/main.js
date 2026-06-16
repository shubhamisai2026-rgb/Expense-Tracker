// ===== EXPENSE FUNCTIONS =====

function saveExpense() {
    let expense = document.getElementById("expenseName").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let notes = document.getElementById("notes").value;

    if (expense === "" || amount === "" || category === "" || date === "") {
        alert("Please fill all required fields");
        return;
    }

    const expenseData = {
        expense_name: expense,
        amount: amount,
        category: category,
        date: date,
        notes: notes
    };

    fetch("/api/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Expense saved successfully!");
            document.getElementById("expenseForm").reset();
            window.location.href = "/expenses";
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => alert("Error saving expense: " + error));
}

function loadExpenses() {
    fetch("/api/expenses")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tbody = document.querySelector("table tbody");
            tbody.innerHTML = "";
            
            if (data.expenses.length === 0) {
                tbody.innerHTML = "<tr><td colspan='5'>No expenses found</td></tr>";
                return;
            }
            
            data.expenses.forEach(expense => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${expense.expense_name}</td>
                    <td>${expense.category}</td>
                    <td>${expense.notes || "-"}</td>
                    <td>₹${expense.amount}</td>
                    <td>${expense.date}</td>
                    <td>
                        <button onclick="editExpense('${expense._id}')">Edit</button>
                        <button onclick="deleteExpense('${expense._id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    })
    .catch(error => console.error("Error loading expenses:", error));
}

function editExpense(expenseId) {
    fetch(`/api/expenses/${expenseId}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const expense = data.expense;
            const newAmount = prompt("Enter new amount:", expense.amount);
            if (newAmount === null) return;
            
            const updateData = {
                expense_name: expense.expense_name,
                amount: newAmount,
                category: expense.category,
                date: expense.date,
                notes: expense.notes
            };
            
            fetch(`/api/expenses/${expenseId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Expense updated successfully!");
                    loadExpenses();
                } else {
                    alert("Error: " + data.error);
                }
            });
        }
    })
    .catch(error => alert("Error fetching expense: " + error));
}

function deleteExpense(expenseId) {
    if (confirm("Are you sure you want to delete this expense?")) {
        fetch(`/api/expenses/${expenseId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Expense deleted successfully!");
                loadExpenses();
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => alert("Error deleting expense: " + error));
    }
}

// ===== CATEGORY FUNCTIONS =====

function loadCategories() {
    fetch("/api/categories")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const categorySelect = document.getElementById("category");
            const categoryList = document.getElementById("categoryList");
            
            // Clear existing options except default
            if (categorySelect) {
                while (categorySelect.options.length > 1) {
                    categorySelect.remove(1);
                }
            }
            
            // Clear category list if exists
            if (categoryList) {
                categoryList.innerHTML = "";
            }
            
            data.categories.forEach(cat => {
                // Add to select dropdown
                if (categorySelect) {
                    const option = document.createElement("option");
                    option.value = cat.category_name;
                    option.textContent = cat.category_name;
                    categorySelect.appendChild(option);
                }
                
                // Add to category list for management
                if (categoryList) {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        ${cat.category_name}
                        <button onclick="deleteCategory('${cat._id}')">Delete</button>
                    `;
                    categoryList.appendChild(li);
                }
            });
        }
    })
    .catch(error => console.error("Error loading categories:", error));
}

function addCategory() {
    let category = document.getElementById("categoryInput").value;

    if (category === "") {
        alert("Please enter category name");
        return;
    }

    const categoryData = {
        category_name: category
    };

    fetch("/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Category added successfully!");
            document.getElementById("categoryInput").value = "";
            loadCategories();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => alert("Error adding category: " + error));
}

function deleteCategory(categoryId) {
    if (confirm("Are you sure you want to delete this category?")) {
        fetch(`/api/categories/${categoryId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Category deleted successfully!");
                loadCategories();
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => alert("Error deleting category: " + error));
    }
}

// ===== DASHBOARD FUNCTIONS =====

function loadDashboardStats() {
    fetch("/api/dashboard-stats")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const totalElement = document.getElementById("totalExpenses");
            const amountElement = document.getElementById("totalAmount");
            const averageElement = document.getElementById("averageExpense");
            
            if (totalElement) totalElement.textContent = data.total_expenses;
            if (amountElement) amountElement.textContent = "₹" + data.total_amount.toFixed(2);
            if (averageElement) averageElement.textContent = "₹" + data.average_amount;
        }
    })
    .catch(error => console.error("Error loading dashboard stats:", error));
}

function loadRecentTransactions() {
    fetch("/api/expenses")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tbody = document.getElementById("recentTransactionsBody");
            tbody.innerHTML = "";

            const recentExpenses = data.expenses.slice(0, 4);
            if (recentExpenses.length === 0) {
                tbody.innerHTML = "<tr><td colspan='3'>No recent transactions found</td></tr>";
                return;
            }

            recentExpenses.forEach(expense => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${expense.expense_name}</td>
                    <td>${expense.category}</td>
                    <td>₹${expense.amount}</td>
                `;
                tbody.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error("Error loading recent transactions:", error);
        const tbody = document.getElementById("recentTransactionsBody");
        if (tbody) {
            tbody.innerHTML = "<tr><td colspan='3'>Unable to load recent transactions</td></tr>";
        }
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Load data when page loads
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "/expenses") {
        loadExpenses();
    } else if (window.location.pathname === "/categories") {
        loadCategories();
    } else if (window.location.pathname === "/dashboard") {
        loadDashboardStats();
        loadRecentTransactions();
    } else if (window.location.pathname === "/add-expense") {
        loadCategories();
    }
});
