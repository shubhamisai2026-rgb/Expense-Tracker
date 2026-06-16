# PHASE 2 REQUIREMENTS - Core UI Pages (No Backend)

## 🎯 Phase Goal
Build all the UI pages with **static/mock data**. Learn how to structure forms, tables, and navigation WITHOUT any backend connectivity. This is purely frontend - HTML + CSS + minimal JavaScript for UI interactions.

---

## 📋 What You'll Learn

### HTML
- Form design and validation (client-side only)
- Data table layouts
- Modal/popup structures
- Form input types and attributes

### CSS
- Form styling
- Table styling with hover effects
- Card layouts
- Modal/modal overlays
- Consistent component design

### JavaScript
- Form handling (no submission yet)
- DOM manipulation for interactivity
- Local data storage (localStorage - optional)
- Show/hide elements
- Confirm dialogs

---

## ✅ Deliverables for Phase 2

### 1. **templates/dashboard.html** - Dashboard Page
Display overview statistics with mock data:

**Sections:**
- Header with page title
- **Statistics Cards** (showing mock values):
  - Total Expenses: 5
  - Total Amount: ₹3,500
  - Average Expense: ₹700
- **Recent Transactions Table**:
  - Show last 5 expenses (hardcoded data)
  - Columns: Name, Category, Amount
- **Category Breakdown Chart** (optional - text list is fine):
  - List top categories and amounts

**Mock Data Example:**
```javascript
{
  total_expenses: 5,
  total_amount: 3500,
  average_amount: 700,
  recent: [
    { name: "Pizza", category: "Food", amount: 350 },
    { name: "Movie", category: "Entertainment", amount: 500 },
    // ... more
  ]
}
```

### 2. **templates/add-expense.html** - Add Expense Form Page
Create a form page for adding expenses:

**Form Fields:**
- Expense Name (text input)
- Amount (number input)
- Category (dropdown - hardcoded options)
- Date (date input)
- Notes (textarea)
- Submit Button
- Cancel Button (link back)

**Form Behavior:**
- Client-side validation (required fields)
- Show error messages for invalid inputs
- On submit: Show alert "Saved!" and reset form
- NO backend call yet

**Hardcoded Categories:**
- Food
- Entertainment
- Transportation
- Shopping
- Utilities
- Other

### 3. **templates/expenses.html** - View All Expenses Page
Display all expenses in a table format:

**Table Columns:**
- Expense Name
- Category
- Notes
- Amount
- Date
- Actions (Edit button, Delete button)

**Mock Data:**
Show 10-15 sample expenses

