from flask import Flask, redirect, render_template, request, jsonify
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from flask import session
import csv
from io import StringIO
from flask import Response
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

app = Flask(__name__)
app.secret_key = "expense_tracker_secret"

# MongoDB Connection
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['expense_tracker']
    expenses_collection = db['expenses']
    categories_collection = db['categories']
    users_collection = db['users']
    print(" Connected to MongoDB successfully!")
except Exception as e:
    print(f" MongoDB Connection Error: {e}")

# ===== ROUTES FOR PAGES =====

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():

    if "username" not in session:
        return redirect("/login")

    return render_template(
"dashboard.html",
username=session["username"]
)

@app.route('/add-expense')
def add_expense():

    if "username" not in session:
        return redirect("/login")

    return render_template('add-expense.html')

@app.route('/expenses')
def expenses():

    if "username" not in session:
        return redirect("/login")

    return render_template('expenses.html')

@app.route('/categories')
def categories():

    if "username" not in session:
        return redirect("/login")

    return render_template('categories.html')

@app.route('/reports')
def reports():

    if "username" not in session:
        return redirect("/login")

    return render_template('reports.html')
@app.route('/profile')
def profile():

    if "user_id" not in session:
        return redirect("/login")

    return render_template("profile.html")

@app.route('/forgot-password')
def forgot_password():
    return render_template(
'forgot_password.html'
)
# ===== API ENDPOINTS FOR EXPENSES =====
@app.route('/api/reports', methods=['GET'])
def get_reports():

    try:

        if "user_id" not in session:
            return jsonify({
        "success": False,
        "error": "Login Required"
    })

        expenses = list(
            expenses_collection.find({
            "user_id": session["user_id"]
        })
    )

        total_this_month = 0
        category_totals = {}

        for expense in expenses:

            amount = float(expense['amount'])
            total_this_month += amount

            category = expense['category']

            if category in category_totals:
                category_totals[category] += amount
            else:
                category_totals[category] = amount

        highest_category = "None"

        if category_totals:
                highest_category = max(
                    category_totals,
                    key=category_totals.get
                )

        user = users_collection.find_one({
                    "_id": ObjectId(session["user_id"])
                })

        budget = float(
                    user.get("budget", 50000)
                )

        usage_percentage = (
                    total_this_month / budget * 100
                ) if budget > 0 else 0

        return jsonify({
            "success": True,
            "total_this_month": round(
                total_this_month,
                2
            ),
            "highest_category": highest_category,
            "remaining_budget": round(
                budget - total_this_month,
                2
            ),
            "usage_percentage": round(
                usage_percentage,
                2
            ),
            "category_breakdown": category_totals
        })

    except Exception as e:

        return jsonify({
    "success": False,
    "error": str(e)
}), 500

@app.route('/api/expenses', methods=['POST'])
def create_expense():
    """Create a new expense"""
    try:
        data = request.json
        if "user_id" not in session:
            return jsonify({
"success": False,
"error": "Login Required"
})
        
        # Validate required fields
        if not all(k in data for k in ['expense_name', 'amount', 'category', 'date']):
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        expense = {
    'user_id': session["user_id"],

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
        if "user_id" not in session:
            return jsonify({
"success": False,
"error": "Login Required"
})
        expenses = list(
    expenses_collection.find({
        "user_id": session["user_id"]
    }).sort('date', -1)
)
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

        if "user_id" not in session:
            return jsonify({
        "success": False,
        "error": "Login Required"
    })

        expense = expenses_collection.find_one({
        '_id': ObjectId(expense_id),
        'user_id': session["user_id"]
    })

        if not expense:
            return jsonify({
    'success': False,
    'error': 'Expense not found'
}), 404

        expense['_id'] = str(expense['_id'])

        return jsonify({
    'success': True,
    'expense': expense
})

    except Exception as e:

        return jsonify({
    'success': False,
    'error': str(e)
}), 500

@app.route('/api/expenses/<expense_id>', methods=['PUT'])
def update_expense(expense_id):

    try:

        if "user_id" not in session:
            return jsonify({
        "success": False,
        "error": "Login Required"
    })

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
        {
            '_id': ObjectId(expense_id),
            'user_id': session["user_id"]
        },
        {
            '$set': update_data
        }
    )

        if result.matched_count == 0:
           return jsonify({
    'success': False,
    'error': 'Expense not found'
}), 404

        return jsonify({
    'success': True,
    'message': 'Expense updated successfully'
})

    except Exception as e:
 
        return jsonify({
    'success': False,
    'error': str(e)
}), 500
@app.route('/api/expenses/<expense_id>', methods=['DELETE'])
def delete_expense(expense_id):

    try:

        if "user_id" not in session:
            return jsonify({
        "success": False,
        "error": "Login Required"
    })

        result = expenses_collection.delete_one({
        '_id': ObjectId(expense_id),
        'user_id': session["user_id"]
    })

        if result.deleted_count == 0:
           return jsonify({
    'success': False,
    'error': 'Expense not found'
}), 404

        return jsonify({
    'success': True,
    'message': 'Expense deleted successfully'
})

    except Exception as e:

        return jsonify({
    'success': False,
    'error': str(e)
}), 500
# ===== API ENDPOINTS FOR CATEGORIES =====

