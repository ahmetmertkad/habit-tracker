import { Pressable, StyleSheet, Text, View } from 'react-native'          // ← Pressable eklendi
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize, fontWeight } from '../../../theme/theme'

type HabitCardProps = {
  icon: string;
  color: string;
  name: string;
  streak: number;
  done: boolean;
  onPress: () => void;                                                    // ← yeni
  onLongPress: () => void;                                                // ← yeni
};

const HabitCard = ({ icon, name, streak, done, color, onPress,onLongPress }: HabitCardProps) => {   // ← onPress eklendi
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.container}>                {/* ← View yerine Pressable */}
      {/* Sol: ikon kutusu */}
      <View style={[styles.iconBox, { backgroundColor: color + '24' }]}>
        <Text style={styles.emoji}>{icon}</Text>
      </View>

      {/* Orta: metinler */}
      <View style={styles.texts}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
          {streak > 0 ? `🔥 ${streak} gün seri` : 'Bugün başla'}         
        </Text>
      </View>

      {/* Sağ: tik */}
      <View style={[styles.check, done ? styles.checkDone : styles.checkEmpty]}>
        {done && <Ionicons name="checkmark" size={16} color={colors.white} />}
      </View>
    </Pressable>                                                          
  )
}

export default HabitCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  title: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: colors.primary,
  },
  checkEmpty: {
    borderWidth: 2,
    borderColor: colors.border,
  },
})