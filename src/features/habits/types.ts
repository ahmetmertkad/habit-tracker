export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  days: number[];          // 0 = Pazar, 1 = Pazartesi ... 6 = Cumartesi
  reminderTime?: string;   // "09:00", opsiyonel
  createdAt: string;       // "2026-10-20"
};

export type MockHabit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  streak: number;
  done: boolean;
};

// Hangi alışkanlık hangi günler tamamlandı
// { "a1": ["2026-10-19", "2026-10-20"], "b2": [...] }
export type Completions = Record<string, string[]>;