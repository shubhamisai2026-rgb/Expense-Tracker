# API_DOCUMENTATION.md

# Expense Tracker API Documentation

## 🎯 Purpose

This document describes all backend APIs used in the Expense Tracker application.

These APIs allow communication between:

```text
Frontend (HTML + JS)
          ↓
Flask Backend
          ↓
MongoDB Database
```

---

# Base URL

```http
http://localhost:5000
```

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /api/register
```

### Purpose

Create new user account.

### Request

```json
{
    "name":"Shubham",
    "email":"shubham@gmail.com",
    "phone":"9876543210",
    "username":"shubham",
    "budget":"50000",
    "password":"123456"
}
```

### Success Response

```json
{
    "success": true
}
```

---

## Login User

### Endpoint

```http
POST /api/login
```

### Request

```json
{
    "username":"shubham",
    "password":"123456"
}
```

### Success Response

```json
{
    "success": true
}
```

---

## Reset Password

### Endpoint

```http
POST /api/reset-password
```

### Request

```json
{
    "username":"shubham",
    "password":"newpassword"
}
```

### Success Response

```json
{
    "success": true
}
```

---

# Expense APIs

## Add Expense

### Endpoint

```http
POST /api/expenses
```

### Request

```json
{
    "expense_name":"Pizza",
    "amount":350,
    "category":"Food",
    "date":"2026-06-20",
    "notes":"Dinner"
}
```

### Success Response

```json
{
    "success": true
}
```

---

## Get Expenses

### Endpoint

```http
GET /api/expenses
```

### Success Response

```json
{
    "success": true,
    "expenses":[]
}
```

---

## Update Expense

### Endpoint

```http
PUT /api/expenses/<expense_id>
```

### Success Response

```json
{
    "success": true
}
```

---

## Delete Expense

### Endpoint

```http
DELETE /api/expenses/<expense_id>
```

### Success Response

```json
{
    "success": true
}
```

---

# Category APIs

## Add Category

### Endpoint

```http
POST /api/categories
```

### Request

```json
{
    "category_name":"Food"
}
```

---

## Get Categories

### Endpoint

```http
GET /api/categories
```

---

## Delete Category

### Endpoint

```http
DELETE /api/categories/<category_id>
```

---

# Dashboard APIs

## Dashboard Statistics

### Endpoint

```http
GET /api/dashboard-stats
```

### Response

```json
{
    "total_expenses":25,
    "total_amount":12000,
    "average_amount":480
}
```

---

# Reports APIs

## Reports Summary

### Endpoint

```http
GET /api/reports
```

### Response

```json
{
    "total_this_month":12000,
    "highest_category":"Food",
    "remaining_budget":38000,
    "usage_percentage":24
}
```

---

## Monthly Analytics

### Endpoint

```http
GET /api/monthly-analytics
```

### Response

```json
{
    "2026-01":2000,
    "2026-02":3500,
    "2026-03":5000
}
```

---

## Export CSV

### Endpoint

```http
GET /api/export-csv
```

### Output

```text
expenses.csv
```

---

## Export PDF

### Endpoint

```http
GET /api/export-pdf
```

### Output

```text
Expense_Report.pdf
```

---

# Profile APIs

## Get Profile

### Endpoint

```http
GET /api/profile
```

### Response

```json
{
    "name":"Shubham",
    "email":"shubham@gmail.com",
    "phone":"9876543210",
    "budget":50000
}
```

---

## Update Profile

### Endpoint

```http
PUT /api/profile
```

### Request

```json
{
    "name":"Shubham",
    "email":"shubham@gmail.com",
    "phone":"9876543210",
    "budget":50000
}
```

---

# Error Responses

## Unauthorized

```json
{
    "success": false,
    "error":"Login Required"
}
```

---

## Validation Error

```json
{
    "success": false,
    "error":"Invalid Data"
}
```

---

# Security Notes

* Passwords are hashed.
* Sessions protect routes.
* User data is isolated using user_id.
* MongoDB ObjectId identifies documents.

---

# API Summary

Total APIs:

```text
Authentication APIs : 3

Expense APIs : 4

Category APIs : 3

Dashboard APIs : 1

Reports APIs : 4

Profile APIs : 2

Total APIs : 17
```
