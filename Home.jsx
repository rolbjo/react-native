import { View, Button, Text, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RatingComponent from './RatingComponent'
import React, { useState } from 'react'

const Home = () => {
  const navigation = useNavigation()

  const handleCategorySelection = (category) => {
    navigation.navigate('GameTime', { category })
  }

  const [message, setMessage] = useState('')

  const handleRatingCompleted1 = (rating) => {
    console.log('Rating completed in MyComponent: ' + rating)

    let newMessage = ''
    switch (rating) {
      case 1:
        newMessage = 'Det var snålt'
        break
      case 2:
        newMessage = 'Bättre kan du'
        break
      case 3:
        newMessage = 'Fair enough'
        break
      case 4:
        newMessage = 'Man tackar :)'
        break
      case 5:
        newMessage = 'Åå så snällt!'
        break
      default:
        newMessage = ''
        break
    }
    setMessage(newMessage)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const buttonStyle = styles.buttons

  const buttons = [
    { title: 'General knowledge', category: '9' },
    { title: 'Video games', category: '15' },
    { title: 'Geography', category: '22' },
    { title: 'Animals', category: '27' },
    { title: 'Movies', category: '11' },
  ]

  return (
    <ImageBackground
      source={require('./assets/milky-way-2695569_1280.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.h1}>The true or false quiz!</Text>
        <View style={styles.textContainer}>
          <Text style={styles.p}>
            Welcome to the true or false quiz. {'\n'} Begin by selecting what
            category you wish to play.
          </Text>
          {buttons.map((button) => (
            <View style={buttonStyle} key={button.title}>
              <Button
                title={button.title}
                onPress={() => handleCategorySelection(button.category)}
              />
            </View>
          ))}
          <RatingComponent FinishRating={handleRatingCompleted1} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    padding: 60,
  },
  textContainer: {
    alignItems: 'center',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  p: {
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
  },
  buttons: {
    marginBottom: 10,
  },
  message: {
    color: 'white',
  },
})
