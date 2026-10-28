// src/features/habits/components/ProgressCard.tsx

import { StyleSheet, Text, View } from 'react-native'
import { colors, spacing, radius, fontSize, fontWeight } from '../../../theme/theme'

type ProgressCardProps = {
  done: number;
  total: number;
  streak: number;
};

const ProgressCard = ({ done, total, streak }: ProgressCardProps) => {
  // total 0 ise 0'a bölme hatası olmasın diye kontrol
  const percent = total > 0 ? (done / total) * 100 : 0

  return (
    <View style={styles.card}>
      {/* Üst satır */}
      <View style={styles.row}>
        <View style={styles.texts}>
          <Text style={styles.label}>Bugünkü ilerleme</Text>
          <Text style={styles.value}>{done} / {total} tamamlandı</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔥 {streak}</Text>
        </View>
      </View>

      {/* İlerleme çubuğu */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  )
}

export default ProgressCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  texts: {
    gap: spacing.xxs,
  },
  label: {
    fontSize: fontSize.small,
    color: colors.white,
    opacity: 0.8,
  },
  value: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.semibold,
    color: colors.white,
  },
  track: {
    height: 8,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.sm,
    backgroundColor: colors.white,
  },
})