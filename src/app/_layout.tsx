import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Provider store={store}>
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