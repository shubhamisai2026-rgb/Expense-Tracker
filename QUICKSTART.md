# Quick Start Guide - MongoDB Expense Tracker

## What Was Changed

### 1. Backend (app.py)
✅ MongoDB connection setup with database `expense_tracker`
✅ All duplicate routes removed
✅ 11 API endpoints created:
   - `/api/expenses` - POST (create), GET (read all)
   - `/api/expenses/<id>` - GET (read one), PUT (update), DELETE (delete)
   - `/api/categories` - POST (create), GET (read all)
   - `/api/categories/<id>` - DELETE (delete)
   - `/api/dashboard-stats` - GET (statistics)

### 2. Frontend JavaScript (static/main.js)
✅ Complete rewrite with MongoDB integration
✅ Functions for CRUD operations
✅ Automatic data loading on page load
✅ Real-time updates without page refresh
✅ Proper error handling and user feedback

### 3. HTML Templates (Updated)
✅ expenses.html - Removed hardcoded data, will load dynamically
✅ dashboard.html - Added IDs for dynamic content update
✅ categories.html - Added dynamic category list
✅ add-expense.html - Ready to work with JavaScript functions

---

## Setup Instructions

### Step 1: Install MongoDB (if not already installed)
Download from: https://www.mongodb.com/try/download/community
Or use Windows Subsystem for Linux (WSL)

### Step 2: Start MongoDB
```powershell
mongod
```
Keep this terminal open

### Step 3: Run Your Flask App
```powershell
python app.py
```

### Step 4: Open in Browser
Visit: `http://localhost:5000`

---

## What Each Page Does

### 1. Dashboard (`/dashboard`)
- Displays total expenses count
- Shows total amount spent
- Shows average expense amount
- All data fetched from MongoDB in real-time

### 2. Add Expense (`/add-expense`)
- Form to create new expense
- Categories auto-loaded from MongoDB
- Saves to MongoDB when submitted
- Redirects to expenses page after save

### 3. Expenses (`/expenses`)
- View all expenses from MongoDB
- Edit button to modify amount
- Delete button to remove expense
- Sorted by date (newest first)

### 4. Categories (`/categories`)
- Add new categories
- View all categories from MongoDB
- Delete categories

---

## Testing the Application

### Test 1: Add a Category
1. Go to Categories page
2. Enter "Food" and click "Add Category"
3. Should see "Food" in the list

### Test 2: Add an Expense
1. Go to "Add Expense"
2. Fill form:
   - Name: "Pizza"
   - Amount: 350
   - Category: "Food" (should appear in dropdown)
   - Date: Today's date
   - Notes: "Lunch"
3. Click "Save Expense"
4. Should redirect to Expenses page and show Pizza

### Test 3: Edit an Expense
1. On Expenses page, click "Edit" button
2. Enter new amount
3. Amount should update in the table

### Test 4: Delete an Expense
1. On Expenses page, click "Delete" button
2. Confirm deletion
3. Expense should disappear from table

### Test 5: Check Dashboard
1. Go to Dashboard
2. Should show:
   - Total Expenses: 1
   - Total Amount: 350
   - Average Expense: 350

---

## Database Files

MongoDB stores data in:
```
Windows: C:\Program Files\MongoDB\Server\{version}\data\
Mac: /usr/local/var/mongodb/
Linux: /var/lib/mongodb/
```

Your expense_tracker database and collections are stored there automatically.

---

## Common Issues & Solutions

### Issue 1: "MongoClient connection error"
**Solution**: Make sure MongoDB is running (`mongod` command)

### Issue 2: Expenses not showing up
**Solution**: 
- Check browser console (F12) for errors
- Make sure MongoDB is running
- Refresh the page

### Issue 3: Categories dropdown is empty
**Solution**: Add a category first, then refresh the Add Expense page

### Issue 4: "Port 5000 already in use"
**Solution**: Either:
- Close other apps using port 5000
- Or change port in app.py line: `app.run(port=5001)`

---

## API Testing with curl

You can test endpoints using curl:

```powershell
# Add expense
curl -X POST http://localhost:5000/api/expenses `
  -H "Content-Type: application/json" `
  -d "{\"expense_name\":\"Lunch\",\"amount\":350,\"category\":\"Food\",\"date\":\"2026-06-15\",\"notes\":\"Pizza\"}"

# Get all expenses
curl http://localhost:5000/api/expenses

# Add category
curl -X POST http://localhost:5000/api/categories `
  -H "Content-Type: application/json" `
  -d "{\"category_name\":\"Entertainment\"}"

# Get dashboard stats
curl http://localhost:5000/api/dashboard-stats
```

---

## Files Modified

1. **app.py** - Complete rewrite with MongoDB API endpoints
2. **static/main.js** - Complete rewrite with CRUD functions
3. **templates/expenses.html** - Updated to load data dynamically
4. **templates/dashboard.html** - Updated with data IDs
5. **templates/categories.html** - Updated with dynamic list

---

## Next Steps

1. ✅ Start MongoDB
2. ✅ Run `python app.py`
3. ✅ Visit `http://localhost:5000`
4. ✅ Test all features
5. ✅ Read MONGODB_SETUP.md for detailed API documentation

---

**All your data is now safely stored in MongoDB! 🎉**
