// test dummy data
let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Calculus: {
    title: 'Calculus',
    questions: [
      {
        question: 'How many types of Calculus are there?',
        answer: 'Mainly two, differential & Integral.'
      }
    ]
  },
  Geometry: {
    title: 'Geometry',
    questions: [
      {
        question: 'How many Geometry dimensions exist?',
        answer: 'Mainly three, 1D, 2D & 3D.'
      }
    ]
  }
}

//
let subjects = {
  cs: {
    id: 'cs',
    name: 'Computer Science',
    decks: ['React', 'JavaScript']
  },
  math: {
    id: 'math',
    name: 'Mathematics',
    decks: ['Calculus', 'Geometry']
  }
}

//
export function _getDecks () {

  //return decks
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, {...decks})
  })
}

//
export function _getSubjects () {

  //return decks
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, {...subjects})
  })
}

