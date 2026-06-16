import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

import { colors } from "@/themes/colors";
import { useAppSelector } from "@/hooks/use-redux-hooks";

const theme = colors.light;

const InsightScreen = () => {
  const habits = useAppSelector((state) => state.habits.habits);
  const isEmpty = habits.length === 0;
  const pathname = usePathname();

  const isHomeActive = pathname === "/Home" || pathname === "/";
  const isInsightsActive = pathname === "/Insights";

  const today = new Date().toISOString().split("T")[0];

  const totalCompletions = habits.reduce(
    (sum, h) => sum + h.completedDates.length,
    0,
  );

  const habitsDoneToday = habits.filter((h) =>
    h.completedDates.includes(today),
  ).length;

  const longestStreakHabit = habits.reduce(
    (best, h) => (h.streak > (best?.streak ?? 0) ? h : best),
    habits[0] ?? null,
  );

  // Last 7 days labels + completion counts
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    const label = d.toLocaleDateString("en-US", { weekday: "short" });
    const count = habits.filter((h) => h.completedDates.includes(key)).length;
    return { label, count, key };
  });

  const maxCount = Math.max(...last7.map((d) => d.count), 1);

  // This week completion rate
  const thisWeekDates = last7.map((d) => d.key);
  const thisWeekTotal = habits.length * 7;
  const thisWeekDone = habits.reduce(
    (sum, h) =>
      sum + h.completedDates.filter((d) => thisWeekDates.includes(d)).length,
    0,
  );
  const weekRate =
    thisWeekTotal > 0 ? Math.round((thisWeekDone / thisWeekTotal) * 100) : 0;

  // Per-habit completion rate (last 30 days)
  const habitRates = habits.map((h) => {
    const rate = Math.round((h.completedDates.length / 30) * 100);
    return { id: h.id, name: h.name, rate: Math.min(rate, 100) };
  });

  // ── Bar color helper ─────────────────────────────────────

  const barColor = (rate: number) => {
    if (rate >= 80) return "#2E7D5A";
    if (rate >= 50) return "#E0A458";
    return "#C0533C";
  };

  // ── Render ───────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>HabitFlow</Text>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/UserProfile")}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/103" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* BODY */}
      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <View style={styles.illustration}>
            <Text style={styles.emoji}>📊</Text>
          </View>
          <Text style={styles.emptyTitle}>No insights yet</Text>
          <Text style={styles.emptySubtitle}>
            Add habits and start tracking to see your progress here.
          </Text>
          <Text style={styles.emptySubtitle2}>
            Tap the + button below to add your first habit.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── This week ── */}
          <Text style={styles.sectionLabel}>This week</Text>

          <View style={styles.metricRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Completion rate</Text>
              <Text style={styles.metricValue}>
                <Text style={styles.metricGreen}>{weekRate}%</Text>
              </Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Habits done today</Text>
              <View style={styles.metricValueRow}>
                <Text style={styles.metricValue}>{habitsDoneToday}</Text>
                <Text style={styles.metricMuted}> / {habits.length}</Text>
              </View>
              <Text style={styles.metricSub}>
                {habits.length - habitsDoneToday} remaining
              </Text>
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Longest streak</Text>
              <Text style={[styles.metricValue, styles.metricGreen]}>
                {longestStreakHabit?.streak ?? 0}
              </Text>
              <Text style={styles.metricSub}>
                {longestStreakHabit?.name ?? "—"}
              </Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total completions</Text>
              <Text style={styles.metricValue}>{totalCompletions}</Text>
              <Text style={styles.metricSub}>All time</Text>
            </View>
          </View>

          {/* ── Bar chart ── */}
          <Text style={styles.sectionLabel}>This week at a glance</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Daily completions — last 7 days
            </Text>

            <View style={styles.barChart}>
              {last7.map((day) => (
                <View key={day.key} style={styles.barCol}>
                  <Text style={styles.barCount}>
                    {day.count > 0 ? day.count : ""}
                  </Text>

                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${Math.round(
                            (day.count / maxCount) * 100,
                          )}%`,
                          backgroundColor:
                            day.key === today ? "#1E5A41" : "#2E7D5A",
                          minHeight: day.count > 0 ? 4 : 0,
                        },
                      ]}
                    />
                  </View>

                  <Text
                    style={[
                      styles.barLabel,
                      day.key === today && styles.barLabelToday,
                    ]}
                  >
                    {day.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Per-habit completion ── */}
          <Text style={styles.sectionLabel}>Per habit — last 30 days</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Completion rate</Text>

            {habitRates.map((h) => (
              <View key={h.id} style={styles.habitRow}>
                <View style={styles.habitRowHead}>
                  <Text style={styles.habitRowName} numberOfLines={1}>
                    {h.name}
                  </Text>
                  <Text
                    style={[styles.habitRowPct, { color: barColor(h.rate) }]}
                  >
                    {h.rate}%
                  </Text>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${h.rate}%`,
                        backgroundColor: barColor(h.rate),
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* ── Streaks ── */}
          <Text style={styles.sectionLabel}>Current streaks</Text>

          <View style={styles.card}>
            {habits.map((h) => (
              <View key={h.id} style={styles.streakItem}>
                <Text style={styles.streakName}>{h.name}</Text>
                <View style={styles.streakRight}>
                  <View
                    style={[
                      styles.streakDot,
                      {
                        backgroundColor:
                          h.streak >= 7
                            ? "#2E7D5A"
                            : h.streak >= 3
                              ? "#E0A458"
                              : "#C0533C",
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.streakVal,
                      {
                        color:
                          h.streak >= 7
                            ? "#2E7D5A"
                            : h.streak >= 3
                              ? "#E0A458"
                              : "#C0533C",
                      },
                    ]}
                  >
                    {h.streak} days
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItemBox, isHomeActive && styles.activeNavItem]}
          onPress={() => router.push("/Home")}
        >
          <Ionicons
            name="home"
            size={18}
            color={isHomeActive ? "#2E7D5A" : "#6B746D"}
          />
          <Text style={isHomeActive ? styles.activeNavText : styles.navText}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItemBox, isInsightsActive && styles.activeNavItem]}
          onPress={() => router.push("/Insights")}
        >
          <Ionicons
            name="bar-chart"
            size={18}
            color={isInsightsActive ? "#2E7D5A" : "#6B746D"}
          />
          <Text
            style={isInsightsActive ? styles.activeNavText : styles.navText}
          >
            Insights
          </Text>
        </TouchableOpacity>

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

export default InsightScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  /* Scroll */
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },

  /* Section label */
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#7A8A80",
    marginBottom: 12,
    marginLeft: 2,
    marginTop: 4,
  },

  /* Metric cards */
  metricRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E4DECF",
  },
  metricLabel: {
    fontSize: 11,
    color: "#7A8A80",
    fontWeight: "600",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2A24",
    lineHeight: 30,
  },
  metricGreen: {
    color: "#2E7D5A",
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  metricMuted: {
    fontSize: 14,
    color: "#7A8A80",
    fontWeight: "500",
  },
  metricSub: {
    fontSize: 11,
    color: "#7A8A80",
    marginTop: 4,
  },

  /* Generic card */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E4DECF",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2A24",
    marginBottom: 16,
  },

  /* Bar chart */
  barChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 140,
    gap: 6,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barCount: {
    fontSize: 10,
    color: "#7A8A80",
    fontWeight: "600",
    marginBottom: 3,
    height: 14,
  },
  barTrack: {
    flex: 1,
    width: "100%",
    backgroundColor: "#EDE8DD",
    borderRadius: 6,
    justifyContent: "flex-end",
    overflow: "hidden",
    maxHeight: 100,
  },
  barFill: {
    width: "100%",
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 10,
    color: "#7A8A80",
    fontWeight: "600",
    marginTop: 6,
  },
  barLabelToday: {
    color: "#2E7D5A",
    fontWeight: "700",
  },

  /* Per-habit progress */
  habitRow: {
    marginBottom: 14,
  },
  habitRowHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  habitRowName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2A24",
    flex: 1,
    marginRight: 8,
  },
  habitRowPct: {
    fontSize: 12,
    fontWeight: "700",
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#EDE8DD",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  /* Streaks */
  streakItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#F5F2EC",
    borderRadius: 14,
    marginBottom: 8,
  },
  streakName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2A24",
  },
  streakRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  streakVal: {
    fontSize: 13,
    fontWeight: "700",
  },

  /* Empty state */
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
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
    shadowOffset: { width: 0, height: 6 },
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
  navItemBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  activeNavItem: {
    backgroundColor: "#EAF5EF",
  },
  activeNavText: {
    color: "#2E7D5A",
    fontWeight: "600",
    fontSize: 12,
  },
  navText: {
    color: "#6B746D",
    fontWeight: "600",
    fontSize: 12,
  },
  navCenter: {
    position: "absolute",
    left: "57%",
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
