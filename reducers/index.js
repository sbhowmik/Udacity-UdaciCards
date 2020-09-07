import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions/'
import { RECEIVE_SUBJECTS, ADD_SUBJECT } from '../actions/'

//
export default combineReducers({
  decks,
  subjects,
  loadingBar: loadingBarReducer
})


//
export function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD :
      return {
        ...state,
        [action.deckName]:{
          ...state[action.deckName],
          questions:state[action.deckName].questions.concat(action.card)
        }
      }
    default :
      return state
  }//switch
}//fn


//
export function subjects (state = {}, action) {
  switch (action.type) {
    case RECEIVE_SUBJECTS :
      return {
        ...state,
        ...action.subjects,
      }
    case ADD_SUBJECT :
      return {
        ...state,
        ...action.subject
      }
    default :
      return state
  }//switch
}//fn


