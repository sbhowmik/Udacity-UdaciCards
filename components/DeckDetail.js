import React from 'react'
import { Button, StyleSheet, Text, View, YellowBox } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { blue, red } from '../utils/colors'

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
    <View style={styles.container}>
      <Text>Detail View of Deck: {deckName}!!!</Text>
      <Text>Contains {deckCards} Card(s)</Text>
      <Button
        title="Add A Question"
        onPress={() => {
          /* 1. Navigate to the Add Question route with params */
          navigation.navigate('CardAdd', {
            deckName: deckName,
            route: route,
            navigation: navigation
          })
        }}
      />
      <Button
        title="Start Quiz"
        onPress={() => {
          /* 1. Navigate to the Add Question route with params */
          navigation.navigate('CardQuiz', {
            deckName: deckName,
            route: route,
            navigation: navigation
          })
        }}
      />
      <StatusBar style="auto" />
    </View>
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