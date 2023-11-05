import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GameTime from './GameTime'
import Home from './Home'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name='GameTime' component={GameTime} />
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default StackNavigator
