# DASHBOARD_HTML_DOCUMENTATION.md

# Expense Tracker Dashboard Documentation

## 🎯 Purpose

The Dashboard is the home page after login.

It provides a quick overview of the user's financial status.

The dashboard acts as a control center where users can:

* View spending statistics
* Monitor expenses
* Access reports
* Manage categories
* Add new expenses

---

# 📋 Objectives

The Dashboard should help users answer:

### How many expenses have I added?

### How much money have I spent?

### What is my average expense?

### What are my recent transactions?

### What should I do next?

---

# 🏗 Page Structure

```text
Dashboard
│
├── Navigation Bar
│
├── Welcome Section
│
├── Dashboard Header
│
├── Summary Cards
│
├── Recent Transactions
│
├── Quick Actions
│
└── Footer
```

---

# 👋 Welcome Section

## Purpose

Greets logged-in user.

### Example

```text
Welcome, Shubham
```

Loaded using:

```python
session["username"]
```

---

# 📊 Dashboard Header

## Purpose

Introduces dashboard functionality.

### Example

```text
Expense Dashboard

Track your spending and manage your finances.
```

---

# 💰 Summary Cards Section

## Purpose

Provides quick financial insights.

---

## Card 1

### Total Expenses

Shows:

```text
25
```

Meaning:

Total number of expenses added.

---

## Card 2

### Total Amount Spent

Shows:

```text
₹12,500
```

Formula:

```text
Sum(All Expense Amounts)
```

---

## Card 3

### Average Expense

Shows:

```text
₹500
```

Formula:

```text
Total Spending / Total Expenses
```

---

# 🔄 Data Source

Loaded using:

```http
GET /api/dashboard-stats
```

---

# 📜 Recent Transactions

## Purpose

Displays latest expenses.

---

## Example

```text
Expense      Category     Amount

Pizza        Food         ₹350

Fuel         Travel       ₹1200

Movie        Entertainment ₹500
```

---

## Data Source

```http
GET /api/expenses
```

---

## Display Logic

Only latest transactions shown.

Typically:

```text
Last 4 Expenses
```

---

# ⚡ Quick Actions Section

## Purpose

Provides shortcuts.

---

## Button 1

### Add Expense

Redirects:

```text
/add-expense
```

Purpose:

Quickly add new expense.

---

## Button 2

### View Reports

Redirects:

```text
/reports
```

Purpose:

Analyze spending.

---

## Button 3

### Manage Categories

Redirects:

```text
/categories
```

Purpose:

Create and manage categories.

---

# 🧭 Navigation Menu

## Purpose

Move across application.

### Links

```text
Profile

Dashboard

Add Expense

Expenses

Categories

Reports

Logout
```

---

# 🌙 Dark Mode Support

Dashboard supports:

### Light Theme

```text
White Background
Dark Text
```

---

### Dark Theme

```text
Dark Background
White Text
```

---

# 📱 Responsive Design

## Desktop

* Full cards layout
* Wide tables

---

## Tablet

* Responsive cards

---

## Mobile

* Stacked layout
* Scrollable tables

---

# 🔒 Security

Dashboard requires login.

Validation:

```python
if "username" not in session:
```

Unauthorized users redirected to:

```text
/login
```

---

# 🔄 Dashboard Workflow

```text
User Login
      ↓

Dashboard Opens
      ↓

Load Statistics
      ↓

Load Transactions
      ↓

Display Summary
      ↓

User Takes Action
```

---

# 🎨 UI Components

## Summary Cards

Used for:

* Expense Count
* Spending Amount
* Average Expense

---

## Tables

Used for:

* Recent Transactions

---

## Buttons

Used for:

* Quick Actions

---

# 🚀 Backend APIs Used

## Dashboard Statistics

```http
GET /api/dashboard-stats
```

Returns:

```json
{
    "total_expenses": 25,
    "total_amount": 12500,
    "average_amount": 500
}
```

---

## Recent Transactions

```http
GET /api/expenses
```

Returns:

Expense records.

---

# 🎓 Interview Questions

## Why Dashboard?

Provides quick financial overview.

---

## Why Summary Cards?

Important information visible immediately.

---

## Why Recent Transactions?

Users can monitor latest spending.

---

## Why Quick Actions?

Improves usability.

---

## Why API-Based Loading?

Data updates dynamically.

---

# 📊 Success Criteria

Dashboard complete when:

✅ Welcome message displays

✅ Total Expenses loads

✅ Total Amount loads

✅ Average Expense loads

✅ Recent Transactions loads

✅ Quick Actions work

✅ Responsive design works

✅ Dark Mode works

---

# ✅ Summary

Dashboard is the financial control center of Expense Tracker.

It provides:

* Spending Overview
* Statistics
* Recent Transactions
* Quick Actions
* Fast Navigation

The dashboard gives users an immediate understanding of their financial activity.
