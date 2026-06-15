import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Habit } from "@/interface/habit";
import { CategoryTypes } from "@/types/categoryTypes";

interface HabitsState {
  habits: Habit[];
}

const initialState: HabitsState = {
  habits: [],
};

export interface AddHabitPayload {
  name: string;
  category: CategoryTypes | null;
  reminderTime: string;
}

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // Add new habit
    addHabit: (state, action: PayloadAction<AddHabitPayload>) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        category: action.payload.category,
        reminderTime: action.payload.reminderTime,
        completedDates: [],
        streak: 0,
      };
      state.habits.push(newHabit);
    },

    // remove a habit
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },

    // Mark completed
    markCompletedToday: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (!habit) return;

      const today = new Date().toISOString().split("T")[0];
      if (habit.completedDates.includes(today)) return;

      habit.completedDates.push(today);
      habit.streak += 1;
    },

    // Update a habit
    updateHabit: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        category: CategoryTypes | null;
        reminderTime: string;
      }>,
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (!habit) return;
      habit.name = action.payload.name;
      habit.category = action.payload.category;
      habit.reminderTime = action.payload.reminderTime;
    },
  },
});

export const { addHabit, removeHabit, markCompletedToday, updateHabit } =
  habitsSlice.actions;

export default habitsSlice.reducer;
