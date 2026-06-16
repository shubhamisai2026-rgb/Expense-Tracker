# PHASE 1 REQUIREMENTS - Landing Page & Introduction

## 🎯 Phase Goal
Create a simple, attractive landing page that introduces the Expense Tracker application. This phase focuses on **HTML structure** and **minimal JavaScript** to understand the basics of web development.

---

## 📋 What You'll Learn

### HTML
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Form basics (even though we won't submit yet)
- Navigation structure

### CSS
- Flexbox layout
- Basic responsive design
- Color schemes and typography
- Simple animations (optional)

### JavaScript
- DOM selection and manipulation
- Event listeners (optional - only if needed for interactions)
- No backend calls yet

---

## ✅ Deliverables for Phase 1

### 1. **index.html** - Landing Page
Create a professional landing page with:
- **Header Section**: Logo/App name + Navigation menu
- **Hero Section**: Eye-catching introduction with app tagline
- **Features Section**: List 4-5 key features with icons/descriptions
- **Quick Demo Section**: Show sample expense data (static)
- **Call-to-Action**: Buttons to "Get Started" (links to Phase 2 pages)
- **Footer**: App info, copyright, social links (optional)

**Navigation Menu Should Have Links To:**
- Home (current page)
- Dashboard (Phase 2 - won't work yet, just link)
- Add Expense (Phase 2 - won't work yet, just link)
- Expenses (Phase 2 - won't work yet, just link)
- Categories (Phase 2 - won't work yet, just link)

### 2. **style.css** - Styling
Create a complete stylesheet with:
- Clean, modern design
- Responsive layout (mobile-first approach)
- Color scheme (suggest: Blue/White/Gray)
- Typography (readable fonts)
- Hover effects on buttons/links
- Flexbox/Grid for layout

**Suggested Color Palette:**
```
Primary: #2563eb (Blue)
Secondary: #1e40af (Dark Blue)
Accent: #10b981 (Green)
Background: #f9fafb (Light Gray)
Text: #1f2937 (Dark Gray)
```

### 3. **main.js** - Minimal JavaScript (Optional)
Keep this simple - only if needed for:
- Smooth scrolling on page
- Active navigation highlighting
- Simple button animations
- NO backend calls yet

---

## 📝 HTML Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker - Manage Your Finances</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <!-- Logo and Navigation -->
    </header>
    
    <main>
        <section class="hero">
            <!-- Main introduction -->
        </section>
        
        <section class="features">
            <!-- 4-5 features description -->
        </section>
        
        <section class="demo">
            <!-- Sample expense table (static data) -->
        </section>
        
        <section class="cta">
            <!-- Call to action buttons -->
        </section>
    </main>
    
    <footer>
        <!-- Footer info -->
    </footer>
    
    <script src="main.js"></script>
</body>
</html>
```

---

## 🎨 Visual Sections to Include

### Header
- App logo/name (left)
- Navigation menu (right)
- Fixed or sticky (optional)
- Responsive hamburger menu (bonus)

### Hero Section
- Large headline: "Manage Your Expenses Effortlessly"
- Subheading explaining the app
- Hero image (optional) or gradient background
- "Get Started" button

### Features Section
Show 4 key features:
1. 📊 **Track Expenses** - Simple expense logging
2. 📁 **Organize by Categories** - Categorize spending
3. 📈 **View Statistics** - See spending patterns
4. 💾 **Persistent Storage** - Data saved automatically

### Demo/Sample Section
Display a sample table:
```
Expense Name    | Category  | Amount | Date
Pizza           | Food      | ₹350   | 2026-06-15
Movie Ticket    | Entertain | ₹500   | 2026-06-14
Groceries       | Food      | ₹1200  | 2026-06-13
```

### Call-to-Action Section
- Button: "Go to Dashboard" → /dashboard (Phase 2 link)
- Button: "View All Expenses" → /expenses (Phase 2 link)

### Footer
- Copyright info
- Links (optional)
- Contact info (optional)

---

## 🎯 Requirements Checklist

### HTML
- [ ] Use semantic HTML tags
- [ ] Create proper header with navigation
- [ ] Design hero section with clear messaging
- [ ] Build features showcase
- [ ] Include sample data table
- [ ] Add footer
- [ ] All links are present (even if they don't work yet)
- [ ] Proper meta tags for responsiveness

### CSS
- [ ] Mobile-responsive design
- [ ] Flexbox/Grid layouts
- [ ] Proper spacing and padding
- [ ] Consistent color scheme
- [ ] Readable typography
- [ ] Hover effects on interactive elements
- [ ] Clean, organized code structure

### JavaScript (Optional)
- [ ] Active navigation highlighting (if page has jumps)
- [ ] Smooth scrolling (if long page)
- [ ] Simple animations (optional)
- [ ] No API calls

---

## 🚀 Success Criteria

**Phase 1 is complete when:**
1. Landing page displays correctly on desktop and mobile
2. Navigation menu is visible and styled properly
3. All sections (hero, features, demo, CTA) are present
4. Color scheme is applied consistently
5. Buttons have hover effects
6. Navigation links point to Phase 2 URLs (even if 404 errors)
7. Page is responsive (resize browser to check)
8. Code is clean and organized
9. No console errors

---

## 📊 Sample File Sizes
- `index.html` - ~150-250 lines
- `style.css` - ~200-350 lines
- `main.js` - ~50-100 lines (optional)

---

## 🔍 Testing Checklist

- [ ] Open page in browser: `file:///path/to/index.html`
- [ ] Check on mobile device or use browser's mobile view
- [ ] Click navigation links (they point to `/dashboard`, `/expenses`, etc.)
- [ ] Verify all text is readable
- [ ] Check button hover effects
- [ ] Inspect for console errors (F12 → Console)
- [ ] Validate HTML (no unclosed tags)

---

## 💡 Optional Enhancements

**These are BONUS - not required for Phase 1:**
- Hamburger menu for mobile
- Dark mode toggle
- Animated illustrations
- Scroll reveal animations
- Parallax effect on hero section
- Newsletter signup form

---

## ⏭️ Next Steps

Once Phase 1 is complete:
1. Get approval/feedback
2. Move to `PHASE_2_REQUIREMENTS.md`
3. Start building core UI pages with mock data

---

## 📚 Resources

### HTML Learning
- MDN HTML Guide: https://developer.mozilla.org/en-US/docs/Web/HTML
- Semantic HTML: https://developer.mozilla.org/en-US/docs/Glossary/Semantics

### CSS Learning
- MDN CSS Guide: https://developer.mozilla.org/en-US/docs/Web/CSS
- Flexbox: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
- Grid: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids

### JavaScript Learning
- MDN JS Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- DOM Manipulation: https://developer.mozilla.org/en-US/docs/Web/API/Document

---

## 🎬 Quick Start Command

```bash
# Phase 1 files to create:
touch index.html
touch style.css
touch main.js  # optional
```

Then open `index.html` in a browser (drag and drop to browser or use Live Server extension in VS Code).
