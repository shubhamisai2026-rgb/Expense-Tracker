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
document.addEventListener("DOMContentLoaded", function () {

    if(
    localStorage.getItem("darkMode")
    === "true"
)
{
    document.body.classList.add(
        "dark-mode"
    );
}

    if (window.location.pathname === "/expenses") {

        loadExpenses();
        loadCategoryFilter();

    } else if (window.location.pathname === "/categories") {

        loadCategories();

    } else if (window.location.pathname === "/dashboard") {

        loadDashboardStats();
        loadRecentTransactions();

    } else if (window.location.pathname === "/add-expense") {

        loadCategories();

    } else if (window.location.pathname === "/reports") {

        loadReports();

    }
    else if(
    window.location.pathname ===
    "/profile"
){
    loadProfile();
}

});
function loadReports() {

    fetch("/api/reports")
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                document.getElementById("totalThisMonth").textContent =
                    "₹" + data.total_this_month;

                document.getElementById("highestCategory").textContent =
                    data.highest_category;

                document.getElementById("remainingBudget").textContent =
                    "₹" + data.remaining_budget;

                // ADD THIS PART HERE 👇

                document.getElementById("budgetUsageFill").style.width =
                    data.usage_percentage + "%";

                document.getElementById("budgetUsageLabel").textContent =
                    data.usage_percentage + "%";

                if (data.usage_percentage >= 80) {
                    alert(
                        "⚠ Warning! You have used more than 80% of your budget."
                    );
                }

                // Category Breakdown

                const breakdown =
                    document.getElementById("categoryBreakdownList");

                breakdown.innerHTML = "";

                for (const category in data.category_breakdown) {
                    const li = document.createElement("li");

                    li.textContent =
                        `${category} : ₹${data.category_breakdown[category]}`;

                    breakdown.appendChild(li);
                }
                createExpenseChart(
                    data.category_breakdown
                );
                loadMonthlyAnalytics();
            }

        })
        .catch(error =>
            console.error("Error loading reports:", error)
        );
}

