# PROFILE_HTML_DOCUMENTATION.md

# Expense Tracker Profile Module Documentation

## 🎯 Purpose

The Profile Page is responsible for managing user information.

It allows users to:

* View personal information
* Update profile details
* Manage monthly budget
* Verify account information

The Profile Module acts as the personal account center of the Expense Tracker application.

---

# 📋 Objectives

The Profile Module helps users:

### View Account Information

Display registered details.

---

### Update Personal Information

Modify profile data.

---

### Manage Budget

Update monthly spending limit.

---

### Maintain Account Accuracy

Keep information current.

---

# 🏗 Page Structure

```text
Profile Page
│
├── Navigation Bar
│
├── Profile Header
│
├── Profile Information Card
│
│   ├── Name
│   ├── Email
│   ├── Phone
│   └── Budget
│
├── Save Changes Button
│
└── Footer
```

---

# 🧭 Navigation Bar

## Purpose

Allows navigation throughout application.

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

# 👤 Profile Header

## Purpose

Introduces profile management.

### Example

```text
My Profile

Manage your account information.
```

---

# 📄 Profile Information Card

## Purpose

Displays current user information.

---

# Field 1

## Name

### Input Type

```html
<input type="text">
```

---

### Example

```text
Shubham Isai
```

---

### Purpose

Stores user's full name.

---

# Field 2

## Email

### Input Type

```html
<input type="email">
```

---

### Example

```text
shubham@gmail.com
```

---

### Purpose

Stores user email address.

---

# Field 3

## Phone Number

### Input Type

```html
<input type="text">
```

---

### Example

```text
9876543210
```

---

### Purpose

Stores mobile number.

---

# Field 4

## Monthly Budget

### Input Type

```html
<input type="number">
```

---

### Example

```text
50000
```

---

### Purpose

Stores monthly spending limit.

---

### Importance

Budget directly affects:

* Reports
* Analytics
* Remaining Budget
* Budget Usage Percentage

---

# 💾 Save Changes Button

## Purpose

Updates profile information.

---

### JavaScript Function

```javascript
updateProfile()
```

---

### API

```http
PUT /api/profile
```

---

### Request Example

```json
{
  "name": "Shubham Isai",
  "email": "shubham@gmail.com",
  "phone": "9876543210",
  "budget": 50000
}
```

---

### Success Flow

```text
Update Fields
      ↓

Click Save
      ↓

Validation
      ↓

API Call
      ↓

MongoDB Update
      ↓

Success Message
```

---

# 🔄 Load Profile Data

## Purpose

Automatically load current user information.

---

### JavaScript Function

```javascript
loadProfile()
```

---

### API

```http
GET /api/profile
```

---

### Example Response

```json
{
  "success": true,

  "name": "Shubham",

  "email": "shubham@gmail.com",

  "phone": "9876543210",

  "budget": 50000
}
```

---

### Workflow

```text
Profile Page Open
       ↓

Call API
       ↓

Fetch User Data
       ↓

Fill Input Fields
       ↓

Display Information
```

---

# 💰 Budget Management

## Purpose

Allows users to control monthly spending targets.

---

## Example

Monthly Budget:

```text
50000
```

Monthly Spending:

```text
12000
```

Remaining Budget:

```text
38000
```

---

## Formula

```text
Remaining Budget

=
Budget - Spending
```

---

### Usage Percentage Formula

```text
(Total Spending / Budget) × 100
```

---

### Example

```text
12000 / 50000 × 100

=
24%
```

---

# 🔒 Security

Only logged-in users can access profile page.

---

## Validation

```python
if "user_id" not in session:
```

Redirects unauthorized users.

---

# 🗄 Database Mapping

## User Document

```json
{
    "_id": ObjectId,

    "name": "Shubham",

    "email": "shubham@gmail.com",

    "phone": "9876543210",

    "username": "shubham",

    "password": "hashed_password",

    "budget": 50000
}
```

---

# 🔄 Backend APIs Used

## Get Profile

```http
GET /api/profile
```

Purpose:

Fetch user details.

---

## Update Profile

```http
PUT /api/profile
```

Purpose:

Update user details.

---

# 📱 Responsive Design

## Desktop

Profile card centered.

---

## Tablet

Responsive width.

---

## Mobile

Single-column layout.

Touch-friendly inputs.

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

## Input Fields

Used for:

* Name
* Email
* Phone
* Budget

---

## Buttons

Used for:

* Save Changes

---

## Profile Card

Used to group account information.

---

# 🚀 User Workflow

```text
Login
   ↓

Open Profile
   ↓

Load User Information
   ↓

Edit Details
   ↓

Update Budget
   ↓

Save Changes
   ↓

Database Updated
```

---

# 🎓 Interview Questions

## Why Profile Module?

Allows users to manage personal information.

---

## Why Store Budget In User Collection?

Each user has a different monthly spending limit.

---

## Why Load Data Automatically?

Improves user experience.

---

## Why Update Profile API?

Keeps information current.

---

## Why Session Validation?

Protects user data.

---

## Why Separate Profile From Login?

Single Responsibility Principle.

---

# 📊 Success Criteria

Profile module is complete when:

✅ User data loads automatically

✅ Name can be updated

✅ Email can be updated

✅ Phone can be updated

✅ Budget can be updated

✅ Changes persist in MongoDB

✅ Session protection works

✅ Dark mode works

✅ Responsive design works

---

# ✅ Summary

The Profile Module serves as the account management center of the Expense Tracker application.

It provides:

* User Information Management
* Budget Configuration
* Profile Updates
* Session-Based Security
* MongoDB Integration

This module connects user identity with financial planning and is a critical part of the authentication system.
