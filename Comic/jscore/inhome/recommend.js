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

const TestMoreDataUrl = 'http://localhost:8081/fakedata2.json';
export default class Recommend extends Component {
  static navigationOptions = {
    tabBarLabel: '推荐',
  }

  constructor(props) {
    super(props);
    this.state = {
      moreData: [],
    };
  }

  componentDidMount() {
    this._fetchMoreData();
  }

  _fetchMoreData() {
    fetch(TestMoreDataUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          moreData: this.state.moreData.concat(data),
        })
      }
      ).catch(e => console.log(e))
  }

  render() {
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
  }

  _OnRefresh() {
    this.setState({
      moreData: [],
    })

    setTimeout(() => {
      this._fetchMoreData()
    }, 500);
  }

  _renderItem(item) {
    console.log(item.icon);

    return (
      // holder
      <View style={styles.comicHolder}>

        <CustomImg style={styles.comicIcon} img={{ uri: item.icon }} />
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
