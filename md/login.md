# LOGIN_HTML_DOCUMENTATION.md

# Expense Tracker Login Module Documentation

## 🎯 Purpose

The Login Page is the entry point for authenticated users.

It verifies user credentials and creates a secure session.

After successful login, users gain access to:

* Dashboard
* Expenses
* Categories
* Reports
* Profile

Without successful authentication, protected pages cannot be accessed.

---

# 📋 Objectives

The Login Module helps users:

### Authenticate Identity

Verify username and password.

---

### Create Session

Maintain login state.

---

### Protect Data

Prevent unauthorized access.

---

### Access Features

Allow entry into the application.

---

# 🏗 Page Structure

```text
Login Page
│
├── Logo Section
│
├── Welcome Header
│
├── Login Form
│
│   ├── Username
│   └── Password
│
├── Show Password Option
│
├── Login Button
│
├── Register Link
│
├── Forgot Password Link
│
└── Footer
```

---

# 👤 Username Field

## Input Type

```html
<input type="text">
```

### Example

```text
shubham
```

### Purpose

Identifies user account.

---

# 🔒 Password Field

## Input Type

```html
<input type="password">
```

### Example

```text
********
```

### Purpose

Verifies account ownership.

---

# 👁 Show Password

## Purpose

Allows users to view entered password.

### Benefits

* Reduces typing mistakes
* Improves usability

---

# 🚀 Login Button

## Purpose

Submits login credentials.

### JavaScript Function

```javascript
loginUser()
```

### API

```http
POST /api/login
```

### Request Example

```json
{
  "username":"shubham",
  "password":"123456"
}
```

---

# 🔄 Login Workflow

```text
Enter Username
        ↓

Enter Password
        ↓

Click Login
        ↓

API Call
        ↓

Validate Credentials
        ↓

Create Session
        ↓

Dashboard Redirect
```

---

# 🔒 Session Creation

After successful login:

```python
session["user_id"]

session["username"]
```

are created.

---

# ❌ Failed Login

Examples:

```text
Invalid Username

Invalid Password

User Not Found
```

### Response

```json
{
  "success": false,
  "error": "Invalid Credentials"
}
```

---

# 🔗 Additional Links

## Register

Redirects:

```text
/register
```

Used by new users.

---

## Forgot Password

Redirects:

```text
/forgot-password
```

Used when password is forgotten.

---

# 🔐 Security

Passwords are never stored directly.

Uses:

```python
generate_password_hash()

check_password_hash()
```

---

# 🎓 Interview Questions

## Why Login System?

Provides authentication.

---

## Why Sessions?

Maintains user state.

---

## Why Password Hashing?

Improves security.

---

## Why Separate Login And Registration?

Different responsibilities.

---

# ✅ Summary

The Login Module authenticates users and provides secure access to protected features of the Expense Tracker application.
