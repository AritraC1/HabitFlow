import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Habit } from "@/interface/habit";
import { CategoryTypes } from "@/types/categoryTypes";
import { calculateStreak } from "@/utils/streakUtils";
import { habitService } from "@/services/habitService";

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

export const completeHabit = createAsyncThunk(
  "habits/completeHabit",
  async (
    { habitId, userId }: { habitId: string; userId: string },
    { dispatch },
  ) => {
    const today = new Date().toISOString().split("T")[0];
    await habitService.markComplete(habitId, userId, today);
    dispatch(markCompletedToday(habitId));
  },
);

export const fetchHabitsWithLogs = createAsyncThunk(
  "habits/fetchWithLogs",
  async (userId: string) => {
    const [habits, logs] = await Promise.all([
      habitService.getHabits(userId),
      habitService.getLogs(userId),
    ]);

    return habits.map((habit: any) => ({
      id: habit.id,
      name: habit.name,
      category: habit.category,
      reminderTime: habit.reminder_time,
      completedDates: logs
        .filter((l: any) => l.habit_id === habit.id)
        .map((l: any) => l.completed_date),
      streak: calculateStreak(
        logs
          .filter((l: any) => l.habit_id === habit.id)
          .map((l: any) => l.completed_date),
      ),
    }));
  },
);

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
      habit.streak = calculateStreak(habit.completedDates);
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
  extraReducers: (builder) => {
    builder.addCase(fetchHabitsWithLogs.fulfilled, (state, action) => {
      state.habits = action.payload;
    });
  },
});

export const { addHabit, removeHabit, markCompletedToday, updateHabit } =
  habitsSlice.actions;

export default habitsSlice.reducer;
