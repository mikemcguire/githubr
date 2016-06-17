/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  ProgressBarAndroid,
  ListView,
  Image,
  Text,
  View,
  TouchableOpacity,
  RecyclerViewBackedScrollView
} from 'react-native';

export default class Search extends Component {

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
      page:0,
      progress:0,
      loading:0,
      repositoriesRaw: [],
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
        <View style={styles.resultsInfo}>
          <Text>Total Results Found: </Text>
          <Text>{this.state.totalCount}</Text>
          <ProgressBarAndroid
           style={[styles.loadingIndicator,{opacity: this.state.loading}]}
           progress={1}
           styleAttr="Small" />
        </View>

        <ListView
            dataSource={this.state.repositories}
            renderRow={(rowData) => this.renderRow(rowData)}
            onEndReached={(event)=> this.handleEndReached(event)}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          />
      </View>
    );
  }

  //row
  renderRow(rowData){
    return (
      <TouchableOpacity onPress={this.handleRowClick.bind(this, rowData.html_url)} style={styles.row}>
        <View style={styles.rowUser}>
          <Image source={{uri: rowData.owner.avatar_url}}
          style={styles.rowImage} />
          <Text>{rowData.owner.login}</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.rowTitle}>{rowData.name}</Text>
          <Text style={styles.rowDescription}>{rowData.description}</Text>
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
      this.inputDelay = setTimeout(()=>{

        //show our loading indicator
        this.setState({loading:1})

        //search for our repos
        this.search(text)
      }, 750)
  }

  //opens repo in webview
  handleRowClick(url) {
    this.openRepository(url)
  }

  //paginate on scroll
  handleEndReached(event){

    //show our loading indicator
    this.setState({loading:1})

    //get our results
    this.paginate()
  }


  /**
  Logic
  */
  //fetches results from github
  search(text){
    let query = encodeURIComponent(text);

    //fetch our results
    fetch('https://api.github.com/search/repositories?q='+query+'&sort=stars&order=desc')
    .then((response) => response.text())
    .then((responseText) => {

      //convert to json
      responseText = JSON.parse(responseText)

      //set our new state
      this.setState({
        loading:0,
        query:query,
        page:1,
        totalCount: responseText.total_count,
        repositoriesRaw: responseText.items,
        repositories: this.repoDataSource.cloneWithRows(responseText.items)
      })

    })
    .catch((error) => {
      console.warn(error)
    })
  }

  //paginate fetch merges existing data set with new one
  paginate(){

    let page = this.state.page + 1

    //fetch results
    fetch('https://api.github.com/search/repositories?q='+this.state.query+'&sort=stars&order=desc&page=' + page)
    .then((response) => response.text())
    .then((responseText) => {

      //convert to json
      responseText = JSON.parse(responseText)

      //combine our previous results with our new onPress
      let repositories = this.state.repositoriesRaw.concat(responseText.items)

      //set our new state
      this.setState({
        page:page,
        loading:0,
        query:this.state.query,
        repositoriesRaw: repositories,
        repositories: this.repoDataSource.cloneWithRows(repositories)
      })

    })
    .catch((error) => {
      console.warn(error)
    })
  }
  //naigate to a webvirew
  openRepository(url){
    this.props.navigator.push({
        name: 'webview',
        url: url
      })
  }
}



let styles = StyleSheet.create({
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
  resultsInfo: {
    backgroundColor:"#ffffff",
    paddingTop:10,
    paddingBottom:10,
    paddingRight:20,
    paddingLeft:20,
    flexDirection: "row"
  },
  loadingIndicator:{
    position:"absolute",
    right:20,
    width:20,
    height:20,
    margin:0,
    padding:0
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
    justifyContent: "flex-start",
    paddingBottom: 20
  },
  rowLanguae: {
    position: "absolute",
    bottom:20,
    right:20,
    fontWeight:"bold"
  },

})
