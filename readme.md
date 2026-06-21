# 💰 Expense Tracker

A Full Stack Expense Tracker Web Application built using **Flask, MongoDB, HTML, CSS, and JavaScript** to help users manage daily expenses, track budgets, analyze spending habits, and generate financial reports.

---

# 📌 Project Overview

Expense Tracker is a personal finance management application that allows users to:

* Register and manage accounts
* Track daily expenses
* Organize expenses by categories
* Set monthly budgets
* Analyze spending patterns
* Export reports in CSV and PDF formats
* Monitor financial activity through dashboards and analytics

---

# 🚀 Features

## 🔐 Authentication Module

* User Registration
* User Login
* Logout
* Forgot Password
* Password Hashing
* Session Management

---

## 💰 Expense Management

* Add Expense
* View Expenses
* Edit Expense
* Delete Expense
* Search Expenses
* Filter Expenses
* Sort Expenses

---

## 📁 Category Management

* Create Categories
* View Categories
* Delete Categories
* User-Specific Categories

---

## 📊 Dashboard

* Total Expenses Count
* Total Amount Spent
* Average Expense
* Recent Transactions
* Quick Actions

---

## 📈 Reports & Analytics

* Monthly Spending Summary
* Highest Spending Category
* Remaining Budget
* Budget Usage Percentage
* Monthly Analytics
* Category Breakdown
* Expense Distribution

---

## 📤 Export Features

* Export Expenses to CSV
* Export Expenses to PDF

---

## 👤 Profile Management

* View Profile
* Update Profile
* Budget Management

---

## 🌙 User Experience

* Dark Mode
* Responsive Design
* Mobile Friendly UI
* Modern Dashboard Layout

---

# 🛠 Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Python
* Flask

## Database

* MongoDB

## Libraries

* PyMongo
* Werkzeug
* ReportLab

---

# 📂 Project Structure

```text
ExpenseTracker
│
├── app.py
│
├── static
│   ├── style.css
│   └── main.js
│
├── templates
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── forgot_password.html
│   ├── dashboard.html
│   ├── add-expense.html
│   ├── expenses.html
│   ├── categories.html
│   ├── reports.html
│   ├── profile.html
│   ├── 404.html
│   └── 500.html
│
├── docs
│   ├── APP_PY_DOCUMENTATION.md
│   ├── DATABASE_DESIGN.md
│   ├── API_DOCUMENTATION.md
│   ├── PROJECT_ARCHITECTURE.md
│   └── ...
│
└── README.md
```

---

# 🗄 Database Design

## users Collection

```json
{
  "_id": ObjectId,
  "name": "Shubham",
  "email": "user@gmail.com",
  "phone": "9876543210",
  "username": "shubham",
  "password": "hashed_password",
  "budget": 50000
}
```

## expenses Collection

```json
{
  "_id": ObjectId,
  "user_id": "123",
  "expense_name": "Pizza",
  "amount": 350,
  "category": "Food",
  "date": "2026-06-20",
  "notes": "Dinner"
}
```

## categories Collection

```json
{
  "_id": ObjectId,
  "user_id": "123",
  "category_name": "Food"
}
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

or

```bash
pip install flask pymongo werkzeug reportlab
```

---

## Start MongoDB

```bash
mongod
```

---

## Run Application

```bash
python app.py
```

---

## Open Browser

```text
http://localhost:5000
```

---

# 🔒 Security Features

* Password Hashing
* Session Authentication
* Protected Routes
* User Data Isolation
* Secure Logout
* Profile Protection

---

# 📊 Project Workflow

```text
Register
   ↓

Login
   ↓

Dashboard
   ↓

Add Expense
   ↓

Manage Categories
   ↓

Track Budget
   ↓

Generate Reports
   ↓

Export CSV/PDF
   ↓

Update Profile
```

---

# 🎯 Learning Outcomes

This project demonstrates:

* Full Stack Development
* Flask Framework
* MongoDB Integration
* REST API Development
* Authentication & Authorization
* Session Management
* CRUD Operations
* Financial Analytics
* Responsive Web Design

---

# 🔮 Future Enhancements

* Email Verification
* OTP Password Reset
* Profile Photo Upload
* Email Reports
* Budget Notifications
* AI-Based Expense Analysis
* MongoDB Atlas Integration
* Cloud Deployment

---

# 👨‍💻 Author

**Shubham Isai**

MSc IMCA Student

Python Full Stack Developer

---

# 📜 License

This project is created for educational and portfolio purposes.

---

⭐ If you found this project useful, consider giving it a star on GitHub.
