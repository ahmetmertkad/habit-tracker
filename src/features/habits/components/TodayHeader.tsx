import { StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import { colors, spacing, fontSize, fontWeight } from '../../../theme/theme'

const TodayHeader = () => {
    dayjs.locale('tr')
    const today = dayjs().format('dddd, D MMMM')

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{today}</Text>
      <Text style={styles.title}>Bugün</Text>
    </View>
  )
}

export default TodayHeader

const styles = StyleSheet.create({
    container: {
        gap: spacing.xs
    },
    date: {
       fontSize: fontSize.small, fontWeight: fontWeight.semibold, color: colors.textMuted
    },
    title: {
        fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text
    }

})