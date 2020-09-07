import { AsyncStorage } from 'react-native'
import {
  _getDecks,
  _getSubjects,
} from './_DATA.js'
export const UDACICARDS_STORAGE_KEY = 'SumBho:UdaciCards'

///////////////////////////
//handle Async add 
///////////////////////////
//
export function handleAsyncAdd (deck, decks, subjects) {
  //
  decks = {...decks, ...deck}
  //
  let data = {}
  data = {decks, subjects}
  console.log(data)
  //
  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(data))
}

//
export function handleAsyncAddCard (card, deckName, decks, subjects) {
  //
  let added_card_decks = {}
  added_card_decks = {
    ...decks,
    [deckName]:{
      ...decks[deckName],
      questions:decks[deckName].questions.concat(card)
    }
  }
  //copy to decks
  decks = added_card_decks
  //
  let data = {}
  data = {decks, subjects}
  console.log(data)
  //
  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(data))  

}

///////////////////////////
//INITIAL DATA FETCHING
///////////////////////////

//get initial data
export function getInitialData () {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
  .then(handleUdacicardsData)
}

//initial data handler
//checks if available, otherwise supplies dummy data
export function handleUdacicardsData (storedData) {

    //debug mode force dummy data flag
    //required for testing @ development
    let debugDummyDataRequired = true //true false

    //def flag for null check
    let isDummyDataRequired = false

  //parse data
  let appData = JSON.parse(storedData)

  //console log if async was empty, else return
  if (appData === null) {
    console.log ("async was empty...would provide dummy data")
    isDummyDataRequired = true 
  } else {
    console.log ("async has provided the data")
    console.log (appData)
    //return JSON.parse(storedData)
  }

  if(debugDummyDataRequired === true){
    console.log ("debug mode dummy data is required...")
  }

  //dummy fetch
  if (isDummyDataRequired === true || debugDummyDataRequired === true ) {
    appData = generatedDummyData()
    console.log('Here is the dummy data...')
    console.log(appData)
  }

  return appData

}//handleUdacicardsData ()

//generatedDummyData
export function generatedDummyData() {

  let dummyData = {}

  dummyData = getDummyData()
  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

//get dummy data ... promise based
export function getDummyData () {
  return Promise.all([
    _getDecks(),
    _getSubjects(),
  ]).then(([decks, subjects]) => ({
    decks,
    subjects,
  }))
}
