/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';
import CustomImg from './customview/customImg';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';

const TestMoreDataUrl = 'https://akmas.github.io/comic/fakedata/fakedata2.json';
export default class Recommend extends Component {
  static navigationOptions = {
    tabBarLabel: '推荐',
  }

  constructor(props) {
    super(props);
    this.state = {
      moreData: [],
      loading: '0',
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchWrongData() {
    this.setState({ loading: '-1' });
  }

  _fetchData() {
    fetch(TestMoreDataUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('detchdata');
        console.log(data);
        this.setState({
          moreData: this.state.moreData.concat(data),
          loading: '1',
        })
      }
      ).catch(e => this.setState({ loading: '-1' }))
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

  _OnRefresh() {
    this.setState({
      moreData: [],
    })

    this.timer = setTimeout(() => {
      this._fetchData()
    }, 500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _renderItem(item) {
    return (
      // holder
      <View style={styles.comicHolder}>
        <CustomImg params={{
          style: styles.comicIcon, img: { uri: item.icon },
          navigation: this.props.navigation, id: item.id
        }} />
        {/* 文字区域 */}
        <View style={{ flex: 1, marginLeft: 2 }}>
          <Text style={{ color: 'black' }}>{item.name}</Text>
          <View style={styles.comicTextHolder}>
            <Text style={[styles.comicTextAuthor, { color: 'black' }]}>作者:</Text>
            <Text style={styles.comicTextAuthor}>{item.author}</Text>
          </View>
          <View style={styles.comicTextHolder}>
            <Text style={[styles.comicTextAuthor, { color: 'black' }]}>简介:</Text>
            <Text style={[styles.comicTextAuthor, { flex: 1 }]} numberOfLines={4}>{item.introduction}</Text>
          </View>
          <View style={styles.comicTextHolder}>
            <Text style={[styles.comicTextAuthor, { color: 'black' }]}>更新状态:</Text>
            <Text style={styles.comicTextAuthor}>{item.state}</Text>
          </View>
        </View>
      </View >
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  comicHolder: {
    margin: 5,
    flexDirection: 'row',
    height: 200,
    backgroundColor: '#ffffff',
  },
  comicTextHolder: {
    flexDirection: 'row',
  },
  comicIcon: {
    width: 120,
    height: 200,
  },
  comicTextAuthor: {
    fontSize: 12,
  },
});
