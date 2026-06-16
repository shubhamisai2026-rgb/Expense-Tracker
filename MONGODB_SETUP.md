# MongoDB Integration Guide

## Overview
Your Expense Tracker application is now fully integrated with MongoDB! All data (expenses and categories) is stored in MongoDB instead of temporary storage.

## Prerequisites
- MongoDB installed and running locally on `mongodb://localhost:27017`
- Python 3.x with Flask and PyMongo installed

## Features Implemented

### 1. **Expense Management (CRUD Operations)**
- **CREATE**: Add new expenses via `/api/expenses` (POST)
- **READ**: Fetch all expenses via `/api/expenses` (GET)
- **UPDATE**: Update existing expenses via `/api/expenses/<id>` (PUT)
- **DELETE**: Delete expenses via `/api/expenses/<id>` (DELETE)

### 2. **Category Management**
- **CREATE**: Add new categories via `/api/categories` (POST)
- **READ**: Fetch all categories via `/api/categories` (GET)
- **DELETE**: Delete categories via `/api/categories/<id>` (DELETE)

### 3. **Dashboard Statistics**
- **FETCH STATS**: Get dashboard data via `/api/dashboard-stats` (GET)
- Shows:
  - Total number of expenses
  - Total amount spent
  - Average expense amount

## API Endpoints

### Expense Endpoints

#### Create Expense
```
POST /api/expenses
Content-Type: application/json

{
    "expense_name": "Lunch",
    "amount": 350,
    "category": "Food",
    "date": "2026-06-15",
    "notes": "Lunch at cafe"
}
```

#### Get All Expenses
```
GET /api/expenses
```
Returns all expenses sorted by date (newest first).

#### Get Single Expense
```
GET /api/expenses/<expense_id>
```

#### Update Expense
```
PUT /api/expenses/<expense_id>
Content-Type: application/json

{
    "expense_name": "Lunch",
    "amount": 400,
    "category": "Food",
    "date": "2026-06-15",
    "notes": "Updated lunch cost"
}
```

#### Delete Expense
```
DELETE /api/expenses/<expense_id>
```

### Category Endpoints

#### Create Category
```
POST /api/categories
Content-Type: application/json

{
    "category_name": "Entertainment"
}
```

#### Get All Categories
```
GET /api/categories
```

#### Delete Category
```
DELETE /api/categories/<category_id>
```

### Dashboard Endpoints

#### Get Dashboard Statistics
```
GET /api/dashboard-stats
```
Returns:
```json
{
    "success": true,
    "total_expenses": 5,
    "total_amount": 2000.50,
    "average_amount": 400.10,
    "expense_count": 5
}
```

## Database Structure

### MongoDB Collections

#### expenses Collection
```json
{
    "_id": ObjectId,
    "expense_name": "string",
    "amount": "float",
    "category": "string",
    "date": "string (YYYY-MM-DD)",
    "notes": "string",
    "created_at": "datetime",
    "updated_at": "datetime (optional)"
}
```

#### categories Collection
```json
{
    "_id": ObjectId,
    "category_name": "string",
    "created_at": "datetime"
}
```

## How to Use

### Starting the Application

1. **Ensure MongoDB is running**
   ```
   mongod
   ```

2. **Run the Flask application**
   ```
   python app.py
   ```

3. **Access the application**
   - Navigate to `http://localhost:5000`

### Frontend Operations

#### Adding an Expense
1. Click on "Add Expense" in the navigation
2. Fill in the form:
   - Expense Name
   - Amount
   - Category (automatically loaded from MongoDB)
   - Date
   - Notes
3. Click "Save Expense"
4. The expense is saved to MongoDB and you're redirected to Expenses page

#### Viewing All Expenses
1. Click on "Expenses" in the navigation
2. All expenses from MongoDB are displayed in a table
3. Click "Edit" to modify an expense
4. Click "Delete" to remove an expense

#### Managing Categories
1. Click on "Categories" in the navigation
2. Type a new category name and click "Add Category"
3. View all categories loaded from MongoDB
4. Click "Delete" to remove a category

#### Dashboard
1. Click on "Dashboard" in the navigation
2. View real-time statistics:
   - Total number of expenses
   - Total amount spent
   - Average expense amount

## JavaScript Functions

### Expense Functions
- `saveExpense()` - Save new expense to MongoDB
- `loadExpenses()` - Load and display all expenses
- `editExpense(expenseId)` - Edit an existing expense
- `deleteExpense(expenseId)` - Delete an expense

### Category Functions
- `addCategory()` - Add new category to MongoDB
- `loadCategories()` - Load and display all categories
- `deleteCategory(categoryId)` - Delete a category

### Dashboard Functions
- `loadDashboardStats()` - Load and display dashboard statistics

## Important Notes

1. **MongoDB Connection**: The app connects to `mongodb://localhost:27017` by default. Modify in `app.py` if using a different connection string.

2. **Database Name**: Database is named `expense_tracker`

3. **Collections**: 
   - `expenses` - Stores all expense records
   - `categories` - Stores all category records

4. **Error Handling**: All API endpoints return JSON responses with `success` field and error messages if something fails.

5. **Data Persistence**: All data is permanently stored in MongoDB and will persist even after the application is closed.

## Troubleshooting

### MongoDB Connection Error
- **Error**: "ConnectionFailure"
- **Solution**: Ensure MongoDB is running. Start MongoDB with `mongod` command.

### Module Not Found: pymongo
- **Error**: "ModuleNotFoundError: No module named 'pymongo'"
- **Solution**: Install pymongo with `pip install pymongo`

### Port Already in Use
- **Error**: "Address already in use" for port 5000
- **Solution**: Change the port in `app.py` or stop the existing process using port 5000

## File Structure

```
expense-tracker/
├── app.py                 # Main Flask application with all API routes
├── static/
│   ├── main.js           # JavaScript with all CRUD functions
│   └── style.css         # CSS styling
└── templates/
    ├── index.html        # Home page
    ├── dashboard.html    # Dashboard with statistics
    ├── add-expense.html  # Add new expense form
    ├── expenses.html     # View all expenses
    ├── categories.html   # Manage categories
    └── reports.html      # Reports page
```

## Next Steps

1. **Customize the UI** - Update `style.css` to match your preferences
2. **Add More Features** - Implement reports, monthly summaries, etc.
3. **Add Authentication** - Implement user login for multi-user support
4. **Deploy** - Deploy to cloud services (Heroku, AWS, etc.)

## Support

For issues or questions, check:
- Flask Documentation: https://flask.palletsprojects.com/
- PyMongo Documentation: https://pymongo.readthedocs.io/
- MongoDB Documentation: https://docs.mongodb.com/