@app.route('/api/categories', methods=['POST'])
def create_category():
    """Create a new category"""
    if "user_id" not in session:
        return jsonify({
"success": False,
"error": "Login Required"
})
    try:
        data = request.json
        
        if 'category_name' not in data:
            return jsonify({'success': False, 'error': 'Category name is required'}), 400
        
        # Check if category already exists
        existing = categories_collection.find_one({'category_name': data['category_name']})
        if existing:
            return jsonify({'success': False, 'error': 'Category already exists'}), 400
        
        category = {
    'user_id': session["user_id"],
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
    if "user_id" not in session:
        return jsonify({
"success": False,
"error": "Login Required"
})
    try:
        categories = list(
    categories_collection.find({
        "user_id": session["user_id"]
    })
)
        
        # Convert ObjectId to string
        for category in categories:
            category['_id'] = str(category['_id'])
        
        return jsonify({'success': True, 'categories': categories})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/categories/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    """Delete a category"""
    if "user_id" not in session:
        return jsonify({
"success": False,
"error": "Login Required"
})
    try:
        result = categories_collection.delete_one({
    '_id': ObjectId(category_id),
    'user_id': session["user_id"]
})
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
        if "user_id" not in session:
            return jsonify({
"success": False,
"error": "Login Required"
})
        expenses = list(
    expenses_collection.find({
        "user_id": session["user_id"]
    })
)
        
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
@app.route('/api/register', methods=['POST'])
def register_user():

    try:

        data = request.json

        # Check username already exists
        existing_user = users_collection.find_one({
            "username": data["username"]
        })

        if existing_user:
            return jsonify({
        "success": False,
        "error": "Username already exists"
    })

        user = {
        "name": data["name"],
        "email": data["email"],
        "phone": data["phone"],
        "username": data["username"],
        "budget": float(data["budget"]),
      "password": generate_password_hash(
    data["password"]
)
    }

        users_collection.insert_one(user)

        return jsonify({
        "success": True,
        "message": "User Registered Successfully"
    })

    except Exception as e:

        return jsonify({
    "success": False,
    "error": str(e)
}), 500
    
@app.route('/api/login', methods=['POST'])
def login_user():

    try:

        data = request.json

        user = users_collection.find_one({
            "username": data["username"]
        })

        if not user:
            return jsonify({
        "success": False,
        "error": "User not found"
            })

        if not check_password_hash(
        user["password"],
        data["password"]
    ):
            return jsonify({
    "success": False,
    "error": "Wrong password"
})

# Create Session
        session["username"] = user["username"]
        session["user_id"] = str(user["_id"])

        return jsonify({
    "success": True,
    "message": "Login Successful"
})

    except Exception as e:

        return jsonify({
    "success": False,
    "error": str(e)
}), 500

@app.route("/check-session")
def check_session():

    if "username" in session:

        return (
    "Logged in as "
    + session["username"]
)

    return "Not Logged In"

@app.route("/logout")
def logout():

    session.clear()

    return redirect("/login")

@app.route('/api/export-csv')
def export_csv():

    if "user_id" not in session:
        return jsonify({
    "success": False,
    "error": "Login Required"
})

    expenses = list(
        expenses_collection.find({
        "user_id": session["user_id"]
    })
)

    output = StringIO()

    writer = csv.writer(output)

    writer.writerow([
    "Expense Name",
    "Category",
    "Amount",
    "Date",
    "Notes"
])

    for expense in expenses:

        writer.writerow([
            expense["expense_name"],
            expense["category"],
            expense["amount"],
            expense["date"],
            expense.get("notes", "")
    ])

    output.seek(0)

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={
    "Content-Disposition":
        "attachment; filename=expenses.csv"
    }
)
@app.route('/api/export-pdf')
def export_pdf():

    if "user_id" not in session:
        return jsonify({
    "success": False,
    "error": "Login Required"
})

    expenses = list(
        expenses_collection.find({
        "user_id": session["user_id"]
    })
)

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    content = []

    content.append(
    Paragraph(
        "Expense Tracker Report",
        styles['Title']
    )
)

    content.append(Spacer(1, 12))

    if len(expenses) == 0:

        content.append(
            Paragraph(
            "No expenses found.",
            styles['BodyText']
        )
    )

    else:

        for expense in expenses:
 
            text = (
            f"Expense: {expense['expense_name']}<br/>"
            f"Category: {expense['category']}<br/>"
            f"Amount: Rs. {expense['amount']}<br/>"
            f"Date: {expense['date']}<br/>"
            f"Notes: {expense.get('notes', '')}<br/><br/>"
        )

            content.append(
                Paragraph(
                    text,
                    styles['BodyText']
            )
        )

        doc.build(content)

        pdf = buffer.getvalue()

        buffer.close()

        return Response(
            pdf,
            mimetype="application/pdf",
            headers={
        "Content-Disposition":
            "attachment; filename=Expense_Report.pdf"
        }
    )
