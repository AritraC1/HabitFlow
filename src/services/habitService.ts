import { supabase } from "@/config/supabase";
import { CategoryTypes } from "@/types/categoryTypes";

export const habitService = {
  async getHabits(userId: string) {
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  async createHabit(
    userId: string,
    name: string,
    category: CategoryTypes | null,
    reminderTime: string,
  ) {
    const { data, error } = await supabase
      .from("habits")
      .insert({ user_id: userId, name, category, reminder_time: reminderTime })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateHabit(
    id: string,
    name: string,
    category: CategoryTypes | null,
    reminderTime: string,
  ) {
    const { error } = await supabase
      .from("habits")
      .update({ name, category, reminder_time: reminderTime })
      .eq("id", id);

    if (error) throw error;
  },

  async deleteHabit(id: string) {
    const { error } = await supabase.from("habits").delete().eq("id", id);

    if (error) throw error;
  },

  async getLogs(userId: string) {
    const { data, error } = await supabase
      .from("habit_logs")
      .select("habit_id, completed_date")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  },

  async markComplete(habitId: string, userId: string, date: string) {
    const { error } = await supabase
      .from("habit_logs")
      .insert({ habit_id: habitId, user_id: userId, completed_date: date });

    if (error) throw error;
  },
};
