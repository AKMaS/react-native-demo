/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import CustomLoadingView from './inhome/customview/customLoadingview'
import CustomReLoad from './inhome/customview/customReLoad';

var page = 1;
export default class Information extends Component {
  static navigationOptions = {
    tabBarLabel: '资讯',
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/selected/information_selected.png')}
        /> :
        <Image
          source={require('../imgs/icon/tabicon/normal/information_normal.png')}
          resizeMode='center' />
    ),
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: '0',
      moreData: [],
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    let infromationUrl = `http://a121.baopiqi.com/api/mh/getConsultation.php?page=${page}&limit=10&`;
    fetch(infromationUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          moreData: this.state.moreData.concat(data),
          loading: '1',
        })
      }).catch(e => {
        this.setState({ loading: '-1' })
      })
  }

  _fetchMoreData() {
    page++;
    this._fetchData();
  }

  _renderItem(item) {

    return (
      // holder
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.itemHolder}
        onPress={() => this.props.navigation.navigate('InfoDetail', { title: item.title,id:item.id })}
      >
        <Image style={{ width: 100, height: 100, }}
          source={{ uri: item.cover }} />
        <View style={{ flex: 1, marginLeft: 5, justifyContent: 'space-around' }} >
          <Text style={{ fontSize: 14, color: 'black' }}>{item.title}</Text>
          <View style={{ flexDirection: 'row', marginTop: 3 }}>
            <Text style={{ fontSize: 8, color: 'white', backgroundColor: 'red' }}>{item.newstype_content}</Text>
            <Text style={{ fontSize: 8 }}>{item.newsauthor_content}</Text>
          </View>
        </View>
      </TouchableOpacity >
    );
  }

  _OnRefresh() {
    this.setState({
      loading: '0'
    });
    this._fetchData();
  }

  render() {
    if (this.state.loading === '0') {
      return (<CustomLoadingView />)
    } else if (this.state.loading === '1') {
      return (
        <FlatList
          renderItem={({ item }) => this._renderItem(item)}
          data={this.state.moreData}
          extraData={this.state.headerData}
          onEndReached={() => this._fetchMoreData()}
          onEndReachedThreshold={0.1}
          refreshing={false}
          onRefresh={() => this._OnRefresh()}
          keyExtractor={(item) => item.id} />
      )
    } else if (this.state.loading === '-1') {
      return (
        <View style={{ justifyContent: 'center' }}>
          <CustomReLoad
            onClick={() => { this._fetchData(); this.setState({ loading: '0' }) }} />
        </View>
      )
    }
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  itemHolder: {
    flexDirection: 'row',
    height: 100,
    width: width,
    margin: 5,
    backgroundColor: '#ffffff',
  },
});