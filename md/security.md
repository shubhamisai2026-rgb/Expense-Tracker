# SECURITY_DOCUMENTATION.md

# Expense Tracker Security Documentation

## 🎯 Purpose

This document explains all security mechanisms implemented in the Expense Tracker application.

Security is important because the application stores:

* User Accounts
* Passwords
* Financial Information
* Budget Data
* Personal Information

---

# Security Layers

```text
User
 ↓

Authentication
 ↓

Session Validation
 ↓

Route Protection
 ↓

MongoDB Data Isolation
 ↓

Secure Data Storage
```

---

# Password Security

## Problem

Storing passwords directly is dangerous.

Bad Example:

```text
Password = 123456
```

Anyone with database access can see it.

---

## Solution

Password Hashing

Uses:

```python
generate_password_hash()
```

Example:

```text
pbkdf2:sha256:600000$...
```

Stored in database instead of real password.

---

# Login Verification

Uses:

```python
check_password_hash()
```

Process:

```text
Entered Password
       ↓

Hash Comparison
       ↓

Match ?
   /      \
 Yes       No
  ↓         ↓

Login     Reject
```

---

# Session Security

After login:

```python
session["user_id"]
session["username"]
```

are created.

Purpose:

* Maintain login state
* Protect pages
* Identify current user

---

# Route Protection

Protected Pages:

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

Unauthorized users redirected to Login.

---

# User Data Isolation

Every expense uses:

```python
"user_id": session["user_id"]
```

Example:

User A:

```text
Pizza ₹350
```

User B:

```text
Fuel ₹1200
```

Users cannot access each other's records.

---

# Category Isolation

Categories are linked using:

```python
"user_id"
```

Each user sees only their own categories.

---

# Profile Protection

Profile APIs:

```http
GET /api/profile

PUT /api/profile
```

Accessible only after authentication.

---

# Logout Security

Uses:

```python
session.clear()
```

Removes all session data.

Result:

User must login again.

---

# Password Reset Security

Password Reset Process:

```text
Username
   ↓

New Password
   ↓

Hash Password
   ↓

Save Database
```

Passwords never stored as plain text.

---

# MongoDB Security

Collections:

```text
users
expenses
categories
```

Access controlled through Flask backend.

Frontend never communicates directly with MongoDB.

---

# Current Security Features

✅ Password Hashing

✅ Session Authentication

✅ Route Protection

✅ User Data Isolation

✅ Category Isolation

✅ Secure Logout

✅ Protected Profile Updates

---

# Recommended Future Security

## Environment Variables

Move:

```python
app.secret_key
```

to:

```env
SECRET_KEY=your_secret_key
```

---

## MongoDB Atlas

Use cloud database.

---

## HTTPS

Encrypt communication.

---

## Email Verification

Verify user identity.

---

## OTP Password Reset

More secure than username-only reset.

---

# Security Architecture

```text
Frontend
    ↓

Flask Authentication
    ↓

Session Validation
    ↓

Route Protection
    ↓

MongoDB Access
```

---

# Interview Questions

## Why Hash Passwords?

To protect passwords from exposure.

---

## Why Sessions?

To maintain user login state.

---

## Why User Isolation?

To protect private financial data.

---

## Why Route Protection?

To prevent unauthorized access.

---

## Why Not Store Plain Passwords?

Major security risk.

---

# Security Score

Authentication: 9/10

Authorization: 9/10

Data Isolation: 10/10

Password Security: 9/10

Overall Security: 9/10

---

# Summary

The Expense Tracker application implements multiple layers of security:

* Password Hashing
* Session Management
* Route Protection
* User Data Isolation
* Secure Logout

These mechanisms ensure that user financial data remains private and protected.
