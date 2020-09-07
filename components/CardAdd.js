import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux'
import { blue, gray, red } from '../utils/colors'
import { AddCardAction } from '../actions/'
import { handleAsyncAddCard } from '../utils/api'

//
class CardAdd extends Component {

  //state
  state = {
    cardQuestion: '',
    cardAnswer: ''
  }

  //on submit
  onSubmit = (e) => {
    e.preventDefault()
    
    //collect infos
    const { cardQuestion, cardAnswer } = this.state
    const { route, dispatch, decks, subjects } = this.props
    
    const { deckName } = route.params
    //console.log('dN', deckName)
    
    //empty check
    if (cardQuestion === '' || cardAnswer === '' ) {
      alert("New Card Question &/or Answer cannot be empty!")
      return
    }

    //construct new deck object
    const newCard = {
      question: cardQuestion,
      answer: cardAnswer
    }
  
    //dispatch to store
    dispatch(AddCardAction(newCard, deckName))

    //call add deck handler
    handleAsyncAddCard(newCard, deckName, decks, subjects)

  }

  //
  cardQuestionHandler = (currText) => {
    const thiscardQuestion = currText

    this.setState(() => ({
      cardQuestion: thiscardQuestion
    }))

  }

  //
  cardAnswerHandler = (currText) => {
    const thiscardAnswer = currText

    this.setState(() => ({
      cardAnswer: thiscardAnswer
    }))

  }

  //render
  render() {

    //
    let { cardQuestion, cardAnswer } = this.state

    const { route } = this.props
    console.log('Route', route)
    const { deckName } = route.params
    console.log('dN', deckName)

    //
    return (
      <View style={styles.container}>
        <Text>Home to CardAddView!!! of deck {deckName}</Text>
        <Text>Please add Question and Answer below:</Text>
        <TextInput
          style={styles.titleInput}
          value={cardQuestion}
          onChangeText={this.cardQuestionHandler}
        />
        <TextInput
          style={styles.titleInput}
          value={cardAnswer}
          onChangeText={this.cardAnswerHandler}
        />
        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={this.onSubmit}
        >
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    )
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
    backgroundColor: gray,
    padding:5,
    width:200,
    height:40,
    borderColor:red,
    borderWidth: 2,
    fontSize:20
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

//
function mapStateToProps ( {decks, subjects } ) { 

  return {
    decks,
    subjects
  }
}

//
export default connect(mapStateToProps)(CardAdd)
