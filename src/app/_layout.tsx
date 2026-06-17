import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "@/redux/store";
import { Stack, router } from "expo-router";
import { setSession, clearSession } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "@/config/supabase";

function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setSession(session));
        router.replace("/(tabs)/Home");
      } else {
        dispatch(clearSession());
        router.replace("/SignIn");
      }
    });

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E7D5A" />
      </View>
    );
  }

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
