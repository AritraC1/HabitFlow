import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/themes/colors";
import { router } from "expo-router";

const theme = colors.light;

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Habit Flow</Text>

        <Text style={styles.subtitle}>
          Small steps, every day. Create your account to start tracking.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#B1A898"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#B1A898"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#B1A898"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/SignIn")}>
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

// Sign up page stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 28,
  },

  title: {
    fontSize: 52,
    fontWeight: "700",
    color: theme.primary,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 30,
    color: "#5F6D65",
    marginBottom: 40,
    maxWidth: 320,
  },

  form: {
    gap: 16,
  },

  inputGroup: {
    gap: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5F6D65",
  },

  input: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#D8D1C3",
    paddingHorizontal: 24,
    fontSize: 18,
    color: theme.text,
  },

  button: {
    height: 56,
    backgroundColor: theme.primary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,

    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },

  footerText: {
    fontSize: 16,
    color: "#5F6D65",
  },

  signInText: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.primary,
  },
});
