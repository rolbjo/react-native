import { NavigationContainer } from '@react-navigation/native'

import React from 'react'

import StackNavigator from './StackNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App