function registerUser() {

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let phone =
        document.getElementById("phone").value;

    let username =
        document.getElementById("username").value;

    let budget =
        document.getElementById("budget").value;

    let password =
        document.getElementById("password").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    if (name === "" || email === "" || phone === "" ||
        username === "" || budget === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const userData = {
        name: name,
        email: email,
        phone: phone,
        username: username,
        budget: budget,
        password: password
    };

    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                alert("Registration Successful");
                window.location.href = "/login";
            }
            else {
                alert(data.error);
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}

function togglePassword() {
    let password =
        document.getElementById("password");

    let confirmPassword =
        document.getElementById("confirmPassword");

    if (password.type === "password") {
        password.type = "text";
        confirmPassword.type = "text";
    }
    else {
        password.type = "password";
        confirmPassword.type = "password";
    }
}

async function loginUser() {
    if(
    document.getElementById(
        "rememberMe"
    ).checked
)
{
    localStorage.setItem(
        "savedUsername",
        username
    );
}

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch("/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        });

    const result =
        await response.json();

    if (result.success) {

        alert("Login Successful");

        window.location.href =
            "/dashboard";

    } else {

        alert(result.error);
    }
}
function createExpenseChart(categoryData) {

    const ctx =
        document.getElementById(
            "expenseChart"
        );

    if (!ctx) {
        return;
    }

    new Chart(ctx, {

        type: 'pie',

        data: {

            labels: Object.keys(categoryData),

            datasets: [{
                data: Object.values(categoryData)
            }]
        }
    });
}

function searchExpenses()
{
    let search =
        document.getElementById(
            "searchExpense"
        ).value.toLowerCase();

    let rows =
        document.querySelectorAll(
            "tbody tr"
        );

    rows.forEach(row => {

        if(
            row.textContent
            .toLowerCase()
            .includes(search)
        )
        {
            row.style.display = "";
        }
        else
        {
            row.style.display = "none";
        }

    });
}
function loadCategoryFilter() {
    fetch("/api/categories")
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                const filter =
                    document.getElementById(
                        "categoryFilter"
                    );

                data.categories.forEach(category => {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        category.category_name;

                    option.textContent =
                        category.category_name;

                    filter.appendChild(option);
                });
            }
        });
}
function filterExpenses()
{
    let category =
        document.getElementById(
            "categoryFilter"
        ).value;

    let rows =
        document.querySelectorAll(
            "tbody tr"
        );

    rows.forEach(row => {

        if(
            category === "all"
        )
        {
            row.style.display = "";
        }
        else if(
            row.children[1]
            .textContent === category
        )
        {
            row.style.display = "";
        }
        else
        {
            row.style.display = "none";
        }

    });
}
function exportCSV() {
    window.location.href =
        "/api/export-csv";
}
function exportPDF() {
    window.location.href =
        "/api/export-pdf";
}
function loadMonthlyAnalytics() {
    fetch("/api/monthly-analytics")
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                createMonthlyChart(
                    data.monthly_data
                );
            }
        });
}
function createMonthlyChart(monthlyData) {
    const canvas =
        document.getElementById(
            "monthlyChart"
        );

    if (!canvas) {
        return;
    }

    new Chart(canvas, {

        type: "line",

        data: {

            labels:
                Object.keys(monthlyData),

            datasets: [{

                label:
                    "Monthly Spending",

                data:
                    Object.values(monthlyData)

            }]
        }
    });
}
function sortExpenses()
{
    let table =
        document.querySelector(
            "tbody"
        );

    let rows =
        Array.from(
            table.querySelectorAll(
                "tr"
            )
        );

    let sortType =
        document.getElementById(
            "sortExpenses"
        ).value;

    rows.sort((a,b)=>{

        let amountA =
            parseFloat(
                a.children[3]
                .textContent
                .replace("₹","")
            );

        let amountB =
            parseFloat(
                b.children[3]
                .textContent
                .replace("₹","")
            );

        if(sortType === "low")
        {
            return amountA - amountB;
        }

        return amountB - amountA;
    });

    rows.forEach(row =>
        table.appendChild(row)
    );
}
function loadProfile()
{
    fetch("/api/profile")
    .then(response => response.json())
    .then(data => {

        if(data.success)
        {
            document.getElementById(
                "profileName"
            ).value = data.name;

            document.getElementById(
                "profileEmail"
            ).value = data.email;

            document.getElementById(
                "profilePhone"
            ).value = data.phone;

            document.getElementById(
                "profileBudget"
            ).value = data.budget;
        }

    })
    .catch(error => {
        console.log(error);
    });
}
function toggleDarkMode()
{
    document.body.classList.toggle(
        "dark-mode"
    );

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains(
            "dark-mode"
        )
    );
}
document.addEventListener(
    "DOMContentLoaded",
    function()
{
    let savedUsername =
        localStorage.getItem(
            "savedUsername"
        );

    if(savedUsername)
    {
        document.getElementById(
            "username"
        ).value = savedUsername;
    }
});
function togglePassword()
{
    let password =
        document.getElementById("password");

    let confirmPassword =
        document.getElementById("confirmPassword");

    if(password.type === "password")
    {
        password.type = "text";

        if(confirmPassword)
        {
            confirmPassword.type = "text";
        }
    }
    else
    {
        password.type = "password";

        if(confirmPassword)
        {
            confirmPassword.type = "password";
        }
    }
}
function resetPassword()
{
    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("newPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    if(password !== confirmPassword)
    {
        alert("Passwords do not match");
        return;
    }

    fetch("/api/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {

        if(data.success)
        {
            alert("Password Reset Successful");
            window.location.href = "/login";
        }
        else
        {
           showAlert("❌ " + data.error);
        }

    });
}
function updateProfile()
{
    const profileData = {

        name:
        document.getElementById(
            "profileName"
        ).value,

        email:
        document.getElementById(
            "profileEmail"
        ).value,

        phone:
        document.getElementById(
            "profilePhone"
        ).value,

        budget:
        document.getElementById(
            "profileBudget"
        ).value
    };

    fetch("/api/profile", {

        method: "PUT",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
            profileData
        )

    })
    .then(response => response.json())
    .then(data => {

        if(data.success)
        {
            alert(
                "Profile Updated Successfully"
            );
        }
        else
        {
            showAlert("❌ " + data.error);
        }

    })
    .catch(error => {
      showAlert("❌ " + data.error);
    });
}

function showAlert(message)
{
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert()
{
    document.getElementById("customAlert").style.display = "none";
}