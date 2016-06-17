/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  ListView,
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class Githubr extends Component {

  onChange = (state) => {
    this.setState(state);
  }

  constructor() {
    super();

    //an input delay for our texti nput
    this.inputDelay

    //initalize our listview data source
     this.repoDataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2
     });

    //initialize state
    this.state = {
      repositories:this.repoDataSource.cloneWithRows([])
    }

  }

  /**
  Layouts
  */
  //search
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type here to search for repositories"
          placeholderTextColor="#ffffff"
          onChange={(event) => this.handleChangeText( event.nativeEvent.text)}
          />
        <ListView
            dataSource={this.state.repositories}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
      </View>
    );
  }

  //row
  renderRow(rowData){
    return (
      <TouchableOpacity onPress={this.handleRowClick.bind(this)} style={styles.row}>
        <View style={styles.rowUser}>
          <Image source={{uri: rowData.owner.avatar_url}}
          style={styles.rowImage} />
          <Text>{rowData.owner.login}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowTitle}>{rowData.name}</Text>
          <Text>{rowData.description}</Text>
        </View>
        <Text style={styles.rowLanguae}>{rowData.language}</Text>
      </TouchableOpacity>
    )
  }

  /**
  Events
  */
  //searches after user has stopped typing for so long
  handleChangeText(text) {
      clearTimeout(this.inputDelay)
      this.inputDelay = setTimeout(()=>{ this.search(text) }, 750)
  }

  //opens repo in webview
  handleRowClick() {
    alert('Open Webview');
  }


  /**
  Logic
  */
  //fetches results from github
  search(text){
    let query = encodeURIComponent(text);
    fetch('https://api.github.com/search/repositories?q='+query+'&sort=stars&order=desc')
    .then((response) => response.text())
    .then((responseText) => {

      //convert to json
      responseText = JSON.parse(responseText)

      //set our new state
      this.setState({
        repositories: this.repoDataSource.cloneWithRows(responseText.items)
      })

    })
    .catch((error) => {
      console.warn(error);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bce02c',
  },
  searchInput: {
      backgroundColor:'#6fbece',
      color:"#ffffff",
      fontSize:18,
      height:75,
      padding:20
  },
  row: {
    flexDirection:'row',
    flexWrap: 'wrap',
    margin:20,
    padding:20,
    marginBottom: 0,
    backgroundColor:"#ffffff"
  },
  rowImage: {
    height:75,
    width:75
  },
  rowTitle: {
    fontSize:18,
    fontWeight:"bold"
  },
  rowUser:{
    flex:1
  },
  rowInfo:{
    flex:2,
    justifyContent: "flex-start"
  },
  rowLanguae: {
    position: "absolute",
    bottom:20,
    right:20,
    fontWeight:"bold"
  }
});

AppRegistry.registerComponent('Githubr', () => Githubr)
