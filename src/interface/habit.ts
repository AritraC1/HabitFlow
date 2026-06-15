import { CategoryTypes } from "@/types/categoryTypes";

export interface Habit {
  id: string;
  name: string;
  category: CategoryTypes | null;
  reminderTime: string; // formatted display string e.g. "07:00 AM"
  completedDates: string[]; // ISO date strings "YYYY-MM-DD"
  streak: number;
}