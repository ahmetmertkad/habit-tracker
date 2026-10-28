import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { Habit, Completions } from './types'

type HabitsState = {
  habits: Habit[];
  completions: Completions;
};

const initialState: HabitsState = {
  habits: [],
  completions: {},
}

type NewHabitInput = Omit<Habit, 'id' | 'createdAt'>

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    // Yeni alışkanlık ekle
    addHabit: {
      reducer: (state, action: PayloadAction<Habit>) => {
        state.habits.push(action.payload)
      },
      prepare: (input: NewHabitInput) => ({
        payload: {
          ...input,
          id: nanoid(),
          createdAt: dayjs().format('YYYY-MM-DD'),
        },
      }),
    },

    // Alışkanlığı sil
    deleteHabit: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.habits = state.habits.filter((h) => h.id !== id)
      delete state.completions[id]
    },
    updateHabit: (state, action: PayloadAction<{ id: string; changes: NewHabitInput }>) => {
      const { id, changes } = action.payload
      const habit = state.habits.find((h) => h.id === id)
    if (habit) {
  habit.name = changes.name
  habit.icon = changes.icon
  habit.color = changes.color
  habit.days = changes.days
  habit.reminderTime = changes.reminderTime
}  
    },

    // Bir günü işaretle / işareti kaldır
    toggleCompletion: (state, action: PayloadAction<{ habitId: string; date: string }>) => {
      const { habitId, date } = action.payload
      const dates = state.completions[habitId] ?? []

      if (dates.includes(date)) {
        state.completions[habitId] = dates.filter((d) => d !== date)
      } else {
        state.completions[habitId] = [...dates, date]
      }
    },
  },
})

export const { addHabit, deleteHabit, toggleCompletion, updateHabit } = habitsSlice.actions
export default habitsSlice.reducer