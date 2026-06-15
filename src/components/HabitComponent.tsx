import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/themes/colors";
import { HabitComponentProps } from "@/types/habitComponentProps";
import { router } from "expo-router";

const theme = colors.light;

const HabitComponent = ({
  id,
  name,
  totalDays = 30,
  completedDates = [],
  onEdit,
}: HabitComponentProps) => {
  const boxes = useMemo(() => {
    const today = new Date();

    return Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (totalDays - 1 - index));

      const key = date.toISOString().split("T")[0];

      return {
        date: key,
        completed: completedDates.includes(key),
      };
    });
  }, [completedDates, totalDays]);

  return (
    <Pressable
      onPress={() => router.push(`/toggle-habit/${id}`)}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>

        <Pressable onPress={onEdit} style={styles.editButton} hitSlop={10}>
          <Ionicons
            name="create-outline"
            size={18}
            color={theme.textSecondary}
          />
        </Pressable>
      </View>

      <View style={styles.grid}>
        {boxes.map((box) => (
          <View
            key={box.date}
            style={[
              styles.box,
              {
                backgroundColor: box.completed
                  ? "#4F8A6A"
                  : "rgba(0,0,0,0.08)",
              },
            ]}
          />
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.surface,
    borderRadius: 20,

    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 16,
  },

  title: {
    flex: 1,

    fontSize: 18,
    fontWeight: "600",

    color: theme.text,
    letterSpacing: -0.3,
  },

  editButton: {
    width: 34,
    height: 34,

    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.05)",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  box: {
    width: 18,
    height: 18,

    borderRadius: 4,
  },
});

export default HabitComponent;