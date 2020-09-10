import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { connect } from 'react-redux'
import { blue, gray, red } from '../utils/colors'
import { addDeckAction } from '../actions/' 
import { handleAsyncAdd } from '../utils/api'

//
class DeckAdd extends Component {

  //state
  state = {
    newDeckName: ''
  }

  //on submit
  onSubmit = (e) => {
    e.preventDefault()
    
    //collect infos
    const { newDeckName } = this.state
    const { navigation, dispatch, decks, subjects } = this.props
    
    //empty check
    if (newDeckName === '') {
      alert("New Deck Name cannot be empty!")
      return
    }

    //construct new deck object
    const newDeck = {
      title: newDeckName,
      questions: []
    }

    //full deck object
    const deck = {
      [newDeck.title]: newDeck
    }
  
    //dispatch to store
    dispatch(addDeckAction(deck))

    //call add deck handler
    handleAsyncAdd(deck, decks, subjects)

    //navigate to the deck's details page
    navigation.navigate('DeckDetail', {
      deckName: newDeckName, 
      deckCards:0, 
      navigation: navigation
    })

  }//onSubmit

  //new deck name handler
  newDeckNameHandler = (currText) => {
    const thisNewDeckName = currText

    this.setState(() => ({
      newDeckName: thisNewDeckName
    }))

  }

  //render
  render() {

    let { newDeckName } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Specify New Deck Title</Text>
        <TextInput
          style={styles.titleInput}
          value={newDeckName}
          onChangeText={this.newDeckNameHandler}
        />
        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={this.onSubmit}
        >
          <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    )

  }

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
    padding:15,
  },
  titleInput:{
    backgroundColor: gray,
    padding:15,
    width:200,
    height:60,
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

  //console.log('mSTP Decks', decks)
  let deckNames = Object.keys(decks)
  //console.log(deckNames)

  return {
    decks,
    subjects,
    deckNames
  }
}

//
export default connect(mapStateToProps)(DeckAdd)
