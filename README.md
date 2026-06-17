# HabitFlow

A cross-platform mobile habit tracking app built with **React Native (Expo)** and **TypeScript**. Track daily habits, build streaks, and stay consistent with a GitHub-style activity grid for each habit.

## Features

- Email/password authentication using Supabase
- Habit create/edit/delete UI flows
- Daily completion tracking with a GitHub-style activity grid
- Streak calculation from completion history
- Fixed habit categories (Health, Fitness, Productivity, Mindfulness, Learning, Finance, Social, Other)
- Empty-state UI for no habits
- Redux Toolkit state management for auth, habits, and theme
- Supabase service layer for habits and habit logs

## Tech Stack

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | React Native + Expo (Expo Router) |
| Language         | TypeScript                        |
| State Management | Redux Toolkit                     |
| Backend          | Supabase (Auth + PostgreSQL)      |
| Persistence      | AsyncStorage                      |
| Icons            | @expo/vector-icons                |

## Demo
![Demo](assets/demo/Demo.gif)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app (iOS/Android) for testing on a physical device

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

### Running the App

```bash
npx expo start
```

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go to run on a physical device

## Screens

1. **Sign Up** — Name, email, password
2. **Sign In** — Email, password
3. **Home** — List of habits with streaks and activity grids
4. **Empty State** — Shown when the user has no habits
5. **Add Habit** — Name, category, reminder time
6. **Edit Habit** — Edit fields and delete habit
7. **Toggle Habit** — Complete a habit for today
8. **Profile / Settings** — Theme and notification controls, logout

---
