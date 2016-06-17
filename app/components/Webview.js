/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToolbarAndroid,
  WebView
} from 'react-native'

export default class Search extends Component {

  onChange = (state) => {
    this.setState(state)
  }

  constructor() {
    super()
  }

  //layout
  render(){
    return (
      <View style={styles.webViewParent}>
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.props.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />
      </View>
    )+
  }

}
let styles = StyleSheet.create({
  webViewParent:{
    flexDirection:"column",
    alignItems:"stretch",
    backgroundColor:"#ffffff",
    flex:1,
  },
  toolbar: {
    height:50,
    backgroundColor:"#000000"
  },
  webView: {
    flex:1,
    bottom:0,
    padding:20
  }
})
