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
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import CustomImg from './customview/customImg';
// const moreRecommendUrl = 'http://a121.baopiqi.com/api/mh/getCartoonRankingMore.php?type=1&page=1&limit=20';
const TestMoreDataUrl = 'http://localhost:8081/fakedata1.json';
export default class MoreItems extends Component {
  //动态修改更多页面的 导航栏 标题 headerTitle
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Text></Text>,
    headerTitle: navigation.state.params.title,
    headerStyle: {
      elevation: 0,
      height: 50,
      backgroundColor: '#fddb27',
    },
    headerTitleStyle: {
      fontSize: 12,
      fontWeight: '500',
      alignSelf: 'center',
    },
  })

  constructor(props) {
    super(props);
    this.state = {
      moreData: [],
      text: '111',
    };
  }

  componentDidMount() {
    this._fetchMoreData();

  }

  _fetchMoreData() {
    fetch(TestMoreDataUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          moreData: this.state.moreData.concat(data),
        })
      ).catch(e => console.log(e))
  }

  render() {
    return (
      <FlatList
        renderItem={({ item }) => this._renderItem(item)}
        onEndReached={() => this._fetchMoreData()}
        onEndReachedThreshold={0.1}
        refreshing={false}
        onRefresh={() => this._OnRefresh()}
        data={this.state.moreData}
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