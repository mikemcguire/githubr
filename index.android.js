/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import Search from './app/components/Search.js'
import Webview from './app/components/Webview.js'
import {
  Navigator,
  AppRegistry,
  BackAndroid
} from 'react-native';

var _navigator; //keeps track of app navigation

class Githubr extends Component {

  render() {
    return (
      //simple router
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'search' }}
        renderScene={ this.renderScene } />
    )
  }

  //router logic
  renderScene ( route, navigator ) {
    _navigator = navigator;
    if (route.name === 'search') {
        return ( <Search navigator={navigator} /> )
    } else if(route.name === 'webview'){
      return (
        <Webview
          navigator={navigator}
          url={route.url} /> )
    }
  }


}

//this handles our back button for us
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false
  }
  _navigator.pop()
  return true
})


AppRegistry.registerComponent('Githubr', () => Githubr)
