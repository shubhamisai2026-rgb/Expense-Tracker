# APP_PY_DOCUMENTATION.md

# Expense Tracker Backend Documentation

## 🎯 Purpose

`app.py` is the central backend file of the Expense Tracker application.

It acts as:

* Application Entry Point
* Route Manager
* API Controller
* Database Connector
* Authentication Manager
* Session Manager
* Reports Engine

Every request from the frontend eventually reaches `app.py`.

---

# 📋 Responsibilities

The backend performs the following major operations:

### User Management

* Register User
* Login User
* Logout User
* Reset Password
* Profile Update

### Expense Management

* Add Expense
* View Expenses
* Update Expense
* Delete Expense

### Category Management

* Add Category
* View Categories
* Delete Categories

### Reports

* Monthly Reports
* Budget Tracking
* Analytics
* CSV Export
* PDF Export

### Security

* Session Validation
* Password Hashing
* Route Protection

---

# 🏗 Application Initialization

## Flask Setup

```python
app = Flask(__name__)
```

Creates Flask Application Instance.

---

## Secret Key

```python
app.secret_key = "expense_tracker_secret"
```

Used for:

* Session Management
* Authentication
* Security

### Future Improvement

Move to:

```env
SECRET_KEY=expense_tracker_secret
```

using environment variables.

---

# 🗄 Database Connection

## MongoDB Setup

```python
client = MongoClient(
    'mongodb://localhost:27017/'
)
```

Connects Flask Application to MongoDB Server.

---

## Database

```python
db = client['expense_tracker']
```

Creates / Connects:

```text
expense_tracker
```

database.

---

# Collections

## users

Stores user accounts.

### Structure

```json
{
    "_id": ObjectId,
    "name": "Shubham",
    "email": "abc@gmail.com",
    "phone": "9876543210",
    "username": "shubham",
    "password": "hashed_password",
    "budget": 50000
}
```

---

## expenses

Stores user expenses.

### Structure

```json
{
    "_id": ObjectId,
    "user_id": "abc123",
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

## categories

Stores categories.

### Structure

```json
{
    "_id": ObjectId,
    "user_id": "abc123",
    "category_name": "Food",
    "created_at": "timestamp"
}
```

---

# 🔐 Authentication Module

## Registration API

### Endpoint

```http
POST /api/register
```

### Purpose

Creates new user account.

### Validation

* Username uniqueness
* Required fields
* Budget conversion

### Password Security

```python
generate_password_hash()
```

Stores encrypted password.

---

## Login API

### Endpoint

```http
POST /api/login
```

### Purpose

Authenticates user.

### Verification

```python
check_password_hash()
```

Used for password verification.

---

## Session Creation

After successful login:

```python
session["username"]
session["user_id"]
```

are created.

---

## Logout

### Endpoint

```http
GET /logout
```

### Operation

```python
session.clear()
```

Removes active session.

---

# 💰 Expense Module

## Create Expense

### Endpoint

```http
POST /api/expenses
```

### Purpose

Insert expense into MongoDB.

### Required Fields

* Expense Name
* Amount
* Category
* Date

---

## Get Expenses

### Endpoint

```http
GET /api/expenses
```

### Purpose

Returns all expenses belonging to logged-in user.

### Security

Uses:

```python
"user_id": session["user_id"]
```

to isolate user data.

---

## Update Expense

### Endpoint

```http
PUT /api/expenses/<id>
```

### Purpose

Modify existing expense.

---

## Delete Expense

### Endpoint

```http
DELETE /api/expenses/<id>
```

### Purpose

Remove expense permanently.

---

# 📁 Category Module

## Add Category

### Endpoint

```http
POST /api/categories
```

Creates new category.

---

## Get Categories

### Endpoint

```http
GET /api/categories
```

Returns categories of current user.

---

## Delete Category

### Endpoint

```http
DELETE /api/categories/<id>
```

Removes category.

---

# 📊 Dashboard Module

## Endpoint

```http
GET /api/dashboard-stats
```

### Purpose

Generates:

* Total Expenses
* Total Amount
* Average Expense

Displayed on Dashboard Page.

---

# 📈 Reports Module

## Endpoint

```http
GET /api/reports
```

### Purpose

Creates financial summary.

### Outputs

* Total Monthly Spending
* Highest Spending Category
* Remaining Budget
* Budget Usage Percentage

---

# 📉 Analytics Module

## Endpoint

```http
GET /api/monthly-analytics
```

### Purpose

Aggregates expenses by month.

### Output Example

```json
{
    "2026-01": 2500,
    "2026-02": 4200,
    "2026-03": 1800
}
```

Used by charts.

---

# 📄 CSV Export Module

## Endpoint

```http
GET /api/export-csv
```

### Purpose

Downloads:

```text
expenses.csv
```

containing all expenses.

---

# 📑 PDF Export Module

## Endpoint

```http
GET /api/export-pdf
```

### Purpose

Generates:

```text
Expense_Report.pdf
```

using ReportLab.

---

# 👤 Profile Module

## Get Profile

```http
GET /api/profile
```

Returns:

* Name
* Email
* Phone
* Budget

---

## Update Profile

```http
PUT /api/profile
```

Updates:

* Name
* Email
* Phone
* Budget

---

# 🔒 Route Protection

Protected Routes:

```text
/dashboard
/add-expense
/expenses
/categories
/reports
/profile
```

Validation:

```python
if "user_id" not in session:
```

Redirects unauthorized users.

---

# ⚠ Error Handling

## 404 Error

```python
@app.errorhandler(404)
```

Shows:

```text
404.html
```

---

## 500 Error

```python
@app.errorhandler(500)
```

Shows:

```text
500.html
```

---

# 🔄 Application Flow

User Register
↓
Login
↓
Session Created
↓
Dashboard
↓
Add Expense
↓
Manage Categories
↓
Generate Reports
↓
Export CSV/PDF
↓
Update Profile
↓
Logout

---

# 🚀 Interview Questions

## Why Flask?

* Lightweight
* Easy Routing
* REST API Friendly
* Fast Development

---

## Why MongoDB?

* Flexible Schema
* JSON-like Documents
* Easy Integration with Python

---

## Why Password Hashing?

Protects user passwords from direct exposure.

---

## Why Sessions?

Maintains login state between requests.

---

## Why ObjectId?

MongoDB uniquely identifies each document using ObjectId.

---

# ✅ Summary

app.py is the heart of the Expense Tracker application.

It manages:

* Authentication
* Expense CRUD
* Categories
* Reports
* Analytics
* Profile Management
* Export Features
* Session Security
* Database Operations

Without app.py the frontend pages cannot communicate with MongoDB.
