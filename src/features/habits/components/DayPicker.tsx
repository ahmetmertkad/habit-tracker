import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, fontSize, fontWeight, radius } from '../../../theme/theme'
import { weekDays } from '../constants'


import { useNavigation } from '@react-navigation/native'

type DayPickerProps = {
  value: number[];
  onChange: (days: number[]) => void;
};

const DayPicker = ({ value, onChange }: DayPickerProps) => {
  const toggleDay = (day: number) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day))   // seçiliyse çıkar
    } else {
      onChange([...value, day])                  // değilse ekle
    }
  }

  return (
    <View style={styles.row}>
      {weekDays.map((day) => {
        const selected = value.includes(day.value)
        return (
          <Pressable
            key={day.value}
            onPress={() => toggleDay(day.value)}
            style={[styles.day, selected && styles.daySelected]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {day.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default DayPicker

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  labelSelected: {
    color: colors.white,
  },
})