import { StyleSheet } from "react-native";

import { colors } from "@/themes/colors";

const theme = colors.light;

export const STYLES = StyleSheet.create({
  // COMMON
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
});
