import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { completeHabit } from "@/redux/slices/habitsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";
import ToggleHabitCompletionScreen from "@/screens/habit/ToggleHabitCompletionScreen";

export default function ToggleHabitRoute() {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const habit = useAppSelector((state) =>
    state.habits.habits.find((h) => h.id === id),
  );

  if (!habit) return null;

  const today = new Date().toISOString().split("T")[0];
  const initiallyCompleted = habit.completedDates.includes(today);

  return (
    <ToggleHabitCompletionScreen
      habitName={habit.name}
      initiallyCompleted={initiallyCompleted}
      onComplete={() =>
        dispatch(completeHabit({ habitId: id, userId: userId! }))
      }
      onClose={() => router.back()}
    />
  );
}
