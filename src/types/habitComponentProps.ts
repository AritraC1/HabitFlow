export type HabitComponentProps = {
  id: string;
  name: string;
  totalDays?: number;
  completedDates?: string[];
  streak?: number;
  onEdit?: () => void;
};
