import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/theme'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectHabitById, calculateStreak } from '../features/habits/selectors'
import { formatDays } from '../features/habits/constants'
import { deleteHabit } from '../features/habits/habitSlice'
import MonthCalendar from '../features/habits/components/MonthCalendar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { cancelHabitReminders } from '../services/notifications'

type DetailRoute = RouteProp<RootStackParamList, 'HabitDetail'>

const HabitDetailScreen = () => {
  const route = useRoute<DetailRoute>()
  const { habitId } = route.params
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()
  const insets = useSafeAreaInsets()

  const habit = useAppSelector((state) => selectHabitById(state, habitId))
  const rawDates = useAppSelector((state) => state.habits.completions[habitId])

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Alışkanlık bulunamadı</Text>
      </View>
    )
  }

  const dates = rawDates ?? []
  const streak = calculateStreak(habit, dates)
  const total = dates.length

  const handleDelete = () => {
    Alert.alert(
      'Alışkanlığı sil',
      `"${habit.name}" ve tüm geçmişi silinecek.`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            cancelHabitReminders(habitId)
            navigation.goBack()
            dispatch(deleteHabit(habitId))
          },
        },
      ]
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingBottom: spacing.xl+insets.bottom }]}>
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: habit.color + '24' }]}>
          <Text style={styles.icon}>{habit.icon}</Text>
        </View>
        <Text style={styles.name}>{habit.name}</Text>
        <Text style={styles.days}>{formatDays(habit.days)}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>🔥 {streak}</Text>
          <Text style={styles.statLabel}>Mevcut seri</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>✅ {total}</Text>
          <Text style={styles.statLabel}>Toplam</Text>
        </View>
      </View>

      <MonthCalendar color={habit.color} dates={dates} />

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Alışkanlığı sil</Text>
      </Pressable>
      <Pressable style={styles.changeButton} onPress={() => navigation.navigate('NewHabit', { habitId })}>
        <Text style={styles.changeText}>Alışkanlığı düzenle</Text>
      </Pressable>
    </ScrollView>
  )
}

export default HabitDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  text: {
    fontSize: fontSize.body,
    color: colors.text,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 36,
  },
  name: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  days: {
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  deleteButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  deleteText: {
    color: '#EF4444',
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
  changeButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  changeText: {
    color: colors.primary,
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
})