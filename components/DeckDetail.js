import React from 'react'
import { StyleSheet, Text, SafeAreaView, YellowBox, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { blue, red } from '../utils/colors'

//ignore warning
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
])

//
export default function DeckDetail({ route, navigation }) {
  //Get the param
  const { deckName, deckCards } = route.params

  //console.log('in DeckDetails')
  //console.log(navigation)
  //console.log(route)


  return (
    <SafeAreaView style={styles.container}>
      <Text>Detail View of Deck: {deckName}!!!</Text>
      <Text>Contains {deckCards} Card(s)</Text>
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => {
          /* 1. Navigate to the Add Question route with params */
          navigation.navigate('CardAdd', {
            deckName: deckName,
            route: route,
            navigation: navigation
          })
        }}
      >
        <Text style={styles.submitBtnText}>Add A Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => {
          /* 1. Navigate to the Add Question route with params */
          navigation.navigate('CardQuiz', {
            deckName: deckName,
            route: route,
            navigation: navigation
          })
        }}
      >
        <Text style={styles.submitBtnText}>Start Quiz</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

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
    padding: 5,
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