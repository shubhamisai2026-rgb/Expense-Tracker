# PHASE 3 REQUIREMENTS - Backend Integration with MongoDB

## 🎯 Phase Goal
Connect the Phase 2 UI to a Python/Flask backend with MongoDB. Implement all CRUD operations (Create, Read, Update, Delete) for expenses and categories. Learn API design, database operations, and full-stack integration.

---

## 📋 What You'll Learn

### Python/Flask
- Route handling for API endpoints
- HTTP methods (GET, POST, PUT, DELETE)
- JSON request/response handling
- Error handling and status codes
- CORS basics (if needed)

### MongoDB
- Database and collection creation
- Document structure and ObjectId
- Insert operations
- Find/Query operations with sorting
- Update operations
- Delete operations

### JavaScript (Fetch API)
- Making HTTP requests with fetch
- Handling JSON responses
- Parsing and displaying API data
- Error handling from API

### Integration
- Frontend-Backend communication
- Real-time data binding
- Data validation on both sides

---

## ✅ Deliverables for Phase 3

### Backend: 9 API Endpoints

#### **EXPENSE ENDPOINTS (5 total)**

##### 1. CREATE Expense
```
POST /api/expenses
Content-Type: application/json

Request Body:
{
    "expense_name": "Pizza",
    "amount": 350,
    "category": "Food",
    "date": "2026-06-15",
    "notes": "Lunch at cafe"
}

Response:
{
    "success": true,
    "expense_id": "507f1f77bcf86cd799439011"
}
```

**Server-side Logic:**
- Validate all required fields
- Convert amount to float
- Add timestamps (created_at, updated_at)
- Insert into MongoDB `expenses` collection
- Return success with expense ID

---

##### 2. READ All Expenses
```
GET /api/expenses

Response:
{
    "success": true,
    "expenses": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "expense_name": "Pizza",
            "amount": 350,
            "category": "Food",
            "date": "2026-06-15",
            "notes": "Lunch at cafe",
            "created_at": "2026-06-16T10:30:00",
            "updated_at": "2026-06-16T10:30:00"
        },
        // ... more expenses
    ]
}
```

**Server-side Logic:**
- Fetch all expenses from MongoDB
- Sort by date (newest first)
- Convert ObjectId to string for JSON
- Return as array

---

##### 3. READ Single Expense
```
GET /api/expenses/<expense_id>

Response:
{
    "success": true,
    "expense": {
        "_id": "507f1f77bcf86cd799439011",
        "expense_name": "Pizza",
        "amount": 350,
        "category": "Food",
        "date": "2026-06-15",
        "notes": "Lunch at cafe",
        "created_at": "2026-06-16T10:30:00",
        "updated_at": "2026-06-16T10:30:00"
    }
}
```

**Server-side Logic:**
- Find expense by ObjectId
- Return error if not found
- Convert ObjectId to string

---

##### 4. UPDATE Expense
```
PUT /api/expenses/<expense_id>
Content-Type: application/json

Request Body:
{
    "expense_name": "Pizza",
    "amount": 400,  // Changed
    "category": "Food",
    "date": "2026-06-15",
    "notes": "Updated notes"
}

Response:
{
    "success": true,
    "message": "Expense updated successfully"
}
```

**Server-side Logic:**
- Find expense by ObjectId
- Update all fields
- Update the `updated_at` timestamp
- Return success or error

---

##### 5. DELETE Expense
```
DELETE /api/expenses/<expense_id>

Response:
{
    "success": true,
    "message": "Expense deleted successfully"
}
```

**Server-side Logic:**
- Find and delete expense by ObjectId
- Return error if not found
- Return success

---

#### **CATEGORY ENDPOINTS (3 total)**

##### 6. CREATE Category
```
POST /api/categories
Content-Type: application/json

Request Body:
{
    "category_name": "Travel"
}

Response:
{
    "success": true,
    "category_id": "507f1f77bcf86cd799439012"
}
```

