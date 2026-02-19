
# 🌙 Ramadan BD - Setup & Deployment Guide

This is a production-ready Islamic web application built with Next.js, Firebase, and Gemini AI.

## 🚀 Quick Start

### 1. Firebase Configuration
To make the tracker and bookmarks work, you need to set up Firebase:
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore** and **Authentication** (Google & Email).
3. Create a `.env.local` file in your root directory and add:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   API_KEY=your_gemini_api_key
   ```

### 2. Deployment on Vercel
1. Push this code to a **GitHub** repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Add the environment variables mentioned above in the Vercel Dashboard.
4. Click **Deploy**.

## 🛠 Features Included
- **Quran Reader:** Arabic (Uthmani) + Bengali translation.
- **Khatam Tracker:** 30 Juz interactive grid.
- **Prayer Times:** Precise timings for all Bangladesh districts.
- **Zakat Calculator:** BDT-based asset calculation.
- **Admin Panel:** Hidden dashboard at `/#/admin`.

## 🔒 Security
- Use Firebase Security Rules to protect user data.
- The Admin panel is hidden from the main menu for security.

## 📱 Mobile Responsive
The UI is fully optimized for mobile devices with a clean Islamic theme.
