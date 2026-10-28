// App.tsx

import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'
import RootNavigator from './src/navigation/RootNavigator'
import { useEffect } from 'react'
import { setupNotifications} from './src/services/notifications'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  useEffect(() => {
  setupNotifications()
}, [])
  return (

    
    <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  )
}