# Transaction System Frontend

A  transaction management application built using React. The application provides secure authentication, account management, transaction processing, and a responsive dashboard interface.

The frontend communicates with the backend API to allow users to securely manage balances, perform financial operations, and track transaction activity.

---

# Preview

Features available in the application:

* User registration
* Secure login
* JWT authentication flow
* Session handling
* Dashboard overview
* Deposit money
* Withdraw money
* Transfer funds
* Transaction history
* Transaction details view
* PDF receipt generation
* Admin controls
* Responsive UI
* Session expiry handling

---

# Tech Stack

### Frontend

* React
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form
* JWT Decode
* Lucide React Icons

### Backend Integration

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Refresh Tokens

---

# Project Structure

```bash
src/
│
├── components/
│   ├── BalanceCard.jsx
│   ├── QuickActions.jsx
│   ├── TransactionList.jsx
│   ├── AmountModal.jsx
│   ├── Loader.jsx
│   └── Navbar.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── LandingPage.jsx
│   ├── AdminPanel.jsx
│   └── TransactionDetails.jsx
│
├── hooks/
│   └── useTokenExpiry.js
│
├── services/
│   ├── api.js
│   ├── auth.js
│   └── transaction.js
│
├── routes/
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
│
├── utils/
│   └── auth.js
│
├── App.jsx
└── main.jsx
```



---


# Authentication Flow

Authentication uses:

* JWT access tokens
* Refresh token cookies
* Protected routes
* Automatic token refresh
* Session expiration handling

Flow:

```text
User Login
     ↓
Receive Access Token
     ↓
Store token locally
     ↓
Attach token to requests
     ↓
Protected Route Access
     ↓
Access token expires
     ↓
Refresh token generates new access token
```

---

# Dashboard Features

### Balance Overview

Displays:

* Current balance
* Account number
* User information
* Session countdown

### Quick Actions

Allows users to:

* Deposit funds
* Withdraw funds
* Transfer funds

### Transaction Management

Displays:

* Transaction history
* Transaction details
* PDF generation
* Transaction status

---

# Admin Features

Administrative capabilities include:

* Transaction monitoring
* Transaction reversal
* Restricted role access

---

# Security Features

### JWT Authentication

Secure route access through signed access tokens.

### Protected Routes

Unauthenticated users cannot access private pages.

### Refresh Tokens

Automatically renew user sessions.

### Idempotency Protection

Prevents duplicate transaction submissions.

### Session Handling

Handles session expiration and redirects users safely.

---

# Responsive Design

Supports:

* Mobile devices
* Tablets
* Desktop screens

UI design includes:

* Gradient cards
* Interactive buttons
* Modals
* Fintech-style layouts
* Responsive dashboard sections

---

# Future Improvements

Potential enhancements:

* Email verification
* OTP authentication
* Real-time notifications
* Analytics dashboard
* Dark/light theme toggle
* Multi-currency support
* WebSocket updates
* Charts and reports

---




# Author

Bashudev Ghimire

---
