# EXPENSES_HTML_DOCUMENTATION.md

# Expense Tracker Expenses Module Documentation

## 🎯 Purpose

The Expenses Page is the expense management center of the Expense Tracker application.

This page allows users to:

* View all expenses
* Search expenses
* Filter expenses
* Sort expenses
* Edit expenses
* Delete expenses

This page implements the complete CRUD lifecycle.

CRUD means:

```text
Create
Read
Update
Delete
```

---

# 📋 Objectives

The Expenses page helps users:

### View Expenses

Display all expense records.

---

### Search Expenses

Quickly find specific records.

---

### Filter Expenses

Display category-specific expenses.

---

### Sort Expenses

Arrange expenses by amount.

---

### Manage Expenses

Edit and delete records.

---

# 🏗 Page Structure

```text
Expenses Page
│
├── Navigation Bar
│
├── Page Header
│
├── Search Box
│
├── Filter Dropdown
│
├── Sort Dropdown
│
├── Expense Table
│
├── Action Buttons
│
└── Footer
```

---

# 🧭 Navigation Bar

## Purpose

Navigate across modules.

### Links

```text
Dashboard

Add Expense

Expenses

Categories

Reports

Profile

Logout
```

---

# 🔍 Search Section

## Purpose

Find expenses instantly.

---

## Input Type

```html
<input type="text">
```

---

## Example Searches

```text
Pizza

Fuel

Movie

Food
```

---

## JavaScript Function

```javascript
searchExpenses()
```

---

## Working

Search compares:

```text
Expense Name

Category

Notes
```

against user input.

---

## Example

Search:

```text
Pizza
```

Result:

```text
Pizza ₹350
```

Only matching rows remain visible.

---

# 📁 Filter Section

## Purpose

Display expenses from selected category.

---

## Input Type

```html
<select>
```

---

## Example Categories

```text
All

Food

Travel

Shopping

Bills

Entertainment
```

---

## JavaScript Function

```javascript
filterExpenses()
```

---

## Example

Selected:

```text
Food
```

Result:

```text
Pizza

Burger

Lunch
```

Only Food expenses visible.

---

# 📊 Sort Section

## Purpose

Arrange expenses by amount.

---

## Options

### Low → High

```text
100

200

500

1000
```

---

### High → Low

```text
1000

500

200

100
```

---

## JavaScript Function

```javascript
sortExpenses()
```

---

# 📜 Expense Table

## Purpose

Display all expense records.

---

## Columns

```text
Expense Name

Category

Notes

Amount

Date

Actions
```

---

# Column 1

## Expense Name

Examples:

```text
Pizza

Fuel

Movie Ticket

Groceries
```

---

# Column 2

## Category

Examples:

```text
Food

Travel

Shopping
```

---

# Column 3

## Notes

Examples:

```text
Dinner

Petrol Refill

Weekend Movie
```

---

# Column 4

## Amount

Examples:

```text
₹350

₹1200

₹5000
```

---

# Column 5

## Date

Examples:

```text
2026-06-20

2026-06-21
```

---

# Column 6

## Actions

Contains:

```text
Edit

Delete
```

buttons.

---

# ✏ Edit Expense

## Purpose

Update expense information.

---

## JavaScript Function

```javascript
editExpense(expenseId)
```

---

## Backend APIs

### Get Expense

```http
GET /api/expenses/<id>
```

---

### Update Expense

```http
PUT /api/expenses/<id>
```

---

## Workflow

```text
Click Edit
      ↓

Load Expense
      ↓

Modify Values
      ↓

Save Changes
      ↓

Database Updated
```

---

# 🗑 Delete Expense

## Purpose

Remove expense permanently.

---

## JavaScript Function

```javascript
deleteExpense(expenseId)
```

---

## Backend API

```http
DELETE /api/expenses/<id>
```

---

## Safety Confirmation

```javascript
confirm()
```

used before deletion.

---

## Workflow

```text
Click Delete
      ↓

Confirmation
      ↓

Delete API
      ↓

MongoDB Delete
      ↓

Refresh Table
```

---

# 🔄 Backend Communication

## Load Expenses

```http
GET /api/expenses
```

---

## Create Expense

```http
POST /api/expenses
```

---

## Update Expense

```http
PUT /api/expenses/<id>
```

---

## Delete Expense

```http
DELETE /api/expenses/<id>
```

---

# 🔒 Security

All expense APIs require authentication.

Validation:

```python
if "user_id" not in session:
```

---

## Data Isolation

Every query uses:

```python
"user_id": session["user_id"]
```

---

## Example

User A

```text
Pizza ₹350
```

cannot access

User B

```text
Fuel ₹1200
```

records.

---

# 🗄 Database Mapping

## Expense Document

```json
{
    "_id": ObjectId,

    "user_id": "123",

    "expense_name": "Pizza",

    "amount": 350,

    "category": "Food",

    "date": "2026-06-20",

    "notes": "Dinner",

    "created_at": "timestamp",

    "updated_at": "timestamp"
}
```

---

# 📱 Responsive Design

## Desktop

Full-width table.

---

## Tablet

Responsive columns.

---

## Mobile

Horizontal scroll.

Optimized controls.

---

# 🌙 Dark Mode Support

Supports:

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

# 🎨 UI Components

## Search Box

Used for instant filtering.

---

## Dropdown

Used for:

* Category Filter
* Sorting

---

## Table

Used for displaying expenses.

---

## Buttons

Used for:

* Edit
* Delete

---

# 🚀 User Workflow

```text
Login
   ↓

Open Expenses
   ↓

View Records
   ↓

Search / Filter
   ↓

Edit Expense
   ↓

Save Changes
   ↓

Delete Unwanted Records
   ↓

Updated Expense List
```

---

# 🎓 Interview Questions

## What is CRUD?

Create, Read, Update, Delete.

---

## Why Search Feature?

Improves usability.

---

## Why Filter Feature?

Allows category-based analysis.

---

## Why Sort Feature?

Makes data easier to analyze.

---

## Why Confirm Before Delete?

Prevents accidental data loss.

---

## Why use Expense ID?

Uniquely identifies records.

---

## Why separate user data?

For privacy and security.

---

# 📊 Success Criteria

Expenses page is complete when:

✅ All expenses load

✅ Search works

✅ Filter works

✅ Sorting works

✅ Edit works

✅ Delete works

✅ User data isolation works

✅ Mobile responsive design works

✅ Dark mode works

---

# ✅ Summary

The Expenses Page is the primary management module of the Expense Tracker application.

It provides:

* Expense Viewing
* Expense Searching
* Expense Filtering
* Expense Sorting
* Expense Editing
* Expense Deletion
* User Data Security

This page demonstrates complete CRUD functionality and is one of the most important modules during project demonstrations and technical interviews.
