# 🏋️ Gymify

> A gamified gym application that turns your workout into a game — earn points, level up, compete on leaderboards, and let AI recommend the best exercises for your body.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=flat&logo=capacitor&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## Overview

**Gymify** is a gamified gym application designed to keep users motivated through game mechanics — earning points, leveling up, and competing with others on a leaderboard. It serves both **gym-goers** and **trainers**, giving each role the tools they need to track progress and push performance.

Beyond gamification, Gymify uses a **machine learning model** that monitors the user's physical parameters and intelligently recommends the most suitable exercise for their current state. When users meet the system's recommended goals, they are rewarded with points — creating a feedback loop of progress and motivation.

---

## ✨ Features

### 🎮 Gamification
- **Points System** — Earn points by completing exercises and meeting goals
- **Leveling** — Accumulate points to level up and unlock new milestones
- **Leaderboard** — Compete with other gym members to climb the rankings and drive friendly competition

### ⚔️ Gaming Mode
- Users are prompted with a specific exercise to complete for a defined **set count or time duration**
- Completion of the challenge awards points and contributes to the user's level progression

### 🤖 ML-Powered Exercise Recommendations
- The system monitors the user's physical parameters (e.g. fitness metrics, performance data)
- A **machine learning model** analyzes these readings and predicts the most suitable exercise for each user
- Users are given a goal based on the recommendation — meeting it triggers a **reward** in the form of points

### 🏆 Leaderboard
- Real-time rankings among gym users
- Promotes healthy competition and consistent engagement

### 👤 Dual-Role Support
- **Users (Gym-Goers)** — Track workouts, earn rewards, view recommendations, and compete on the leaderboard
- **Trainers** — Monitor their members' activity, progress, and performance data

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | React 18 + TypeScript + Vite | Type-safe, fast modern UI |
| Styling | TailwindCSS | Utility-first responsive design |
| Backend & Database | Supabase | PostgreSQL, authentication, and real-time data |
| ML Model | Machine Learning layer | Exercise recommendation based on user parameters |
| Mobile | Capacitor | Wraps the web app as a native Android/iOS application |
| Deployment | Vercel | Web frontend hosting and CI/CD |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18+`
- **npm**, yarn, or pnpm
- A [Supabase](https://supabase.com) account and project
- **Android Studio** (only if building the Android app)

### Web App Setup

```bash
# 1. Clone the repository
git clone https://github.com/wjrelumba/gymify.git
cd gymify

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Supabase credentials (see below)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Android App Setup

```bash
# 1. Build the web app first
npm run build

# 2. Sync with Capacitor
npx cap sync android

# 3. Open in Android Studio
npx cap open android
```

> Refer to the [Capacitor documentation](https://capacitorjs.com/docs/android) for further Android build and deployment steps.

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

You can find these values in your Supabase project under **Settings → API**.

---

## 📁 Project Structure

```
gymify/
├── public/                     # Static assets
├── resources/                  # App icons and splash screens (Capacitor)
├── src/
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Route-level page components
│   │   ├── Dashboard.tsx       # User workout dashboard
│   │   ├── GamingMode.tsx      # Exercise challenge mode
│   │   ├── Leaderboard.tsx     # Global rankings
│   │   ├── Recommendations.tsx # ML-powered exercise suggestions
│   │   └── Trainer.tsx         # Trainer view and member management
│   ├── lib/
│   │   └── supabaseClient.ts   # Supabase client initialization
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Helper functions
│   └── main.tsx                # App entry point
├── capacitor.config.ts         # Capacitor configuration
├── .env.example                # Environment variable template
├── vercel.json                 # Vercel deployment configuration
├── tailwind.config.js
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts
└── package.json
```

---

## 👤 User Roles

| Role | Access |
|---|---|
| **User (Gym-Goer)** | Track workouts, earn points and levels, play Gaming Mode, receive ML exercise recommendations, view leaderboard |
| **Trainer** | Monitor members' workout activity, progress, and performance parameters |

---

## 🚢 Deployment

### Web (Vercel)

Gymify is deployed on **Vercel** with automatic deployments on every push to `main`.

1. Connect the repo to [Vercel](https://vercel.com)
2. Add environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) under **Project Settings → Environment Variables**
3. Vercel builds with `npm run build` and serves from `dist/`

### Android (APK)

1. Run `npm run build && npx cap sync android`
2. Open in Android Studio: `npx cap open android`
3. Build a signed APK or AAB for distribution

---

## 📄 License

This project is currently unlicensed. Contact the repository owner for usage permissions.