**Server-side Logic:**
- Validate category_name is provided
- Check if category already exists (prevent duplicates)
- Add timestamp (created_at)
- Insert into MongoDB `categories` collection

---

##### 7. READ All Categories
```
GET /api/categories

Response:
{
    "success": true,
    "categories": [
        {
            "_id": "507f1f77bcf86cd799439012",
            "category_name": "Food",
            "created_at": "2026-06-16T10:30:00"
        },
        {
            "_id": "507f1f77bcf86cd799439013",
            "category_name": "Entertainment",
            "created_at": "2026-06-16T10:30:00"
        },
        // ... more categories
    ]
}
```

**Server-side Logic:**
- Fetch all categories from MongoDB
- Convert ObjectId to string
- Return as array

---

##### 8. DELETE Category
```
DELETE /api/categories/<category_id>

Response:
{
    "success": true,
    "message": "Category deleted successfully"
}
```

**Server-side Logic:**
- Find and delete category by ObjectId
- Return error if not found

---

#### **DASHBOARD ENDPOINT (1 total)**

##### 9. GET Dashboard Statistics
```
GET /api/dashboard-stats

Response:
{
    "success": true,
    "total_expenses": 5,
    "total_amount": 3500.50,
    "average_amount": 700.10,
    "expense_count": 5
}
```

**Server-side Logic:**
- Fetch all expenses
- Calculate count
- Calculate sum (total_amount)
- Calculate average
- Return JSON

---

## 📂 File Structure

```
expense-tracker/
├── app.py                       (Main Flask app with 9 endpoints)
├── requirements.txt             (Python dependencies)
├── templates/
│   ├── index.html              (Landing - no changes)
│   ├── dashboard.html          (Update to load real data)
│   ├── add-expense.html        (Form now submits to API)
│   ├── expenses.html           (Table loads from API)
│   └── categories.html         (List loads from API)
└── static/
    ├── main.js                 (Update to use fetch API)
    └── style.css               (No changes)
```

---

## 🔧 Backend Implementation Details

### MongoDB Connection
```python
from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['expense_tracker']
expenses_collection = db['expenses']
categories_collection = db['categories']
```

### Expense Document Schema
```javascript
{
    "_id": ObjectId,
    "expense_name": String,
    "amount": Number (float),
    "category": String,
    "date": String (YYYY-MM-DD),
    "notes": String,
    "created_at": DateTime,
    "updated_at": DateTime
}
```

### Category Document Schema
```javascript
{
    "_id": ObjectId,
    "category_name": String,
    "created_at": DateTime
}
```

---

## 🎯 Frontend Updates for Phase 3

### JavaScript Changes

#### Update saveExpense() function
```javascript
function saveExpense() {
    const name = document.getElementById("expenseName").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;

    if (!name || !amount || !category || !date) {
        alert("All required fields must be filled");
        return;
    }

    const expenseData = {
        expense_name: name,
        amount: amount,
        category: category,
        date: date,
        notes: notes
    };

    // Make API call
    fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Expense saved successfully!");
            document.getElementById("expenseForm").reset();
            window.location.href = "/expenses";  // Redirect
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => alert("Error: " + error));
}
```

#### Update loadExpenses() function
```javascript
function loadExpenses() {
    fetch("/api/expenses")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tbody = document.querySelector("table tbody");
            tbody.innerHTML = "";
            
            if (data.expenses.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6'>No expenses found</td></tr>";
                return;
            }
            
            data.expenses.forEach(expense => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${expense.expense_name}</td>
                    <td>${expense.category}</td>
                    <td>${expense.notes || "-"}</td>
                    <td>₹${expense.amount}</td>
                    <td>${expense.date}</td>
                    <td>
                        <button onclick="editExpense('${expense._id}')">Edit</button>
                        <button onclick="deleteExpense('${expense._id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    })
    .catch(error => console.error("Error:", error));
}
```

