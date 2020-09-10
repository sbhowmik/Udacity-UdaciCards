import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { connect } from 'react-redux'
import { blue, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

//
const ShowQuestion = ({thisQuestion, onShowAnswer}) => (
  <View style={styles.container}>
  <Text> Question: </Text>
  <Text>{thisQuestion}</Text> 
  <TouchableOpacity 
    style={styles.submitBtn}
    onPress={onShowAnswer}
  >
    <Text style={styles.submitBtnText}>Show Answer</Text>
  </TouchableOpacity>
  </View>
)

//
const ShowAnswer = ({thisAnswer, onShowQuestion}) => (
  <View style={styles.container}>
    <Text>Answer: </Text>
    <Text>{thisAnswer}</Text>
    <TouchableOpacity 
      style={styles.submitBtn}
      onPress={onShowQuestion}
    >
      <Text style={styles.submitBtnText}>Show Question</Text>
    </TouchableOpacity>
  </View>
)

//
class CardQuiz extends Component {

  //state
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    showAnswer: false
  }

  //
  onShowAnswer = (e) => {
    this.setState({
      showAnswer: true,
    })
  }

  //
  onShowQuestion = (e) => {
    this.setState({
      showAnswer: false,
    })
  }

  //
  onCorrect = (e) => {

    let {correctAnswers, questionIndex} = this.state
    //increment correct answers by one
    correctAnswers = correctAnswers + 1
    //increment question by one
    questionIndex = questionIndex + 1

    this.setState({
      questionIndex: questionIndex,
      correctAnswers: correctAnswers,
      showAnswer: false //Reset to show question state once the user marks an answer
    })

    //clear and set local notifications
    clearLocalNotification()
    .then(setLocalNotification)

  }

  //
  onIncorrect = (e) => {
    let {questionIndex} = this.state
    //increment question by one
    questionIndex = questionIndex + 1

    this.setState({
      questionIndex: questionIndex,
      showAnswer: false //Reset to show question state once the user marks an answer
    })

    //clear and set local notifications
    clearLocalNotification()
    .then(setLocalNotification)

  }

  //
  onRetakeQuiz = (e) => {

    //reinitialize the entire quiz
    this.setState({
      questionIndex: 0,
      correctAnswers: 0,
      showAnswer: false
    })
  }

  //
  onBackToDeck = (e) => {

    //navigate back
    this.props.navigation.goBack()

  }

  //render
  render() {

    const { route, navigation, decks } = this.props
    const { deckName } = route.params
    const thisDeck = decks[deckName]
    const noOfDeckCards = thisDeck.questions.length
    let { questionIndex, showAnswer, correctAnswers } = this.state
    let correctAnswerPercentage = ((correctAnswers/noOfDeckCards) * 100).toFixed(1)

    //empty deck check before beginning quiz
    if ( noOfDeckCards === 0 ) {
      return (
        <View style={styles.container}>
          <Text> Sorry, cant take Quiz on empty deck</Text>
        </View>        
      )
    }

    //
    //console.log('questionIndex', questionIndex)
    //console.log('noOfDeckCards', noOfDeckCards)

    //when quiz has been completed
    //allow to retake quiz or go back to the Individual Deck view.
    if (questionIndex >= noOfDeckCards){
      return (
        <View style={styles.container}>
          <Text>Quiz!!! for Deck: {deckName}</Text>
          <Text>End Of Quiz reached...thanks for studying </Text> 
          <Text>Percentage of Right Answers are: {correctAnswerPercentage} </Text>  
          <TouchableOpacity 
            style={styles.submitBtn}
            onPress={this.onRetakeQuiz} >
            <Text style={styles.submitBtnText}>Retake Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.submitBtn}
            onPress={this.onBackToDeck} >
            <Text style={styles.submitBtnText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>  
      )
    }

    //here means quiz isn't completed yet
    let questionNumber = questionIndex + 1 //1 more than the Index
    const thisVeryQuestion = thisDeck.questions[questionIndex]
    const thisQuestion = thisVeryQuestion.question
    const thisAnswer = thisVeryQuestion.answer

    //
    //console.log(route)
    //console.log(navigation)   
    //console.log(deckName)
    //console.log(thisVeryQuestion)
   

    //when show question is true
    return (
      <View style={styles.container}>
        <Text>Quiz!!! for Deck: {deckName}</Text>
        <Text>{questionNumber} of {noOfDeckCards} cards</Text>
        <Text> </Text>
        {showAnswer === false
        ? <ShowQuestion thisQuestion={thisQuestion} onShowAnswer={this.onShowAnswer} />
        : <ShowAnswer thisAnswer={thisAnswer} onShowQuestion={this.onShowQuestion} />
        }
        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={this.onCorrect} >
          <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={this.onIncorrect} >
          <Text style={styles.submitBtnText}>InCorrect</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );

  }//render

}//class

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  titleText:{
    fontSize: 25,
    color:blue,
  },
  titleInput:{
    padding:5,
    height:40,
    borderColor:red,
    fontSize:20
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  submitBtn: {
    width: 250,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

//
function mapStateToProps ( {decks} ) {

  return {
    decks
  }
}


//
export default connect(mapStateToProps)(CardQuiz) //
