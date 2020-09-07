import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'


//
class DeckSummaryCard extends Component {

  //
  showDeckDetails = () => {

    const {deckName, deckCards, navigation} = this.props

    navigation.navigate('DeckDetail', {
      deckName: deckName,
      deckCards: deckCards,
      navigation: navigation
    })
  }

  //
  render() {

    const {deckName, deckCards, navigation} = this.props

    return (
      <TouchableOpacity 
        onPress={this.showDeckDetails}
        style={styles.item}
      >
        <Text style={styles.title}>{deckName}</Text>
        <Text >{deckCards} Card(s) </Text>
      </TouchableOpacity>
    )

  }//render

}//class

//styles definition
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

///*
//
function mapStateToProps ( {decks}, {deckName, navigation} ) {

  const thisDeck = decks[deckName]
  const deckCards = thisDeck.questions.length

  return {
    deckName,
    deckCards,
    navigation
  }
}

//
export default connect(mapStateToProps)(DeckSummaryCard)
