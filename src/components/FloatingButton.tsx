// src/components/FloatingButton.tsx

import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius } from '../theme/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type FloatingButtonProps = {
  onPress: () => void;
};
const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  const insets = useSafeAreaInsets()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { bottom: spacing.lg + insets.bottom },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name="add" size={28} color={colors.white} />
    </Pressable>
  )
}

export default FloatingButton

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',

    // Gölge: Android
    elevation: 6,
    // Gölge: iOS
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  pressed: {
    transform: [{ scale: 0.94 }],
  },
})