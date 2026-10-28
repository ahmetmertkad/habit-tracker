import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, radius, spacing } from '../../../theme/theme'
import { habitIcons } from '../constants'

type IconPickerProps = {
  value: string;
  onChange: (icon: string) => void;
};

const IconPicker = ({ value, onChange }: IconPickerProps) => {
  return (
    <View style={styles.grid}>
      {habitIcons.map((icon) => {
        const selected = icon === value
        return (
          <Pressable
            key={icon}
            onPress={() => onChange(icon)}
            style={[styles.item, selected && styles.itemSelected]}
          >
            <Text style={styles.emoji}>{icon}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default IconPicker

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSelected: {
    borderColor: colors.primary,
  },
  emoji: {
    fontSize: 22,
  },
})