# Expense Tracker Project Phases

## Overview
This project uses HTML, JavaScript, and Python (Flask) to build an expense tracking application. The development is intentionally broken into phases so the app can be learned and built step-by-step.

## Phase 1 — Landing Page (HTML + small JavaScript)
Goal: Build a simple landing page only. No backend or full app behavior.

### Requirements
- Create one static HTML landing page.
- Include a hero section with app name, short description, and navigation links.
- Add a section showing key features or benefits.
- Optional: use minimal JavaScript for small interactive behavior such as a scroll-to-section button.
- No backend integration.
- No data persistence.

### Acceptance Criteria
- The page renders in a browser using only HTML/CSS/JS.
- The page is visually presentable and explains the app.
- Navigation links can point to placeholder pages or anchor sections.

## Phase 2 — Core UI Pages (Static Simulation)
Goal: Build the main app UI pages without backend logic.

### Requirements
- Create separate static HTML pages for core screens:
  - Dashboard
  - Add Expense
  - Expenses list
  - Categories
  - Reports
- Each page should use consistent styling and navigation.
- The content should simulate app behavior with placeholder data.
- Use JavaScript only for UI interactions and static page behavior.
- No backend API calls.

### Acceptance Criteria
- The core pages are available as static HTML pages.
- UI design flows from landing page to app pages.
- The app feels complete from a visual standpoint.
- No real data saving or loading occurs.

## Phase 3 — Backend Integration
Goal: Build the backend to support the UI created in Phase 2.

### Requirements
- Implement Flask backend routes for page rendering and API endpoints.
- Add expense creation, reading, updating, and deletion endpoints.
- Add category creation, listing, and deletion endpoints.
- Connect the UI pages to the backend using JavaScript fetch/XHR calls.
- Use a simple database or local storage for persistence (MongoDB is already used in this workspace).

