# 🎓 eTuitionBd - Tuition Management System

A comprehensive full-stack platform connecting students with qualified tutors, streamlining the entire tuition management process from job posting to payment processing.

## 🌐 Live Demo

**Live:** [https://etuitiontrack.netlify.app](https://etuitiontrack.netlify.app/)  

## 👤 Admin Credentials

**Email:**  ashadulislam@gmail.com 
**Password:** Asd051374


### Server GitHub Repository
https://github.com/ashadulislam6156rs/eTuitionTrack-Server.git


## 📋 Project Overview

eTuitionBd is a modern tuition management platform designed to solve the real-world problem of connecting students with qualified tutors. The platform provides automated workflows, transparent payment processing, and structured communication between all parties involved.

### 🎯 Purpose

- **For Students:** Easily post tuition requirements and find qualified tutors
- **For Tutors:** Discover tuition opportunities and manage ongoing classes
- **For Admins:** Monitor platform activities, verify users, and ensure quality

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure user registration and login with Firebase Authentication
- Role-based access control (Student, Tutor, Admin)
- Google social login integration
- JWT token-based session management
- Protected routes with automatic redirection

### 👨‍🎓 Student Features
- **Post Tuition:** Create detailed tuition requests with subject, class, budget, location, and schedule
- **Manage Posts:** Update or delete tuition listings
- **Review Applications:** View tutor applications with qualifications and experience
- **Approve Tutors:** Accept tutor applications with integrated payment processing
- **Payment History:** Track all transactions and payments made
- **Profile Management:** Update personal information and preferences

### 👨‍🏫 Tutor Features
- **Browse Tuitions:** Explore available tuition opportunities
- **Apply for Jobs:** Submit applications with qualifications and expected salary
- **Track Applications:** Monitor application status in real-time
- **Ongoing Tuitions:** View all approved and active tuition classes
- **Revenue Dashboard:** Track earnings and transaction history

### 👑 Admin Features
- **User Management:** View, update, delete users, and modify roles
- **Tuition Moderation:** Review, approve, or reject tuition posts
- **Platform Analytics:** Monitor total earnings and transaction reports
- **Quality Control:** Ensure only legitimate tuition posts are published

### 🚀 Additional Features
- **Search & Filter:** Find tuitions by subject, location, class, and budget
- **Sorting Options:** Sort listings by date, budget, or relevance
- **Pagination:** Smooth browsing experience with paginated results
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop
- **Real-time Updates:** Dynamic content loading and status updates
- **Smooth Animations:** Enhanced UX with Framer Motion animations

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **DaisyUI** - Component library
- **Framer Motion** - Animations
- **Firebase** - Authentication
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **Stripe** - Payment processing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Token authentication
- **Bcrypt** - Password hashing
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 📦 NPM Packages

### Client-side Dependencies
```json
"dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "aos": "^2.3.4",
    "axios": "^1.13.2",
    "chart.js": "^4.5.1",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.26",
    "lottie-react": "^2.4.1",
    "motion": "^12.23.26",
    "react": "^19.2.0",
    "react-chartjs-2": "^5.3.1",
    "react-confetti": "^6.4.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.10.1",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5",
    "recharts": "^3.5.1",
    "sweetalert2": "^11.26.4",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17",
    "typewriter-effect": "^2.22.0"
  },
```

### Server-side Dependencies
```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "firebase-admin": "^13.6.0",
    "mongodb": "^7.0.0",
    "stripe": "^20.0.0"
  }
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase project
- Stripe account

### Installation

#### Clone the repositories
```bash
# Client
git clone https://github.com/yourusername/etuitionbd-client.git
cd etuitionbd-client
npm install

# Server
git clone https://github.com/yourusername/etuitionbd-server.git
cd etuitionbd-server
npm install
```

#### Run the application

```bash
# Client (port 5173)
npm run dev

# Server (port 5000)
npm start
```


## 📱 Features Walkthrough

### For Students
1. Register as a student
2. Post a tuition requirement with details
3. Wait for tutor applications
4. Review tutor profiles and qualifications
5. Approve a tutor by making payment
6. Track payment history

### For Tutors
1. Register as a tutor
2. Browse available tuition posts
3. Apply to suitable tuitions with qualifications
4. Track application status
5. View approved tuitions
6. Monitor earnings

### For Admins
1. Review and moderate tuition posts
2. Manage user accounts and roles
3. View platform analytics
4. Ensure platform quality and trust

## 🔒 Security Features

- Environment variables for sensitive data
- JWT token verification with role-based access
- Secure password hashing with bcrypt
- Protected API routes
- Firebase authentication integration
- CORS configuration for API security

## 📊 Project Statistics

- ✅ 20+ meaningful commits (client)
- ✅ 12+ meaningful commits (server)
- ✅ Fully responsive design
- ✅ No CORS/404/504 errors
- ✅ Smooth user experience
- ✅ Professional UI/UX

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Ashadul islam**  
[GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourusername) | [Portfolio](https://yourportfolio.com)

## 📞 Support

For support, email ashadulislam6156rs@gmail.com

---

⭐ If you find this project helpful, please give it a star!