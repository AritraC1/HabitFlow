import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Bell, Lock, Info, Sun, ChevronRight } from "lucide-react-native";
import { colors } from "@/themes/colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const theme = colors.light;

export default function UserProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER — outside scroll, full-width border */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#657064" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* User */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <Text style={styles.name}>Asha Mehta</Text>
          <Text style={styles.email}>asha.mehta@email.com</Text>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Sun size={18} color={theme.textSecondary} />
              </View>

              <Text style={styles.rowText}>Dark Mode</Text>
            </View>

            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{
                false: "#D8D8D8",
                true: theme.textSecondary,
              }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Bell size={18} color={theme.textSecondary} />
              </View>

              <Text style={styles.rowText}>Notifications</Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: "#D8D8D8",
                true: theme.textSecondary,
              }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Lock size={18} color={theme.textSecondary} />
              </View>

              <Text style={styles.rowText}>Privacy & Security</Text>
            </View>

            <ChevronRight size={18} color="#A0A0A0" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Info size={18} color={theme.textSecondary} />
              </View>

              <Text style={styles.rowText}>Help & Support</Text>
            </View>

            <ChevronRight size={18} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Version</Text>

            <Text style={styles.version}>1.0.0</Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 56,
  },

  header: {
    height: 88,
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

  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#DCEEE5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "700",
    color: theme.textSecondary,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.text,
  },

  email: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },

  card: {
    backgroundColor: theme.surface,
    borderRadius: 18,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  row: {
    height: 64,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  rowText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.textSecondary,
    marginLeft: 66,
  },

  version: {
    fontSize: 15,
    color: theme.textSecondary,
  },

  logout: {
    textAlign: "center",
    color: theme.error,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
});
