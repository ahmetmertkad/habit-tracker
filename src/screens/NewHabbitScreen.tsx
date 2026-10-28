// src/screens/NewHabitScreen.tsx

import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { colors, fontSize, fontWeight, habitColors, radius, spacing } from '../theme/theme'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addHabit, updateHabit } from '../features/habits/habitSlice'
import { selectHabitById } from '../features/habits/selectors'
import { RootStackParamList } from '../navigation/types'
import IconPicker from '../features/habits/components/IconPicker'
import ColorPicker from '../features/habits/components/ColorPicker'
import DayPicker from '../features/habits/components/DayPicker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ReminderPicker from '../features/habits/components/ReminderPicker'
import { syncHabitReminders } from '../services/notifications'

type FormRoute = RouteProp<RootStackParamList, 'NewHabit'>

const NewHabitScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<FormRoute>()
  const dispatch = useAppDispatch()
  const insets = useSafeAreaInsets()

  // Düzenleme modu: id geldiyse alışkanlığı bul
  const habitId = route.params?.habitId
  const habit = useAppSelector((state) =>
    habitId ? selectHabitById(state, habitId) : undefined
  )

  // Formun alanları (alışkanlık varsa onun değerleri, yoksa varsayılan)
  const [name, setName] = useState(habit?.name ?? '')
  const [icon, setIcon] = useState(habit?.icon ?? '💧')
  const [color, setColor] = useState<string>(habit?.color ?? habitColors[0])
  const [days, setDays] = useState<number[]>(habit?.days ?? [0, 1, 2, 3, 4, 5, 6])
  const [reminderTime, setReminderTime] = useState<string | undefined>(habit?.reminderTime)

  // Hata mesajları
  const [nameError, setNameError] = useState('')
  const [daysError, setDaysError] = useState('')

  // Düzenleme modunda başlığı değiştir
  useEffect(() => {
    if (habitId) {
      navigation.setOptions({ title: 'Düzenle' })
    }
  }, [habitId, navigation])

  const onSave = () => {
    const trimmedName = name.trim()
    let hasError = false

    if (trimmedName.length === 0) {
      setNameError('Bir isim yaz')
      hasError = true
    } else {
      setNameError('')
    }

    if (days.length === 0) {
      setDaysError('En az bir gün seç')
      hasError = true
    } else {
      setDaysError('')
    }

    if (hasError) return

    const data = { name: trimmedName, icon, color, days, reminderTime }

    if (habitId) {
      dispatch(updateHabit({ id: habitId, changes: data }))
      syncHabitReminders({ id: habitId, ...data })
    } else {
      const action = dispatch(addHabit(data))
      syncHabitReminders(action.payload)
    }

    navigation.goBack()
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: spacing.xl+insets.bottom }]}
      keyboardShouldPersistTaps="handled"
    >
      {/* İsim */}
      <View style={styles.field}>
        <Text style={styles.label}>İsim</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Örn. Su iç"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, nameError !== '' && styles.inputError]}
        />
        {nameError !== '' && <Text style={styles.error}>{nameError}</Text>}
      </View>

      {/* İkon */}
      <View style={styles.field}>
        <Text style={styles.label}>İkon</Text>
        <IconPicker value={icon} onChange={setIcon} />
      </View>

      {/* Renk */}
      <View style={styles.field}>
        <Text style={styles.label}>Renk</Text>
        <ColorPicker value={color} onChange={setColor} />
      </View>

      {/* Günler */}
      <View style={styles.field}>
        <Text style={styles.label}>Günler</Text>
        <DayPicker value={days} onChange={setDays} />
        {daysError !== '' && <Text style={styles.error}>{daysError}</Text>}
      </View>
      <View style={styles.field}>
  <Text style={styles.label}>Hatırlatıcı</Text>
  <ReminderPicker value={reminderTime} onChange={setReminderTime} />
</View>

      {/* Kaydet */}
      <Pressable
        onPress={onSave}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Kaydet</Text>
      </Pressable>
    </ScrollView>
  )
}

export default NewHabitScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.body,
    color: colors.text,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  error: {
    fontSize: fontSize.caption,
    color: '#EF4444',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.white,
  },
})