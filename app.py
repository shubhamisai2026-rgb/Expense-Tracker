from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os

app = Flask(__name__)

# MongoDB Connection
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['expense_tracker']
    expenses_collection = db['expenses']
    categories_collection = db['categories']
    print(" Connected to MongoDB successfully!")
except Exception as e:
    print(f" MongoDB Connection Error: {e}")

# ===== ROUTES FOR PAGES =====

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

@app.route('/reports')
def reports():
    return render_template('reports.html')

# ===== API ENDPOINTS FOR EXPENSES =====

@app.route('/api/expenses', methods=['POST'])
def create_expense():
    """Create a new expense"""
    try:
        data = request.json
        
        # Validate required fields
        if not all(k in data for k in ['expense_name', 'amount', 'category', 'date']):
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        expense = {
            'expense_name': data['expense_name'],
            'amount': float(data['amount']),
            'category': data['category'],
            'date': data['date'],
            'notes': data.get('notes', ''),
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        
        result = expenses_collection.insert_one(expense)
        return jsonify({'success': True, 'expense_id': str(result.inserted_id)})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/expenses', methods=['GET'])
def get_all_expenses():
    """Get all expenses"""
    try:
        expenses = list(expenses_collection.find().sort('date', -1))
        
        # Convert ObjectId to string for JSON serialization
        for expense in expenses:
            expense['_id'] = str(expense['_id'])
        
        return jsonify({'success': True, 'expenses': expenses})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/expenses/<expense_id>', methods=['GET'])
def get_expense(expense_id):
    """Get a single expense"""
    try:
        expense = expenses_collection.find_one({'_id': ObjectId(expense_id)})
        
        if not expense:
            return jsonify({'success': False, 'error': 'Expense not found'}), 404
        
        expense['_id'] = str(expense['_id'])
        return jsonify({'success': True, 'expense': expense})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/expenses/<expense_id>', methods=['PUT'])
def update_expense(expense_id):
    """Update an expense"""
    try:
        data = request.json
        
        update_data = {
            'expense_name': data.get('expense_name'),
            'amount': float(data.get('amount')),
            'category': data.get('category'),
            'date': data.get('date'),
            'notes': data.get('notes', ''),
            'updated_at': datetime.now()
        }
        
        result = expenses_collection.update_one(
            {'_id': ObjectId(expense_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Expense not found'}), 404
        
        return jsonify({'success': True, 'message': 'Expense updated successfully'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/expenses/<expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    """Delete an expense"""
    try:
        result = expenses_collection.delete_one({'_id': ObjectId(expense_id)})
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Expense not found'}), 404
        
        return jsonify({'success': True, 'message': 'Expense deleted successfully'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# ===== API ENDPOINTS FOR CATEGORIES =====

@app.route('/api/categories', methods=['POST'])
def create_category():
    """Create a new category"""
    try:
        data = request.json
        
        if 'category_name' not in data:
            return jsonify({'success': False, 'error': 'Category name is required'}), 400
        
        # Check if category already exists
        existing = categories_collection.find_one({'category_name': data['category_name']})
        if existing:
            return jsonify({'success': False, 'error': 'Category already exists'}), 400
        
        category = {
            'category_name': data['category_name'],
            'created_at': datetime.now()
        }
        
        result = categories_collection.insert_one(category)
        return jsonify({'success': True, 'category_id': str(result.inserted_id)})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/categories', methods=['GET'])
def get_all_categories():
    """Get all categories"""
    try:
        categories = list(categories_collection.find())
        
        # Convert ObjectId to string
        for category in categories:
            category['_id'] = str(category['_id'])
        
        return jsonify({'success': True, 'categories': categories})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/categories/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    """Delete a category"""
    try:
        result = categories_collection.delete_one({'_id': ObjectId(category_id)})
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Category not found'}), 404
        
        return jsonify({'success': True, 'message': 'Category deleted successfully'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# ===== API ENDPOINTS FOR DASHBOARD =====

@app.route('/api/dashboard-stats', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics"""
    try:
        expenses = list(expenses_collection.find())
        
        total_expenses = len(expenses)
        total_amount = sum(expense['amount'] for expense in expenses)
        average_amount = total_amount / total_expenses if total_expenses > 0 else 0
        
        return jsonify({
            'success': True,
            'total_expenses': total_expenses,
            'total_amount': round(total_amount, 2),
            'average_amount': round(average_amount, 2),
            'expense_count': total_expenses
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
 