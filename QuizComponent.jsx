import { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  ToastAndroid,
  Platform,
  StyleSheet,
} from 'react-native'
import he from 'he'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'

const QuizComponent = ({ refreshing, category }) => {
  const [questions, setQuestions] = useState([])
  const [refreshed, setRefreshed] = useState(false)
  const [score, setScore] = useState(0)
  const [showText, setShowText] = useState('')

  const fetchQuestions = async () => {
    console.log('Category:', category)
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${category}&type=boolean`
      )
      const data = await response.json()
      setQuestions(data.results)
      console.log(data.results)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAnswer = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1)
      if (Platform.OS === 'android') {
        ToastAndroid.show('Correct!', ToastAndroid.SHORT)
      } else {
        setShowText('Correct!')
        setTimeout(() => {
          setShowText('')
        }, 1500)
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Incorrect!', ToastAndroid.SHORT)
      } else {
        setShowText('Incorrect!')
        setTimeout(() => {
          setShowText('')
        }, 1500)
      }
    }

    fetchQuestions()
  }

  useEffect(() => {
    if ((refreshing && !refreshed) || questions.length === 0) {
      fetchQuestions()
      setRefreshed(true)
    } else if (!refreshing) {
      setRefreshed(false)
    }
  }, [refreshing])

  return (
    <View>
      {questions.length > 0 ? (
        questions.map((question) => (
          <View key={question.question}>
            <Animatable.Text animation='bounceIn' style={styles.question}>
              {he.decode(question.question)}
            </Animatable.Text>
            <Button
              title='True'
              onPress={() => handleAnswer('True', question.correct_answer)}
            />
            <Button
              title='False'
              onPress={() => handleAnswer('False', question.correct_answer)}
            />
          </View>
        ))
      ) : (
        <Text style={styles.question}>Loading...</Text>
      )}
      <Text style={styles.question}>Score: {score}</Text>
      <Text>
        {showText && (
          <Animatable.Text style={styles.question} animation='fadeIn'>
            {showText}
          </Animatable.Text>
        )}
      </Text>
    </View>
  )
}

QuizComponent.propTypes = {
  refreshing: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  question: {
    color: 'white',
    marginBottom: 10,
  },
})
export default QuizComponent
