import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData } from '../utils/api'

//constants
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_SUBJECTS = 'RECEIVE_SUBJECTS'
export const ADD_SUBJECT = 'ADD_SUBJECT'

//
export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

//
export function addDeckAction (deck) {

  return {
    type: ADD_DECK,
    deck,
  }
}

//
export function AddCardAction (card, deckName) {

  //
  return {
    type: ADD_CARD,
    card,
    deckName
  }
}

//
export function receiveSubjects (subjects) {
  return {
    type: RECEIVE_SUBJECTS,
    subjects,
  }
}

//
export function addSubject (subject) {
  return {
    type: ADD_SUBJECT,
    subject,
  }
}

//
export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ decks, subjects }) => {
        dispatch(hideLoading())
        dispatch(receiveDecks(decks))
        dispatch(receiveSubjects(subjects))
      })
  }
}

