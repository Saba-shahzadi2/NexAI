# 🚀 NexAI — Modern AI SaaS Platform

NexAI is a modern, responsive AI SaaS platform built with a clean and professional user interface.

The project demonstrates a complete full-stack authentication workflow, protected routes, password recovery with OTP verification, contact form integration, responsive navigation, dark/light mode, and a scalable React + Node.js architecture.

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT-based authentication
- Secure password hashing with bcrypt
- Persistent login using localStorage
- Logout functionality
- Protected routes
- Current authenticated user endpoint

### 🔑 Password Recovery

- Forgot Password
- Email-based OTP generation
- OTP expiration
- OTP verification
- Password reset
- Secure password hashing after reset

### 🎨 UI & UX

- Modern SaaS-style interface
- Responsive design
- Mobile navigation menu
- Dark / Light mode
- Smooth animations
- AOS scroll animations
- Framer Motion animations
- Toast notifications
- Loading states
- Professional form validation

### 📩 Contact System

- Contact form
- Name validation
- Email validation
- Message validation
- Backend API integration
- MongoDB contact storage
- Success/error notifications

### 🛡️ Protected Pages

Authenticated users can access protected application pages such as:

- Features
- Pricing

Unauthenticated users are redirected to the Login page.

---

## 🧰 Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- AOS
- React Icons
- React Toastify
- React Helmet Async

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- CORS
- dotenv

---

## 📁 Project Architecture

```text
NexAI/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ScrollToTop.jsx
│   │   │
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── .env
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── contactController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Contact.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── contactRoutes.js
│   │
│   ├── .env
│   └── server.js
│
├── README.md
└── .gitignore
