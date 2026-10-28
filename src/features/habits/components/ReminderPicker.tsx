import { useState } from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import { colors, fontSize, fontWeight, radius, spacing } from '../../../theme/theme'

type Props = {
  value?: string
  onChange: (value?: string) => void
}

const ReminderPicker = ({ value, onChange }: Props) => {
  const [showPicker, setShowPicker] = useState(false)
  const enabled = value !== undefined

  const handleToggle = (on: boolean) => {
    onChange(on ? '09:00' : undefined)
  }

  const handleTimeChange = (_event: unknown, date: Date) => {
    setShowPicker(false)
    onChange(dayjs(date).format('HH:mm'))
  }

  const [hour, minute] = (value ?? '09:00').split(':').map(Number)
  const pickerDate = dayjs().hour(hour).minute(minute).toDate()

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Hatırlat</Text>
        <Switch
          value={enabled}
          onValueChange={handleToggle}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>

      {enabled && (
        <Pressable style={styles.timeButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.timeText}>{value}</Text>
        </Pressable>
      )}

      {showPicker && (
        <DateTimePicker
          value={pickerDate}
          mode="time"
          is24Hour
          onValueChange={handleTimeChange}
          onDismiss={() => setShowPicker(false)}
        />
      )}
    </View>
  )
}

export default ReminderPicker

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: fontSize.body,
    color: colors.text,
  },
  timeButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  timeText: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
})