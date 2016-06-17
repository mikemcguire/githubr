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
  Text,
  View
} from 'react-native';

class Githubr extends Component {

  onChange = (state) => {
    this.setState(state);
  }

  constructor() {
    super();

    //initalize our listview data source
     this.repoDataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2
     });

    //initialize state
    this.state = {
      repositories:this.repoDataSource.cloneWithRows([{}])
    }

  }

  //handles text change on searchInput
  handleChangeText(text) {
    this.search(text);
  }

  //fetches results from github
  search(text){
    let query = encodeURIComponent(text);
    fetch('https://api.github.com/search/repositories?q='+query+'&sort=stars&order=desc')
    .then((response) => response.text())
    .then((responseText) => {
      //convert to json
      responseText = JSON.parse(responseText);

      //set our new state
      this.setState({
        repositories: this.repoDataSource.cloneWithRows(responseText.items)
      })

    })
    .catch((error) => {
      console.warn(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type here to search for repositories"
          onChange={(event) => this.handleChangeText( event.nativeEvent.text)}
          />
        <ListView
            dataSource={this.state.repositories}
            renderRow={(rowData) => this.renderRow(rowData)}
          />

      </View>
    );
  }

  renderRow(rowData){
    return (
      <View style={styles.row}>
        <Text>{rowData.name}</Text>
        <Text>{rowData.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bce02c',
  },
  searchInput: {
      backgroundColor:'#6fbece',
      height:75,
      padding:20
  },
  row: {
    margin:20,
    padding:20,
    marginBottom: 0,
    backgroundColor:"#ffffff"
  }
});

AppRegistry.registerComponent('Githubr', () => Githubr);
