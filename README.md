# HabitFlow

A cross-platform mobile habit tracking app built with **React Native (Expo)** and **TypeScript**. Track daily habits, build streaks, and stay consistent with a GitHub-style activity grid for each habit.

## Features

- Email/password authentication (sign up, sign in, sign out)
- Create, edit, and delete habits (CRUD)
- Daily habit completion tracking with streaks
- GitHub-style activity grid per habit
- Fixed habit categories (Health, Fitness, Productivity, Mindfulness, Learning, Finance, Social, Other)
- Local and push notifications for habit reminders
- Light mode and dark mode
- Analytics via per-habit activity grids

## Tech Stack

| Layer                | Technology                                |
|----------------------|-------------------------------------------|
| Framework            | React Native + Expo (Expo Router)         |
| Language             | TypeScript                                |
| State Management     | Redux Toolkit                             |
| Navigation           | Expo Router / React Navigation            |
| Forms & Validation   | React Hook Form                           |
| HTTP Client          | Axios                                     |
| Local Persistence    | AsyncStorage / Expo Secure Store          |
| Backend              | Supabase (Auth + PostgreSQL)              |
| Notifications        | Expo Notifications                        |
| Icons                | @expo/vector-icons                        |
| Charts / Grids       | react-native-svg                          |

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
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running the App

```bash
npx expo start
```

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go to run on a physical device

## Project Structure

See [Project Structure](#current-project-structure-post-setup) below for a breakdown of folders and files created by the initial Expo setup, and the planned structure as the app grows.

## Screens

1. **Sign Up** — Name, email, password
2. **Sign In** — Email, password
3. **Home** — List of habits, each with name, streak count, edit icon, and activity grid
4. **Empty State** — Shown when the user has no habits yet
5. **Add Habit** — Name, category, reminder time
6. **Edit Habit** — Pre-filled form + stats (current streak, best streak, completion %) + delete
7. **Today / Reminder** — Full-screen habit name with swipe-to-complete
8. **Profile / Settings** — Theme toggle, notification preferences, logout

## Roadmap

- [ ] Supabase schema setup (users, habits, habit_logs)
- [ ] Auth flow wired to Supabase
- [ ] Redux slices for habits, auth, settings
- [ ] Activity grid component with real completion data
- [ ] Streak calculation logic
- [ ] Notification scheduling (local + push)
- [ ] Light/dark theme system
- [ ] Edit/delete habit flow
- [ ] Empty state logic
- [ ] Testing & performance polish

---