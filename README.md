# 🎓 eTuitionTrack - Tuition Management System

eTuitionTrack is a modern digital platform that connects students, tutors, and administrators within a complete ecosystem. The primary goal of this platform is to make the tuition process simple, efficient, secure, and transparent. Students can easily find qualified and experienced tutors here and book sessions according to their needs. On the other hand, tutors are able to select the right students, showcase their expertise, and enhance their professional growth while increasing their earnings. The entire system is managed by the administrator, who ensures user safety, data protection, and overall transparency. As a result, eTuitionTrack stands as a reliable and effective solution for students, tutors, and administrators alike. In short, it is not just a medium for finding tutors, but a smart digital ecosystem that modernizes the learning experience and makes it beneficial for everyone.

## 🌐 Live Demo

**Live:** [https://etuitiontrack.netlify.app](https://etuitiontrack.netlify.app/)  

## 👤 Admin Credentials

**Email:**  ashadulislam@gmail.com 
**Password:** Asd051374


### Server GitHub Repository
https://github.com/ashadulislam6156rs/eTuitionTrack-Server.git


### 🎯 Purpose

**eTuitionTrack** is designed to revolutionize the private tuition ecosystem by creating a trusted, efficient, and transparent platform that serves three distinct user groups:

- **For Students:** 
  - Simplify the process of finding qualified, verified tutors who match their specific academic needs
  - Post detailed tuition requirements with preferences for subject, budget, schedule, and location
  - Access tutor profiles with ratings, reviews, and credentials to make informed decisions
  - Manage all tuition activities—from applications to payments—in one centralized platform
  - Eliminate the uncertainty and risk of hiring unverified tutors

- **For Tutors:** 
  - Discover genuine tuition opportunities from real students actively seeking help
  - Showcase qualifications, experience, and specializations through comprehensive profiles
  - Apply to suitable tuitions efficiently without wasting time on fake leads
  - Build a professional reputation through student reviews and ratings
  - Manage multiple tuitions, track earnings, and organize schedules seamlessly
  - Gain access to a steady stream of verified opportunities for income growth

- **For Admins:** 
  - Maintain complete oversight of all platform activities to ensure quality and safety
  - Verify tutor credentials and approve legitimate tuition posts to prevent fraud
  - Monitor user interactions and resolve disputes fairly with full context
  - Analyze platform performance through analytics and reporting tools
  - Ensure data security, user privacy, and compliance with platform policies
  - Foster a trusted community where both students and tutors can thrive

**The Ultimate Goal:** To transform scattered, risky, and time-consuming tuition searches into a streamlined, secure, and mutually beneficial experience for everyone involved in the private education ecosystem.

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


## 📸 Website Screenshots

### 🏠 Home Page
![Homepage Screenshot](public/eTutionTrack-Home.png)

### 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React.js |
| **Routing** | React Router |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion, AOS, Lottie React, Motion |
| **Authentication** | Firebase |
| **HTTP Client** | Axios |
| **State Management** | React Query (@tanstack/react-query) |
| **Form Handling** | React Hook Form |
| **Notifications** | React Toastify, SweetAlert2 |
| **Data Visualization** | Recharts |
| **UI Components** | Swiper, React Confetti, React Spinners, React Icons |
| **Effects** | Typewriter Effect |
| **Backend Framework** | Node.js, Express.js |
| **Database** | MongoDB |
| **Server Authentication** | Firebase Admin |
| **Payment Processing** | Stripe |
| **Middleware** | Cors |
| **Environment Config** | Dotenv |
| **Build Tool** | Vite |
| **Code Quality** | ESLint |
| **Version Control** | Git |

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

---
### 🖥️ How to Run Locally:
1. Clone the Repository

Create file eTutionTrack
```
cd eTutionTrack
```
```
git clone https://github.com/ashadulislam6156rs/eTuitionTrack-Client.git

```
2. Install Dependencies
```
npm i
```
3. Start Development Server
```
npm run dev
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

## 📞 Support

For support, email ashadulislam6156rs@gmail.com

---

⭐ If you find this project helpful, please give it a star!