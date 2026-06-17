import { useAppSelector } from "@/hooks/use-redux-hooks";
import { colors } from "@/themes/colors";

export const useTheme = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? colors.dark : colors.light;
  return { theme, isDark };
};
