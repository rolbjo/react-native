import { useState, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  Button,
  ImageBackground,
} from 'react-native'
import QuizComponent from './QuizComponent'

export default function GameTime() {
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const { category } = route.params

  console.log(category)

  const navigateToHomeScreen = () => {
    navigation.navigate('Home')
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <ImageBackground
      source={require('./assets/milky-way-2695569_1280.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container2}>
            <Button title='Go to categories' onPress={navigateToHomeScreen} />
            <Text style={styles.h1}>The true or false quiz!</Text>
            <QuizComponent refreshing={refreshing} category={category} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  container2: {
    alignItems: 'center',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 140,
    marginTop: 20,
    color: 'white',
  },
})
