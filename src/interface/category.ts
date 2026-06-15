import { Ionicons } from "@expo/vector-icons";

import { CategoryTypes } from "@/types/categoryTypes";

export interface Category {
  id: CategoryTypes;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}
