import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSize, fontWeight, spacing } from '../../../theme/theme'

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌱</Text>
      <Text style={styles.title}>Bugün için alışkanlık yok</Text>
      <Text style={styles.subtitle}>
        Sağ alttaki + butonuna basarak ilk alışkanlığını ekle
      </Text>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 240,
  },
})