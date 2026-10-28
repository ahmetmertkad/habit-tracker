import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { Habit } from '../features/habits/types'

// Uygulama açıkken gelen bildirim de ekranda görünsün
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldSetBadge: false,
  }),
})

// Android kanalı oluştur + izin iste
export const setupNotifications = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Hatırlatıcılar',
      importance: Notifications.AndroidImportance.HIGH,
    })
  }

  const current = await Notifications.getPermissionsAsync()
  if (current.status === 'granted') return true

  const result = await Notifications.requestPermissionsAsync()
  return result.status === 'granted'
}








type ReminderHabit = Pick<Habit, 'id' | 'name' | 'icon' | 'days' | 'reminderTime'>

const reminderId = (habitId: string, day: number) => `${habitId}-${day}`

// Bir alışkanlığın bütün bildirimlerini sil
export const cancelHabitReminders = async (habitId: string) => {
  const allDays = [0, 1, 2, 3, 4, 5, 6]
  await Promise.all(
    allDays.map((day) =>
      Notifications.cancelScheduledNotificationAsync(reminderId(habitId, day))
    )
  )
}

// Eski bildirimleri sil, sonra yenilerini kur
export const syncHabitReminders = async (habit: ReminderHabit) => {
  await cancelHabitReminders(habit.id)

  if (!habit.reminderTime) return

  const [hour, minute] = habit.reminderTime.split(':').map(Number)

  await Promise.all(
    habit.days.map((day) =>
      Notifications.scheduleNotificationAsync({
        identifier: reminderId(habit.id, day),
        content: {
          title: `${habit.icon} ${habit.name}`,
          body: 'Bugünkü alışkanlığını yapma zamanı!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          weekday: day + 1,
          hour,
          minute,
          channelId: 'reminders',
        },
      })
    )
  )
}