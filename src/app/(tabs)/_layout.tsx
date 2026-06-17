import { Tabs } from "expo-router";
import { useEffect } from "react";
import { fetchHabitsWithLogs } from "@/redux/slices/habitsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";

export default function TabsLayout() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (!userId) return;

    dispatch(fetchHabitsWithLogs(userId))
      .unwrap()
      .catch((error) => console.error("Failed to load habits:", error));
  }, [userId]);

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Insights" />
    </Tabs>
  );
}
