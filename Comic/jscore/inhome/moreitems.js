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
import CustomLoadingView from './customview/customLoadingview';
import CustomReLoad from './customview/customReLoad';
// const moreRecommendUrl = 'http://a121.baopiqi.com/api/mh/getCartoonRankingMore.php?type=1&page=1&limit=20';
const TestMoreDataUrl = 'https://akmas.github.io/comic/fakedata/fakedata1.json';

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
      loading: '1',
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchWrongData() {
    this.setState({ loading: '-1' });
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _fetchData() {
    fetch(TestMoreDataUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          moreData: this.state.moreData.concat(data),
          loading: '1',
        })
      ).catch(e => this.setState({ loading: '-1' }))
  }

  render() {
    if (this.state.loading === '0') {
      return (<CustomLoadingView />)
    } else if (this.state.loading === '1') {
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