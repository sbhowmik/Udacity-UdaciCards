import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { connect } from 'react-redux'
import DeckSummaryCard from './DeckSummaryCard'

//
const Item = ({ title, navigation }) => (
  <TouchableOpacity 
    onPress={() => navigation.navigate('DeckDetail')}
    style={styles.item}
  >
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
)

//
class DeckList extends Component {

  //
  render(){

    const { decks, deckNames, navigation } = this.props
    
    //show the decks on coming here
    return (
      <View style={styles.container}>
        <FlatList
          data={deckNames}
          renderItem={({ item }) => (
            <DeckSummaryCard deckName={item} navigation={navigation} />
          )}
            keyExtractor={item => item}
          />
      </View>
    )
  }//render
}//class ListDeck

//styles definition
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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

//
function mapStateToProps ( {decks}, {navigation} ) {

  //console.log('mSTP Decks', decks)
  let deckNames = Object.keys(decks)
  //console.log(deckNames)

  return {
    decks,
    deckNames,
    navigation
  }
}

//
export default connect(mapStateToProps)(DeckList)
