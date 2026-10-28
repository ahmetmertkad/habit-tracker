import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, habitColors, radius, spacing } from '../../../theme/theme'

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <View style={styles.row}>
      {habitColors.map((color) => {
        const selected = color === value
        return (
          <Pressable
            key={color}
            onPress={() => onChange(color)}
            style={[styles.circle, { backgroundColor: color }]}
          >
            {selected && <Ionicons name="checkmark" size={20} color={colors.white} />}
          </Pressable>
        )
      })}
    </View>
  )
}

export default ColorPicker

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
})