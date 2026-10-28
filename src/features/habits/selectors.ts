import { createSelector } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import type { RootState } from '../../store'
import { Habit } from './types'

// Ham veri
const selectHabits = (state: RootState) => state.habits.habits
const selectCompletions = (state: RootState) => state.habits.completions

// Toplam alışkanlık sayısı
export const selectHabitCount = (state: RootState) => state.habits.habits.length

export const selectHabitById = (state: RootState, id: string) =>
  state.habits.habits.find((habit) => habit.id === id)

// Bir alışkanlığın serisini hesapla
export const calculateStreak = (habit: Habit, dates: string[]): number => {
  let streak = 0
  let day = dayjs()

  // Bugün henüz yapılmadıysa seri bozulmasın, dünden saymaya başla
  if (!dates.includes(day.format('YYYY-MM-DD'))) {
    day = day.subtract(1, 'day')
  }

  for (let i = 0; i < 365; i++) {
    const dateStr = day.format('YYYY-MM-DD')
    const isScheduled = habit.days.includes(day.day())

    if (isScheduled) {
      if (dates.includes(dateStr)) {
        streak++
      } else {
        break
      }
    }
    day = day.subtract(1, 'day')
  }

  return streak
}

// Bugün yapılacak alışkanlıklar, kartın istediği şekilde
export const selectTodayItems = createSelector(
  [selectHabits, selectCompletions],
  (habits, completions) => {
    const today = dayjs()
    const todayStr = today.format('YYYY-MM-DD')
    const weekday = today.day()

    return habits
      .filter((habit) => habit.days.includes(weekday))
      .map((habit) => {
        const dates = completions[habit.id] ?? []
        return {
          id: habit.id,
          name: habit.name,
          icon: habit.icon,
          color: habit.color,
          done: dates.includes(todayStr),
          streak: calculateStreak(habit, dates),
        }
      })
  }
)