                                      // 🟡 GEÇİCİ (useEffect için)
import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import dayjs from 'dayjs'

import { RootStackParamList } from '../navigation/types'
import { colors, spacing } from '../theme/theme'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectTodayItems, selectHabitCount } from '../features/habits/selectors'
import { addHabit, toggleCompletion } from '../features/habits/habitSlice'
         // 🟡 GEÇİCİ

import HabitCard from '../features/habits/components/HabitCard'
import TodayHeader from '../features/habits/components/TodayHeader'
import ProgressCard from '../features/habits/components/ProgressCard'
import SectionHeader from '../components/SectionHeader'
import FloatingButton from '../components/FloatingButton'
import EmptyState from '../features/habits/components/EmptyState'

type Navigation = NativeStackNavigationProp<RootStackParamList>

const TodayScreen = () => {
  const navigation = useNavigation<Navigation>()
  const dispatch = useAppDispatch()

  // Redux'tan oku
  const items = useAppSelector(selectTodayItems)
               // 🟡 GEÇİCİ

  // 🟡 GEÇİCİ BAŞLANGIÇ: Test için örnek alışkanlıklar. Form hazır olunca sil.

  // 🟡 GEÇİCİ BİTİŞ

  // İlerleme hesapları
  const total = items.length
  const doneCount = items.filter((item) => item.done).length
  const streaks = items.map((item) => item.streak)
  const bestStreak = streaks.length > 0 ? Math.max(...streaks) : 0

  // Karta dokununca: bugünü işaretle / işareti kaldır
  const handleToggle = (habitId: string) => {
    const today = dayjs().format('YYYY-MM-DD')
    dispatch(toggleCompletion({ habitId, date: today }))
  }

  return (
    <View style={styles.container}>
      <FlatList
       ListEmptyComponent={<EmptyState />}   
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
  <HabitCard
    {...item}
    onPress={() => handleToggle(item.id)}
    onLongPress={() => navigation.navigate('HabitDetail', { habitId: item.id })}
  />
)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <TodayHeader />
            <ProgressCard done={doneCount} total={total} streak={bestStreak} />
            {items.length > 0 && (
  <SectionHeader
    title="Alışkanlıklar"
    actionLabel="Düzenle"
    onActionPress={() => console.log('Düzenle')}
  />
)}
          </View>
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />

      <FloatingButton onPress={() => navigation.navigate('NewHabit')} />
    </View>
  )
}

export default TodayScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: 64,
    paddingBottom: 120,
  },
  header: {
    gap: spacing.xl,
    marginBottom: spacing.lg,
  },
  separator: {
    height: spacing.sm,
  },
})