import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import TodayScreen from '../screens/TodayScreen'
import NewHabitScreen from '../screens/NewHabbitScreen'
import HabitDetailScreen from '../screens/HabitDetailScreen'


const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Today"
        component={TodayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewHabit"
        component={NewHabitScreen}
        options={{ title: 'Yeni alışkanlık', presentation: 'modal' }}
      />
      <Stack.Screen
        name="HabitDetail"
        component={HabitDetailScreen}
        options={{ title: 'Alışkanlık Detayı' }}
      />
    </Stack.Navigator>
    
  )
}

export default RootNavigator