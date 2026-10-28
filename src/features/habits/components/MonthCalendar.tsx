import { StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'
import { colors, fontSize, fontWeight, radius, spacing } from '../../../theme/theme'
import { weekDays } from '../constants'

type Props = {
  color: string
  dates: string[]
}

const MonthCalendar = ({ color, dates }: Props) => {
  const today = dayjs()
  const start = today.startOf('month')
  const daysInMonth = today.daysInMonth()

  const offset = (start.day() + 6) % 7

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{today.format('MMMM YYYY')}</Text>

      <View style={styles.grid}>
        {weekDays.map((day) => (
          <View key={day.label} style={styles.cell}>
            <Text style={styles.weekLabel}>{day.label}</Text>
          </View>
        ))}

        {cells.map((dayNumber, index) => {
          if (dayNumber === null) {
            return <View key={`empty-${index}`} style={styles.cell} />
          }

          const dateStr = start.date(dayNumber).format('YYYY-MM-DD')
          const done = dates.includes(dateStr)
          const isToday = dayNumber === today.date()

          return (
            <View key={dateStr} style={styles.cell}>
              <View
                style={[
                  styles.circle,
                  done && { backgroundColor: color },
                  isToday && !done && styles.todayCircle,
                ]}
              >
                <Text style={[styles.dayText, done && styles.dayTextDone]}>
                  {dayNumber}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default MonthCalendar

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  title: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.2857%',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  weekLabel: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCircle: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dayText: {
    fontSize: fontSize.small,
    color: colors.text,
  },
  dayTextDone: {
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
})