#### Update editExpense() function
```javascript
function editExpense(expenseId) {
    fetch(`/api/expenses/${expenseId}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const expense = data.expense;
            const newAmount = prompt("Enter new amount:", expense.amount);
            
            if (newAmount === null) return;
            
            const updateData = {
                expense_name: expense.expense_name,
                amount: newAmount,
                category: expense.category,
                date: expense.date,
                notes: expense.notes
            };
            
            fetch(`/api/expenses/${expenseId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Updated successfully!");
                    loadExpenses();
                } else {
                    alert("Error: " + data.error);
                }
            });
        }
    })
    .catch(error => alert("Error: " + error));
}
```

#### Update deleteExpense() function
```javascript
function deleteExpense(expenseId) {
    if (confirm("Delete this expense?")) {
        fetch(`/api/expenses/${expenseId}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Deleted successfully!");
                loadExpenses();
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => alert("Error: " + error));
    }
}
```

#### Update loadDashboardStats() function
```javascript
function loadDashboardStats() {
    fetch("/api/dashboard-stats")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("totalExpenses").textContent = data.total_expenses;
            document.getElementById("totalAmount").textContent = "₹" + data.total_amount.toFixed(2);
            document.getElementById("averageExpense").textContent = "₹" + data.average_amount;
        }
    })
    .catch(error => console.error("Error:", error));
}
```

#### Update loadCategories() function
```javascript
function loadCategories() {
    fetch("/api/categories")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update dropdown
            const select = document.getElementById("category");
            if (select) {
                while (select.options.length > 1) select.remove(1);
                data.categories.forEach(cat => {
                    const option = document.createElement("option");
                    option.value = cat.category_name;
                    option.textContent = cat.category_name;
                    select.appendChild(option);
                });
            }
            
            // Update category list
            const list = document.getElementById("categoryList");
            if (list) {
                list.innerHTML = "";
                data.categories.forEach(cat => {
                    const li = document.createElement("li");
                    li.innerHTML = `${cat.category_name} 
                        <button onclick="deleteCategory('${cat._id}')">Delete</button>`;
                    list.appendChild(li);
                });
            }
        }
    })
    .catch(error => console.error("Error:", error));
}
```

#### Update addCategory() function
```javascript
function addCategory() {
    const input = document.getElementById("categoryInput").value;
    
    if (!input) {
        alert("Enter category name");
        return;
    }
    
    fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_name: input })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Category added!");
            document.getElementById("categoryInput").value = "";
            loadCategories();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => alert("Error: " + error));
}
```

#### Update deleteCategory() function
```javascript
function deleteCategory(categoryId) {
    if (confirm("Delete this category?")) {
        fetch(`/api/categories/${categoryId}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Deleted!");
                loadCategories();
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => alert("Error: " + error));
    }
}
```

---

## 🎯 Requirements Checklist

### Flask Backend
- [ ] MongoDB connection established
- [ ] All 9 endpoints created
- [ ] Proper error handling (400, 404, 500)
- [ ] JSON responses with success flag
- [ ] ObjectId conversion to string
- [ ] Timestamp management (created_at, updated_at)
- [ ] Data validation on all inputs
- [ ] Duplicate category prevention

### Database
- [ ] `expense_tracker` database created
- [ ] `expenses` collection created
- [ ] `categories` collection created
- [ ] Proper document structure
- [ ] Timestamps on all documents

### Frontend JavaScript
- [ ] saveExpense() calls POST /api/expenses
- [ ] loadExpenses() calls GET /api/expenses
- [ ] editExpense() calls PUT /api/expenses/<id>
- [ ] deleteExpense() calls DELETE /api/expenses/<id>
- [ ] loadCategories() calls GET /api/categories
- [ ] addCategory() calls POST /api/categories
- [ ] deleteCategory() calls DELETE /api/categories/<id>
- [ ] loadDashboardStats() calls GET /api/dashboard-stats
- [ ] All fetch requests have error handling

### Integration
- [ ] Add Expense form submits to API
- [ ] Expenses load from API on page visit
- [ ] Dashboard statistics load from API
- [ ] Categories dropdown loads from API
- [ ] Edit expense updates in database
- [ ] Delete expense removes from database
- [ ] Add category saves to database
- [ ] Delete category removes from database
- [ ] All operations redirect/reload appropriately

---

## 🚀 Success Criteria

**Phase 3 is complete when:**
1. MongoDB is running and connected
2. All 9 endpoints respond correctly
3. Can add expense via form (saves to DB)
4. Can view all expenses (loads from DB)
5. Can edit expense (updates in DB)
6. Can delete expense (removes from DB)
7. Dashboard stats load from DB
8. Can add categories (saves to DB)
9. Can delete categories (removes from DB)
10. Category dropdown populates from DB
11. No console errors
12. No database errors

---

## 🔍 Testing Checklist

### Manual Testing
- [ ] Start MongoDB: `mongod`
- [ ] Start Flask app: `python app.py`
- [ ] Open browser to `http://localhost:5000`
- [ ] Test add expense flow (step 1-5 below)
- [ ] Test view expenses flow
- [ ] Test edit expense flow
- [ ] Test delete expense flow
- [ ] Test dashboard stats
- [ ] Test add category
- [ ] Test delete category

### Test Flows

**Flow 1: Add Expense**
1. Go to /add-expense
2. Fill form: Name="Lunch", Amount="350", Category="Food", Date="today"
3. Click Save
4. Should show "Saved!" and redirect to /expenses
5. Verify expense appears in table

**Flow 2: View Expenses**
1. Go to /expenses
2. Should load all expenses from database
3. Verify table populated

**Flow 3: Edit Expense**
1. Click Edit on any expense
2. Enter new amount in prompt
3. Should update in database
4. Refresh and verify change persists

**Flow 4: Delete Expense**
1. Click Delete on any expense
2. Confirm deletion
3. Should remove from table
4. Refresh and verify it's gone

**Flow 5: Dashboard Stats**
1. Go to /dashboard
2. Should show total_expenses, total_amount, average_amount
3. Add/delete expense and refresh
4. Stats should update

**Flow 6: Categories**
1. Go to /categories
2. Add new category
3. Go to /add-expense
4. Verify new category appears in dropdown

---

## 🧪 API Testing with curl (Optional)

```bash
# Test Create Expense
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"expense_name":"Pizza","amount":350,"category":"Food","date":"2026-06-15","notes":"Lunch"}'

# Test Get All Expenses
curl http://localhost:5000/api/expenses

# Test Get Dashboard Stats
curl http://localhost:5000/api/dashboard-stats

# Test Create Category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"category_name":"Travel"}'

# Test Get All Categories
curl http://localhost:5000/api/categories
```

---

## 📋 Python Requirements

Create `requirements.txt`:
```
Flask==2.3.0
PyMongo==4.3.0
pymongo[srv]==4.3.0
```

Install with:
```bash
pip install -r requirements.txt
```

---

## 💡 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:** Make sure `mongod` is running in another terminal

### Issue: ObjectId is not JSON serializable
**Solution:** Convert to string before returning JSON:
```python
document['_id'] = str(document['_id'])
```

### Issue: CORS errors in console
**Solution:** Add Flask-CORS if needed:
```python
from flask_cors import CORS
CORS(app)
```

### Issue: Form not submitting to API
**Solution:** Check:
1. Method is correct (POST/PUT/DELETE)
2. Content-Type header is set
3. URL is correct

---

## ⏭️ Next Steps

Once Phase 3 is complete:
1. Full expense tracker is functional
2. Can add/view/edit/delete expenses
3. Categories fully managed
4. Dashboard shows real statistics
5. Move to PHASE_4_REQUIREMENTS.md when ready

---

## 📚 Resources

### Flask API Development
- Flask Documentation: https://flask.palletsprojects.com/
- HTTP Methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

### MongoDB
- PyMongo Documentation: https://pymongo.readthedocs.io/
- MongoDB CRUD: https://docs.mongodb.com/manual/crud/

### Fetch API
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Error Handling: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### REST API Design
- REST Best Practices: https://restfulapi.net/
- Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
