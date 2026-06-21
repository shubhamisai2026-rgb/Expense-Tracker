# MAIN_JS_DOCUMENTATION.md

# Expense Tracker Frontend Logic Documentation

## 🎯 Purpose

`main.js` is the primary JavaScript file of the Expense Tracker application.

It acts as the communication layer between:

* HTML Pages
* Flask Backend APIs
* MongoDB Data

It handles:

* User Authentication
* Expense Management
* Category Management
* Dashboard Updates
* Reports Generation
* Profile Updates
* Search & Filtering
* Dark Mode

---

# 📋 Responsibilities

### User Operations

* Register User
* Login User
* Reset Password
* Logout

### Expense Operations

* Save Expense
* Load Expenses
* Edit Expense
* Delete Expense

### Category Operations

* Add Category
* Load Categories
* Delete Category

### Dashboard Operations

* Load Statistics
* Load Recent Transactions

### Reports Operations

* Load Reports
* Load Analytics

### Profile Operations

* Load Profile
* Update Profile

### Utility Functions

* Dark Mode
* Search
* Filter
* Sort

---

# 🔐 Authentication Functions

## registerUser()

### Purpose

Registers new user.

### API

```http
POST /api/register
```

### Data Sent

```json
{
  "name":"Shubham",
  "email":"abc@gmail.com",
  "phone":"9876543210",
  "username":"shubham",
  "budget":"50000",
  "password":"123456"
}
```

### Success Flow

User
↓
Register
↓
API Call
↓
MongoDB Save
↓
Redirect Login

---

## loginUser()

### Purpose

Authenticates user.

### API

```http
POST /api/login
```

### Success Flow

User
↓
Login
↓
Session Created
↓
Dashboard Redirect

---

## resetPassword()

### Purpose

Reset account password.

### API

```http
POST /api/reset-password
```

### Validation

Checks:

```javascript
password === confirmPassword
```

before sending request.

---

# 💰 Expense Functions

## saveExpense()

### Purpose

Create expense.

### Validation

Checks:

* Expense Name
* Amount
* Category
* Date

### API

```http
POST /api/expenses
```

### Flow

User Input
↓
Validation
↓
API Call
↓
MongoDB Save
↓
Expense Page Refresh

---

## loadExpenses()

### Purpose

Display all expenses.

### API

```http
GET /api/expenses
```

### Table Columns

* Expense Name
* Category
* Notes
* Amount
* Date
* Actions

---

## editExpense(expenseId)

### Purpose

Update existing expense.

### API

```http
GET /api/expenses/<id>
PUT /api/expenses/<id>
```

### Flow

Load Expense
↓
Prompt User
↓
Update API
↓
Refresh Table

---

## deleteExpense(expenseId)

### Purpose

Remove expense.

### API

```http
DELETE /api/expenses/<id>
```

### Safety

Uses:

```javascript
confirm()
```

before deletion.

---

# 📁 Category Functions

## loadCategories()

### Purpose

Load categories from database.

### API

```http
GET /api/categories
```

### Used In

* Add Expense Page
* Categories Page

---

## addCategory()

### Purpose

Create category.

### API

```http
POST /api/categories
```

### Validation

Category name cannot be empty.

---

## deleteCategory()

### Purpose

Delete category.

### API

```http
DELETE /api/categories/<id>
```

---

# 📊 Dashboard Functions

## loadDashboardStats()

### Purpose

Populate dashboard cards.

### API

```http
GET /api/dashboard-stats
```

### Updates

* Total Expenses
* Total Amount
* Average Expense

---

## loadRecentTransactions()

### Purpose

Show latest transactions.

### API

```http
GET /api/expenses
```

### Display Limit

Latest 4 expenses.

---

# 📈 Reports Functions

## loadReports()

### Purpose

Load report summary.

### API

```http
GET /api/reports
```

### Displays

* Total Monthly Spending
* Highest Category
* Remaining Budget
* Budget Usage %

---

## loadMonthlyAnalytics()

### Purpose

Load chart data.

### API

```http
GET /api/monthly-analytics
```

### Example

```json
{
  "2026-01":2500,
  "2026-02":4000,
  "2026-03":1800
}
```

Used for graph generation.

---

# 👤 Profile Functions

## loadProfile()

### Purpose

Load profile details.

### API

```http
GET /api/profile
```

### Loads

* Name
* Email
* Phone
* Budget

---

## updateProfile()

### Purpose

Update user profile.

### API

```http
PUT /api/profile
```

### Updates

* Name
* Email
* Phone
* Budget

---

# 🔍 Search Functions

## searchExpenses()

### Purpose

Search expenses instantly.

### Search Areas

* Expense Name
* Category
* Notes

### Type

Client-side filtering.

---

# 🎯 Filter Functions

## filterExpenses()

### Purpose

Filter expenses by category.

### Example

```text
Food
Travel
Shopping
Bills
```

Only selected category remains visible.

---

# 📊 Sort Functions

## sortExpenses()

### Purpose

Sort expenses by amount.

### Options

#### Low → High

```text
100
500
1000
5000
```

#### High → Low

```text
5000
1000
500
100
```

---

# 🌙 Dark Mode

## toggleDarkMode()

### Purpose

Switch between:

* Light Theme
* Dark Theme

### Process

Button Click
↓
Add CSS Class
↓
Store Preference
↓
Apply Theme

---

# 🚀 Page Auto Loading

Uses:

```javascript
DOMContentLoaded
```

to determine current page.

Example:

```javascript
/dashboard
```

loads dashboard functions.

```javascript
/profile
```

loads profile data.

```javascript
/reports
```

loads report analytics.

---

# 🔄 Frontend Request Flow

User Action
↓
JavaScript Function
↓
Fetch API
↓
Flask Route
↓
MongoDB
↓
JSON Response
↓
Update UI

---

# 🎓 Interview Questions

## Why Fetch API?

Used for communication between frontend and backend.

---

## Why JSON?

Lightweight format for data transfer.

---

## Why DOM Manipulation?

Allows dynamic updates without page reload.

---

## Why Event Listeners?

Respond to user interactions.

---

## Difference Between GET and POST?

GET:

* Read data

POST:

* Send/Create data

---

# ✅ Summary

main.js is the brain of the frontend.

It handles:

* Authentication
* Expenses
* Categories
* Dashboard
* Reports
* Profile
* Search
* Filter
* Sorting
* Dark Mode

Without main.js, the frontend pages would be static and unable to communicate with Flask APIs.
