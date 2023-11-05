import React from 'react'
import { Rating } from 'react-native-ratings'
import PropTypes from 'prop-types'

const RatingComponent = ({ FinishRating }) => {
  const handleRatingCompleted = (rating) => {
    console.log('Rating is: ' + typeof rating)

    if (FinishRating) {
      FinishRating(rating)
    }
  }

  return (
    <Rating
      showRating
      onFinishRating={handleRatingCompleted}
      style={{ paddingVertical: 10 }}
    />
  )
}

RatingComponent.propTypes = {
  FinishRating: PropTypes.func.isRequired,
}

export default RatingComponent
