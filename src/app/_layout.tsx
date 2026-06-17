import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Stack, router } from "expo-router";

import { supabase } from "@/config/supabase";
import { store, AppDispatch } from "@/redux/store";
import { setSession, clearSession } from "@/redux/slices/authSlice";

function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Get session on app start
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setSession(session));
        router.replace("/(tabs)/Home");
      } else {
        dispatch(clearSession());
        router.replace("/SignIn");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setSession(session));
      } else {
        dispatch(clearSession());
        router.replace("/SignIn");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthListener />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="SignIn" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="AddNew" />
        <Stack.Screen name="UserProfile" />
        <Stack.Screen name="toggle-habit/[id]" />
      </Stack>
    </Provider>
  );
}