**Table Features:**
- Clean, readable layout
- Alternating row colors (optional)
- Hover effects on rows
- Buttons for Edit and Delete (won't work yet)

**Button Interactions:**
- Edit: Open modal/form with expense data (won't save)
- Delete: Show confirm dialog (won't delete)

### 4. **templates/categories.html** - Categories Management Page
Manage category list:

**Sections:**
- **Add Category Section**:
  - Text input for category name
  - "Add" button (shows success message but doesn't save)
- **Categories List**:
  - Display 8-10 hardcoded categories
  - Each has "Delete" button (won't actually delete)

**Category List Format:**
```
Category Name | Delete Button
Food          | [Delete]
Entertainment | [Delete]
Transportation| [Delete]
...
```

**Button Interactions:**
- Add: Show alert "Category added!" but don't save
- Delete: Show confirm dialog but don't delete

### 5. **templates/index.html** - Home/Landing Page
The Phase 1 landing page, now integrated:
- Same design from Phase 1
- Links to other pages now work (to /dashboard, /expenses, etc.)

---

## 🎨 UI/UX Requirements

### Navigation
- Consistent header across all pages
- Active page indicator in navigation
- Links to all pages
- Logo/Home link in header

### Styling Consistency
- Same color scheme throughout
- Consistent button styles
- Consistent spacing
- Responsive design (mobile-friendly)

### Form Validation (Client-Side Only)
```javascript
// Example validation:
if (expenseName === "") {
    showError("Expense name is required");
    return;
}
if (amount === "" || amount <= 0) {
    showError("Amount must be greater than 0");
    return;
}
```

---

## 📁 File Structure

```
templates/
├── index.html           (Landing page from Phase 1)
├── dashboard.html       (Overview with statistics)
├── add-expense.html     (Form for adding expense)
├── expenses.html        (Table of all expenses)
└── categories.html      (Manage categories)

static/
├── main.js              (Form handling, interactivity)
└── style.css            (All styling)

app.py                   (Flask - serve templates only, no API yet)
```

---

## 🎯 Static/Mock Data Structure

Use JavaScript objects to hold mock data (can use localStorage or just in-memory):

```javascript
// Mock expenses data
const mockExpenses = [
    {
        id: 1,
        expense_name: "Pizza",
        category: "Food",
        amount: 350,
        date: "2026-06-15",
        notes: "Lunch"
    },
    {
        id: 2,
        expense_name: "Movie Ticket",
        category: "Entertainment",
        amount: 500,
        date: "2026-06-14",
        notes: "Action movie"
    },
    // ... more
];

// Mock categories
const mockCategories = ["Food", "Entertainment", "Transportation", "Shopping", "Utilities", "Other"];

// Mock dashboard stats
const mockStats = {
    total_expenses: 5,
    total_amount: 3500,
    average_amount: 700
};
```

---

## 🎯 Requirements Checklist

### HTML
- [ ] All 5 pages created and linked
- [ ] Consistent header/navigation on all pages
- [ ] Dashboard shows statistics cards
- [ ] Dashboard shows recent transactions table
- [ ] Add Expense form has all required fields
- [ ] Form validation messages
- [ ] Expenses table displays mock data
- [ ] Categories list with add/delete UI
- [ ] All forms have proper labels

### CSS
- [ ] Consistent styling across all pages
- [ ] Responsive design (mobile-friendly)
- [ ] Form inputs styled properly
- [ ] Table styling with hover effects
- [ ] Cards/statistics boxes styled
- [ ] Navigation active state styling
- [ ] Button hover/active states
- [ ] Modal/dialog styling (if using)

### JavaScript
- [ ] Form validation works
- [ ] Error/success messages display
- [ ] Edit button shows/populates form (no save)
- [ ] Delete button shows confirm dialog (no delete)
- [ ] Add category shows success (no save)
- [ ] Navigation highlighting works
- [ ] All interactions smooth and responsive
- [ ] No console errors

---

## 🚀 Success Criteria

**Phase 2 is complete when:**
1. All 5 pages exist and are navigable
2. Dashboard displays mock statistics
3. Add Expense form validates and shows errors
4. Expenses table displays 10+ mock expenses
5. Categories page shows list with add/delete UI
6. All pages are responsive on mobile
7. Consistent styling throughout
8. No backend/API calls yet
9. All buttons work for UI interactions (just not the actual operations)
10. No console errors

---

## 🔍 Testing Checklist

- [ ] Navigate between all pages
- [ ] Dashboard loads and shows mock data
- [ ] Try adding expense with blank fields (shows error)
- [ ] Try adding expense with valid data (shows success)
- [ ] Click edit on expense (form populates - optional)
- [ ] Click delete on expense (shows confirm)
- [ ] Add category (shows success message)
- [ ] Delete category (shows confirm dialog)
- [ ] Test responsive design on mobile view
- [ ] Check all links work
- [ ] Verify no console errors (F12 → Console)

---

## 💡 JavaScript Helper Functions (Optional Template)

```javascript
// Form validation
function validateExpenseForm(name, amount, category, date) {
    if (!name || !amount || !category || !date) {
        showError("All fields are required");
        return false;
    }
    if (amount <= 0) {
        showError("Amount must be greater than 0");
        return false;
    }
    return true;
}

// Show error message
function showError(message) {
    alert(message); // Simple - can upgrade to better UI
}

// Show success message
function showSuccess(message) {
    alert(message); // Simple - can upgrade to better UI
}

// Handle form submission (no backend yet)
function handleAddExpense(e) {
    e.preventDefault();
    // Get form data
    const name = document.getElementById("expenseName").value;
    const amount = document.getElementById("amount").value;
    // Validate and show success
    if (validateExpenseForm(name, amount, ...)) {
        showSuccess("Expense saved successfully!");
        // Reset form
        document.getElementById("expenseForm").reset();
    }
}

// Handle delete (just show confirm)
function handleDeleteExpense(id) {
    if (confirm("Delete this expense?")) {
        showSuccess("Expense deleted!"); // Won't actually delete
    }
}
```

---

## 📊 Sample Page Sizes
- Each template: ~150-250 lines
- style.css: ~400-600 lines
- main.js: ~300-500 lines

---

## 🎬 Flask App for Phase 2

The `app.py` should only:
1. Serve the static files (CSS, JS, images)
2. Render templates
3. NO API endpoints yet

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/add-expense')
def add_expense():
    return render_template('add-expense.html')

@app.route('/expenses')
def expenses():
    return render_template('expenses.html')

@app.route('/categories')
def categories():
    return render_template('categories.html')

if __name__ == '__main__':
    app.run(debug=True)
```

---

## ⏭️ Next Steps

Once Phase 2 is complete:
1. Get approval/feedback on UI/UX
2. Move to `PHASE_3_REQUIREMENTS.md`
3. Start building backend API endpoints
4. Connect frontend forms to backend

---

## 📚 Resources

### Form Validation
- MDN Form Validation: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

### Tables in HTML
- MDN Tables: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables

### Modal Dialogs
- MDN Dialog Element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
- JavaScript Alert/Confirm: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
