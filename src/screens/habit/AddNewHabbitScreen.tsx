import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";

import { Category } from "@/interface/category";
import { CategoryTypes } from "@/types/categoryTypes";
import { colors } from "@/themes/colors";
import { addHabit, updateHabit, removeHabit } from "@/redux/slices/habitsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";

const theme = colors.light;

const categories: Category[] = [
  { id: "health", label: "Health", icon: "pulse-outline" },
  { id: "fitness", label: "Fitness", icon: "barbell-outline" },
  { id: "productivity", label: "Productivity", icon: "calendar-outline" },
  { id: "mindfulness", label: "Mindfulness", icon: "time-outline" },
  { id: "learning", label: "Learning", icon: "school-outline" },
  { id: "finance", label: "Finance", icon: "cash-outline" },
  { id: "social", label: "Social", icon: "people-outline" },
  { id: "other", label: "Other", icon: "ellipsis-horizontal-outline" },
];

export default function AddNewHabitScreen() {
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditMode = !!id;

  const existingHabit = useAppSelector((state) =>
    state.habits.habits.find((h) => h.id === id),
  );

  const [habitName, setHabitName] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryTypes | null>(null);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Pre-fill form when editing
  useEffect(() => {
    if (existingHabit) {
      setHabitName(existingHabit.name);
      setSelectedCategory(existingHabit.category);
      // reminderTime is stored as a formatted string; parse back into a Date for the picker
      const [time12, meridian] = existingHabit.reminderTime.split(" ");
      const [hoursStr, minutesStr] = time12.split(":");
      let hours = parseInt(hoursStr, 10);
      if (meridian === "PM" && hours !== 12) hours += 12;
      if (meridian === "AM" && hours === 12) hours = 0;

      const parsedDate = new Date();
      parsedDate.setHours(hours, parseInt(minutesStr, 10), 0, 0);
      setTime(parsedDate);
    }
  }, [existingHabit]);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const onTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  const handleSave = () => {
    if (!habitName.trim()) return;

    if (isEditMode && id) {
      dispatch(
        updateHabit({
          id,
          name: habitName.trim(),
          category: selectedCategory,
          reminderTime: formattedTime,
        }),
      );
    } else {
      dispatch(
        addHabit({
          name: habitName.trim(),
          category: selectedCategory,
          reminderTime: formattedTime,
        }),
      );
    }

    router.back();
  };

  const handleDelete = () => {
    if (!id) return;
    dispatch(removeHabit(id));
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#657064" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {isEditMode ? "Edit habit" : "Add new habit"}
        </Text>

        <View style={{ width: 70 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Habit Name */}
        <Text style={styles.label}>Habit name</Text>

        <TextInput
          value={habitName}
          onChangeText={setHabitName}
          placeholder="e.g. Morning walk"
          placeholderTextColor="#B5AA97"
          style={styles.input}
        />

        {/* Category */}
        <Text style={styles.sectionTitle}>Category</Text>

        <View style={styles.grid}>
          {categories.map((item) => {
            const selected = selectedCategory === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryCard,
                  selected && styles.selectedCategoryCard,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(item.id)}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={selected ? "#FFF" : "#657064"}
                />

                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.selectedCategoryText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Reminder Time */}
        <Text style={styles.sectionTitle}>Reminder time</Text>

        <TouchableOpacity
          style={styles.timeInput}
          activeOpacity={0.8}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.timeText}>{formattedTime}</Text>

          <Ionicons name="time-outline" size={24} color="#1E1E1E" />
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={false}
            onChange={onTimeChange}
          />
        )}

        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.9}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            {isEditMode ? "Save changes" : "Save habit"}
          </Text>
        </TouchableOpacity>

        {isEditMode && (
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.9}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Delete habit</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  header: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD8CC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.text,
  },

  content: {
    padding: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 12,
  },

  input: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#DDD8CC",
    paddingHorizontal: 24,
    fontSize: 20,
    color: "#1E1E1E",
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 18,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  categoryCard: {
    width: "48%",
    height: 64,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#DDD8CC",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 16,
  },

  selectedCategoryCard: {
    backgroundColor: theme.primary,
    borderColor: "#34865A",
  },

  categoryText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: theme.textSecondary,
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  timeInput: {
    height: 56,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#DDD8CC",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  timeText: {
    fontSize: 22,
    color: theme.textSecondary,
    fontWeight: "500",
  },

  saveButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 56,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  deleteButton: {
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#C0533C",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  deleteButtonText: {
    color: "#C0533C",
    fontSize: 18,
    fontWeight: "500",
  },
});