@app.route('/api/monthly-analytics')
def monthly_analytics():

    if "user_id" not in session:
        return jsonify({
    "success": False,
    "error": "Login Required"
})

    expenses = list(
        expenses_collection.find({
        "user_id": session["user_id"]
    })
)

    monthly_data = {}

    for expense in expenses:

        month = expense["date"][:7]

        amount = float(expense["amount"])

        if month in monthly_data:
            monthly_data[month] += amount
        else:
            monthly_data[month] = amount

    return jsonify({
    "success": True,
    "monthly_data": monthly_data
})

@app.route('/api/profile')
def get_profile():

    if "user_id" not in session:
        return jsonify({
    "success": False
})

    user = users_collection.find_one({
    "_id": ObjectId(
        session["user_id"]
    )
})

    return jsonify({
    "success": True,
    "name": user["name"],
    "email": user["email"],
    "phone": user["phone"],
    "budget": user["budget"]
})

@app.route('/api/reset-password', methods=['POST'])
def reset_password():

    data = request.json

    user = users_collection.find_one({
        "username": data["username"]
    })

    if not user:
        return jsonify({
    "success": False,
    "error": "User not found"
})

    users_collection.update_one(
    {"username": data["username"]},
    {
        "$set": {
            "password": generate_password_hash(
                data["password"]
            )
        }
    }
)

    return jsonify({
    "success": True
})

@app.route('/api/profile', methods=['PUT'])
def update_profile():

    if "user_id" not in session:
        return jsonify({
    "success": False,
    "error": "Login Required"
})

    try:

        data = request.json

        users_collection.update_one(
        {
            "_id": ObjectId(
                session["user_id"]
            )
        },
        {
            "$set": {
                "name": data["name"],
                "email": data["email"],
                "phone": data["phone"],
                "budget": float(
                    data["budget"]
                )
            }
        }
    )

        return jsonify({
"success": True,
"message": "Profile Updated"
})

    except Exception as e:

         return jsonify({
"success": False,
"error": str(e)
})

@app.errorhandler(404)
def page_not_found(e):
    return render_template(
"404.html"
), 404


@app.errorhandler(500)
def internal_error(e):
    return render_template(
"500.html"
), 500
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
 