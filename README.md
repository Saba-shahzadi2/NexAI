# 🚀 NexAI — Modern AI SaaS Platform

NexAI is a modern, responsive AI SaaS platform built with **React, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB**.

The project demonstrates a complete full-stack application with secure authentication, JWT-protected routes, OTP-based password recovery, an admin dashboard, dynamic content management, REST APIs, responsive UI, dark/light mode, and a scalable frontend/backend architecture.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Secure password hashing with bcryptjs
* Persistent authentication using localStorage
* Logout functionality
* Protected routes
* Authenticated user (`/me`) endpoint
* Admin role-based authorization
* Protected admin dashboard

### 🔑 Password Recovery

* Forgot Password flow
* Email-based OTP generation
* OTP expiration
* OTP verification
* Password reset
* Secure password hashing after reset

### 🎨 UI & UX

* Modern SaaS-style interface
* Fully responsive design
* Mobile navigation
* Dark / Light mode
* Smooth scrolling
* Framer Motion animations
* AOS scroll animations
* Toast notifications
* Loading states
* Form validation
* Custom 404 page
* Privacy Policy page
* Terms & Conditions page

### 🏠 Public Website

* Hero section
* Features section
* How It Works section
* Pricing section
* FAQ section
* Testimonials
* Trusted Companies
* Dynamic Statistics
* Contact section
* Responsive Navbar
* Professional Footer

### 🛡️ Admin Dashboard

The admin dashboard provides protected management functionality for the platform.

* Admin dashboard statistics
* User management
* Contact management
* Pricing management
* FAQ management
* Features management
* How It Works management
* Testimonials management
* Trusted Companies management

Admin functionality is protected using authentication and admin authorization middleware.

### 📊 Dynamic Content Management

Website content is connected to backend REST APIs instead of being completely hardcoded.

The application includes APIs for:

* Pricing
* Features
* FAQ
* How It Works
* Testimonials
* Statistics
* Trusted Companies
* Contact messages
* Authentication
* Admin management

### 📩 Contact System

* Contact form
* Name validation
* Email validation
* Message validation
* Backend API integration
* MongoDB storage
* Admin contact management
* Success/error notifications

---

## 🧰 Tech Stack

### Frontend

* React 19
* Vite
* JavaScript
* Tailwind CSS
* React Router DOM
* Axios
* Framer Motion
* AOS
* React Icons
* React Toastify
* React Helmet Async

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Nodemailer
* CORS
* dotenv

### Development Tools

* Git
* GitHub
* ESLint
* Nodemon
* MongoDB Atlas

---

## 🏗️ Project Architecture

```text
NexAI/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── adminAPI.js
│   │   │   ├── authAPI.js
│   │   │   ├── axios.js
│   │   │   ├── contactAPI.js
│   │   │   ├── faqAPI.js
│   │   │   ├── featureAPI.js
│   │   │   ├── howItWorksAPI.js
│   │   │   ├── pricingAPI.js
│   │   │   ├── statsAPI.js
│   │   │   ├── testimonialAPI.js
│   │   │   └── trustedAPI.js
│   │   │
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   └── AdminSidebar.jsx
│   │   │   │
│   │   │   ├── Button.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Trusted.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── AdminContacts.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminFAQ.jsx
│   │   │   ├── AdminFeatures.jsx
│   │   │   ├── AdminHowItWorks.jsx
│   │   │   ├── AdminPricing.jsx
│   │   │   ├── AdminTestimonials.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Page404.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── TermsConditions.jsx
│   │   │   └── VerifyOTP.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── netlify.toml
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── faqController.js
│   │   ├── featureController.js
│   │   ├── howItWorksController.js
│   │   ├── pricingController.js
│   │   ├── statsController.js
│   │   ├── testimonialController.js
│   │   └── trustedController.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── Contact.js
│   │   ├── FAQ.js
│   │   ├── Feature.js
│   │   ├── HowItWorks.js
│   │   ├── PricingPlan.js
│   │   ├── Testimonial.js
│   │   ├── TrustedCompany.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── faqRoutes.js
│   │   ├── featureRoutes.js
│   │   ├── howItWorksRoutes.js
│   │   ├── pricingRoutes.js
│   │   ├── statsRoutes.js
│   │   ├── testimonialRoutes.js
│   │   └── trustedRoutes.js
│   │
│   ├── seed/
│   │   └── trustedSeed.js
│   │
│   ├── .env.example
│   ├── app.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ Axios
 ▼
Express REST API
 │
 ├── Authentication
 ├── Authorization
 ├── Content APIs
 ├── Admin APIs
 └── Contact APIs
 │
 ▼
MongoDB
```

Authentication flow:

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Protected Route
   ↓
Authenticated User
```

Password recovery flow:

```text
Forgot Password
       ↓
OTP Generated
       ↓
Email Sent
       ↓
Verify OTP
       ↓
Reset Password
       ↓
Password Updated
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Saba-shahzadi2/NexAI.git

cd NexAI
```

### 2. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5001/api
```

Start the frontend:

```bash
npm run dev
```

---

### 3. Setup Backend

Open another terminal:

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

Start the backend:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

## 🔐 Environment Variables

### Client

```env
VITE_API_URL=http://localhost:5001/api
```

### Server

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

> Never commit your real `.env` files or secret credentials to GitHub.

---

## 📡 API Modules

### Authentication

```text
/api/auth
```

Handles:

* Registration
* Login
* Current user
* Forgot Password
* OTP verification
* Password reset

### Contact

```text
/api/contact
```

Handles contact form submissions.

### Public Content

```text
/api/pricing
/api/features
/api/faq
/api/how-it-works
/api/testimonials
/api/stats
/api/trusted
```

### Admin

```text
/api/admin
```

Provides protected administrative functionality for users, contacts, and website content.

---

## 🧪 Development

Run frontend linting:

```bash
cd client
npm run lint
```

Create a production frontend build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run backend in development mode:

```bash
cd server
npm run dev
```

---

## 🛡️ Security

The project implements several security-related practices:

* JWT authentication
* Password hashing with bcryptjs
* Protected API routes
* Admin authorization middleware
* Environment variables for secrets
* CORS configuration
* OTP expiration
* Server-side authentication checks

---

## 📱 Responsive Design

NexAI is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The interface includes responsive navigation and mobile-friendly layouts.

---

## 🎯 Project Goals

NexAI was developed to demonstrate practical full-stack development skills, including:

* React component architecture
* REST API integration
* Authentication and authorization
* CRUD operations
* MongoDB data management
* Admin dashboard development
* API-based dynamic content
* Responsive UI development
* State and context management
* Error handling
* Frontend/backend separation
* Production-oriented project structure

---

## 🚀 Future Improvements

Possible future improvements include:

* AI-powered features
* Subscription/payment integration
* User profile management
* Advanced analytics
* Role and permission management
* Automated testing
* CI/CD pipeline
* Rate limiting
* API documentation
* Advanced dashboard analytics

---

## 👩‍💻 Author

**Saba Shahzadi**

Frontend-focused developer building modern, responsive, and production-oriented web applications with React and JavaScript.

### GitHub

[github.com/Saba-shahzadi2](https://github.com/Saba-shahzadi2)

### Project

[NexAI](https://github.com/Saba-shahzadi2/NexAI)

---

## 📄 License

This project is intended for portfolio and educational purposes.
