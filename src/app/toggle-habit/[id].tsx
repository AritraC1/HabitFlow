import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { markCompletedToday } from "@/redux/slices/habitsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";
import ToggleHabitCompletionScreen from "@/screens/habit/ToggleHabitCompletionScreen";

export default function ToggleHabitRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const habit = useAppSelector((state) =>
    state.habits.habits.find((h) => h.id === id),
  );

  if (!habit) return null;

  return (
    <ToggleHabitCompletionScreen
      habitName={habit.name}
      onComplete={() => dispatch(markCompletedToday(id))}
      onClose={() => router.back()}
    />
  );
}
