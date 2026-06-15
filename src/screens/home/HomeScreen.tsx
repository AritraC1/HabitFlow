import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { colors } from "@/themes/colors";

const theme = colors.light;

const HomeScreen = () => {
  const habits: any[] = [];

  const isEmpty = habits.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>HabitFlow</Text>
      </View>

      {/* BODY */}
      <View style={styles.content}>
        {isEmpty ? (
          <View style={styles.emptyContainer}>
            <View style={styles.illustration}>
              <Text style={styles.emoji}>🌱</Text>
            </View>

            <Text style={styles.emptyTitle}>No habits yet</Text>

            <Text style={styles.emptySubtitle}>
              Start building small daily routines that stick.
            </Text>

            <Text style={styles.emptySubtitle2}>
              Tap the + button below to add your first habit.
            </Text>
          </View>
        ) : (
          <View>
            <Text>Habit list goes here</Text>
          </View>
        )}
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {/* Left */}
        <TouchableOpacity style={styles.activeNavItem}>
          <Ionicons name="home" size={18} color="#2E7D5A" />
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        {/* Right */}
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/100",
            }}
            style={styles.avatar}
          />
          <Text style={styles.navText}>Me</Text>
        </TouchableOpacity>

        {/* Center FAB */}
        <TouchableOpacity
          style={styles.navCenter}
          onPress={() => router.push("/AddNew")}
        >
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  /* Header */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 24,
    paddingTop: 8,
    marginBottom: 12,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D5A",
  },

  /* Empty State */

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },

  illustration: {
    width: 180,
    height: 180,
    borderRadius: 90,

    backgroundColor: "#EEF7F1",
    borderWidth: 10,
    borderColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 2,
  },

  emoji: {
    fontSize: 72,
  },

  emptyTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2A24",
    marginBottom: 10,
  },

  emptySubtitle: {
    fontSize: 15,
    color: "#5F6D65",
    textAlign: "center",
  },

  emptySubtitle2: {
    fontSize: 14,
    color: "#8A948E",
    textAlign: "center",
    marginTop: 8,
  },

  /* Bottom Nav */

  bottomNav: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 56,

    height: 58,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,

    backgroundColor: "#FFFFFF",
    borderRadius: 29,

    borderWidth: 1,
    borderColor: "#EEF2EE",

    overflow: "visible",
  },

  activeNavItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,

    backgroundColor: "#EAF5EF",

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 18,
  },

  activeNavText: {
    color: "#2E7D5A",
    fontWeight: "600",
    fontSize: 12,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    fontSize: 11,
    color: "#6B746D",
    marginTop: 2,
  },

  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  /* FAB */

  navCenter: {
    position: "absolute",

    left: "60%",
    marginLeft: -26,

    top: -20,

    width: 52,
    height: 52,
    borderRadius: 26,

    backgroundColor: "#2E7D5A",

    justifyContent: "center",
    alignItems: "center",
  },
});
