# Expense Tracker - Project Breakdown & Learning Path

## 📚 Overview
This document outlines the complete project structure split into learning phases. Each phase builds upon the previous one, focusing on a specific aspect of full-stack development.

---

## 🎯 Project Phases

### **Phase 1: Landing Page & Introduction** ✅ FOUNDATION
- **Focus**: HTML structure + Minimal JavaScript
- **Goal**: Learn basic web page creation and minimal interactivity
- **Duration**: 1-2 hours of learning
- **Deliverable**: `PHASE_1_REQUIREMENTS.md`

### **Phase 2: Core UI Pages (No Backend)** ✅ FOUNDATION
- **Focus**: Creating all UI pages with static data
- **Goal**: Learn HTML form design, navigation, and data display structure
- **Duration**: 2-3 hours of learning
- **Deliverable**: `PHASE_2_REQUIREMENTS.md`

### **Phase 3: Backend Integration** ✅ FOUNDATION
- **Focus**: Connect UI to Python/Flask backend with MongoDB
- **Goal**: Learn API design, database operations, and full integration
- **Duration**: 3-4 hours of learning
- **Deliverable**: `PHASE_3_REQUIREMENTS.md`

### **Phase 4: Authentication** (FUTURE)
- **Focus**: User login, signup, session management
- **Goal**: Learn secure authentication patterns
- **Deliverable**: `PHASE_4_REQUIREMENTS.md`

### **Phase 5: Additional Features** (FUTURE)
- **Focus**: Reports, budget tracking, data export, etc.
- **Goal**: Learn advanced features and optimization
- **Deliverable**: `PHASE_5_REQUIREMENTS.md`

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Styling (inline + separate file)
- **Vanilla JavaScript** - DOM manipulation, fetch API

### Backend
- **Python 3.x** - Server language
- **Flask** - Lightweight web framework
- **PyMongo** - MongoDB driver

### Database
- **MongoDB** - NoSQL document database

### Tools
- **VS Code** - Code editor
- **Postman/curl** - API testing (optional)

---

## 📊 Feature Matrix by Phase

| Feature | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
|---------|---------|---------|---------|---------|---------|
| Landing Page | ✅ | - | - | - | - |
| Navigation | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dashboard UI | - | ✅ | ✅ | ✅ | ✅ |
| Add Expense Form | - | ✅ | ✅ | ✅ | ✅ |
| View Expenses Table | - | ✅ | ✅ | ✅ | ✅ |
| Categories Page | - | ✅ | ✅ | ✅ | ✅ |
| Manage Categories | - | - | ✅ | ✅ | ✅ |
| Add Expense (API) | - | - | ✅ | ✅ | ✅ |
| Edit Expense (API) | - | - | ✅ | ✅ | ✅ |
| Delete Expense (API) | - | - | ✅ | ✅ | ✅ |
| View Dashboard Stats | - | - | ✅ | ✅ | ✅ |
| User Authentication | - | - | - | ✅ | ✅ |
| User Sessions | - | - | - | ✅ | ✅ |
| Reports Page | - | - | - | - | ✅ |
| Budget Tracking | - | - | - | - | ✅ |
| Data Export (CSV) | - | - | - | - | ✅ |

---

## 📂 File Structure After Each Phase

### After Phase 1
```
expense-tracker/
├── index.html              (Landing page)
├── style.css               (Basic styling)
└── main.js                 (Minimal JS)
```

### After Phase 2
```
expense-tracker/
├── index.html              (Landing page)
├── templates/
│   ├── dashboard.html      (Mock data)
│   ├── expenses.html       (Mock data)
│   ├── categories.html     (Mock data)
│   └── add-expense.html    (Form only)
├── static/
│   ├── main.js             (Navigation, form handling)
│   └── style.css           (All styling)
└── app.py                  (Flask - serve templates only)
```

### After Phase 3
```
expense-tracker/
├── index.html              (Landing page)
├── templates/
│   ├── dashboard.html
│   ├── expenses.html
│   ├── categories.html
│   └── add-expense.html
├── static/
│   ├── main.js             (API calls, data binding)
│   └── style.css
├── app.py                  (Flask + 9 API endpoints)
└── mongodb/
    ├── expenses            (Collection)
    └── categories          (Collection)
```

### After Phase 4 (Future)
```
expense-tracker/
├── templates/
│   ├── auth/
│   │   ├── login.html
│   │   └── signup.html
│   ├── dashboard.html
│   ├── expenses.html
│   ├── categories.html
│   └── add-expense.html
├── static/
│   └── ...
├── app.py                  (+ Auth routes & middleware)
└── models/
    └── user.py             (User schema)
```

---

## 🎓 Learning Objectives by Phase

### Phase 1
- [ ] Understand HTML semantic tags
- [ ] Learn CSS basics (flexbox, grid)
- [ ] Write simple JavaScript for DOM manipulation
- [ ] Create responsive landing page

### Phase 2
- [ ] Design form HTML structures
- [ ] Create data table layouts
- [ ] Implement navigation between pages
- [ ] Handle form submissions with JS
- [ ] Use static/mock data for display

### Phase 3
- [ ] Design RESTful API endpoints
- [ ] Implement CRUD operations
- [ ] Connect frontend to backend with fetch API
- [ ] Handle API responses and errors
- [ ] Store and retrieve data from MongoDB
- [ ] Implement database operations

### Phase 4
- [ ] Implement user authentication
- [ ] Manage user sessions
- [ ] Secure API endpoints
- [ ] Hash passwords securely

### Phase 5
- [ ] Generate reports from data
- [ ] Implement filtering and sorting
- [ ] Export data to CSV
- [ ] Add budget tracking logic

---

## 🚀 Getting Started

**Start with Phase 1**: Read `PHASE_1_REQUIREMENTS.md`

Each requirement file is self-contained and can be:
1. Reviewed for understanding
2. Passed to an AI assistant for implementation
3. Used as a checklist for learning

---

## 📝 Notes

- **Time estimates** assume medium learning pace with practice
- **Each phase** is independent in requirements but builds on previous code
- **No skipping**: Phases must be done in order for proper learning
- **No authentication** until Phase 4 - focus on core functionality first
- **All data** starts fresh each phase - no migration needed

---

## ✅ Checklist

- [ ] Read PHASE_1_REQUIREMENTS.md
- [ ] Implement Phase 1
- [ ] Test Phase 1 locally
- [ ] Read PHASE_2_REQUIREMENTS.md
- [ ] Implement Phase 2
- [ ] Test Phase 2 locally
- [ ] Continue to Phase 3...
