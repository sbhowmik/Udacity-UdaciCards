import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
///
import reducer from './reducers'
import middleware from './middleware'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//
import DeckList from './components/DeckList'
import DeckAdd from './components/DeckAdd'
import DeckDetail from './components/DeckDetail'
import CardAdd from './components/CardAdd'
import CardQuiz from './components/CardQuiz'
//
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
//
import { purple, white } from './utils/colors'
import Constants from 'expo-constants';
//
import { handleInitialData } from './actions/'
import { setLocalNotification } from './utils/helpers'

//
const store = createStore(reducer, middleware)


//
function UdaciStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

//config for Tab Navigation Routes
const TabInfos = {
  DeckList:{
    component: DeckList,
    name: "DeckList",
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'Decks'}
  }, 
  DeckAdd:{
    component: DeckAdd,
    name: "DeckAdd",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'AddDeck'}
  }
}

//Tab Navigator Config
const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

//for android
const Tab = createMaterialTopTabNavigator()

//
const TabNav = () =>(
  <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...TabInfos['DeckList']} />
      <Tab.Screen {...TabInfos['DeckAdd']} />
  </Tab.Navigator>
)

//STACK NAVIGATOR
// Config for Stack Navigator
const StackNavigatorConfig = {
  headerMode: "screen"
}

//config for stack routes
const StackConfig = {
  TabNav:{
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  }, 
  DeckDetail:{
    name: "DeckDetail",
    component: DeckDetail,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      title: "Deck Detail"
    }
  },
  CardAdd:{
    name: "CardAdd",
    component: CardAdd,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      title: "Card Add"
    }
  },
  CardQuiz:{
    name: "CardQuiz",
    component: CardQuiz,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      title: "Card Quiz"
    }
  }
}

//create the Stack Navigator..
const Stack = createStackNavigator()

//MainNav component...stack comprised of the Tab and a details screen
const MainNav = () =>(
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckDetail']} />
    <Stack.Screen {...StackConfig['CardAdd']} />
    <Stack.Screen {...StackConfig['CardQuiz']} />
  </Stack.Navigator>
)

//Main App Component
export default class App extends React.Component {
  
    //
    state = {
      ready: false
    }
  
  //
  componentDidMount() {

    //const { dispatch } = this.props
    let ready = this.state.ready


    if(ready === false) {
      store.dispatch(handleInitialData())
      this.setState(() => ({ready: true}))
    }

    //set local notification
    setLocalNotification()
}

  //
  render() {

    //
    const { ready } = this.state


    return (
      <Provider store={store}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
        <NavigationContainer>
        <MainNav />
        </NavigationContainer>
      </Provider>
    )
  }

}//class