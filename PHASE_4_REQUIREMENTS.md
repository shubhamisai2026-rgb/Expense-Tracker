# PHASE 4 REQUIREMENTS - Authentication & User Sessions

## 🎯 Phase Goal
Add user authentication system with login/signup. Learn secure password handling, session management, and protecting API endpoints with user context.

**Note:** This phase is for FUTURE implementation. Complete Phase 3 first.

---

## 📋 What You'll Learn

### Security
- Password hashing (bcrypt)
- Session management
- JWT tokens (optional)
- Protecting API endpoints

### Python/Flask
- User model creation
- Login/signup routes
- Middleware for authentication
- Session/cookie handling

### Database
- User collection in MongoDB
- Storing hashed passwords (never plain text!)
- User session data

---

## ✅ Deliverables for Phase 4

### 1. New Pages
- **templates/auth/login.html** - Login form
- **templates/auth/signup.html** - User registration form

### 2. New Backend Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### 3. Protected Endpoints
- All existing endpoints require authentication
- API checks if user is logged in
- Returns 401 Unauthorized if not authenticated

### 4. User Model
```javascript
{
    "_id": ObjectId,
    "username": String (unique),
    "email": String (unique),
    "password": String (hashed with bcrypt),
    "created_at": DateTime
}
```

### 5. Session Management
- Store user_id in session
- Create session on login
- Clear session on logout

---

## 🎯 Requirements Checklist

- [ ] User collection in MongoDB
- [ ] Signup page with form validation
- [ ] Login page with email/password
- [ ] Password hashing with bcrypt
- [ ] Session management
- [ ] Protected API endpoints
- [ ] Logout functionality
- [ ] Error messages for wrong credentials
- [ ] Redirect unauthenticated users to login

---

## ⏭️ When Ready
After Phase 3 is complete and working, proceed to PHASE_4_REQUIREMENTS.md for detailed implementation.
