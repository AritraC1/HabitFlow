import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  habitName?: string;
  initiallyCompleted?: boolean;
  onComplete?: () => void;
  onClose?: () => void;
};

const ToggleHabitCompletionScreen = ({
  habitName = "Drink 2L Water",
  initiallyCompleted = false,
  onComplete,
  onClose,
}: Props) => {
  const [completedToday, setCompletedToday] = useState(initiallyCompleted);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleToggle = () => {
    if (completedToday) return;

    onComplete?.();

    setCompletedToday(true);
    setShowCongrats(true);

    setTimeout(() => {
      setShowCongrats(false);
      onClose?.();
    }, 3000);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.habitName}>{habitName}</Text>

        <Text style={styles.status}>
          {completedToday ? "Completed today" : "Not completed"}
        </Text>

        <Pressable
          onPress={handleToggle}
          disabled={completedToday}
          style={[
            styles.switchTrack,
            completedToday && styles.switchTrackActive,
          ]}
        >
          <View
            style={[
              styles.switchThumb,
              completedToday && styles.switchThumbActive,
            ]}
          >
            {completedToday && (
              <Ionicons
                name="checkmark"
                size={38}
                color="#4F8A6A"
              />
            )}
          </View>
        </Pressable>

        <Text style={styles.helperText}>
          {completedToday
            ? "Nice work. You're done for today."
            : "Slide your habit to completed."}
        </Text>
      </View>

      <Modal transparent visible={showCongrats} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.congratsCard}>
            <View style={styles.illustration}>
              <Ionicons
                name="trophy"
                size={72}
                color="#F59E0B"
              />
            </View>

            <Text style={styles.congratsTitle}>
              Congratulations 🎉
            </Text>

            <Text style={styles.congratsSubtitle}>
              You completed today's habit.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ToggleHabitCompletionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  habitName: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
    marginBottom: 20,
    letterSpacing: -0.8,
  },

  status: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 40,
  },

  switchTrack: {
    width: 240,
    height: 130,

    borderRadius: 65,

    backgroundColor: "#E7E3DA",

    padding: 8,

    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,

    elevation: 4,
  },

  switchTrackActive: {
    backgroundColor: "#4F8A6A",
  },

  switchThumb: {
    width: 114,
    height: 114,

    borderRadius: 57,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 2,
  },

  switchThumbActive: {
    transform: [{ translateX: 110 }],
  },

  helperText: {
    marginTop: 32,
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  congratsCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
  },

  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  congratsTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  congratsSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});