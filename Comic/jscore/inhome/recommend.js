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
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux'
import CustomImg from './customview/customImg';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';
import fetchdataactions from '../redux/action/fetchdataactions';

const TestMoreDataUrl = 'https://akmas.github.io/comic/fakedata/fakedata2.json';
class Recommend extends Component {
  static navigationOptions = {
    tabBarLabel: '推荐',
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   moreData: [],
    //   loading: '0',
    // };
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchWrongData() {

  }

  _fetchMoreData() {
    ToastAndroid.show('再也没有更多啦', ToastAndroid.SHORT);
  }

  _fetchData() {
    const { fetchListData } = fetchdataactions
    this.props.dispatch(fetchListData(TestMoreDataUrl, 'RECOMMEND'))
  }

  //经有Redux重构
  render() {
    if (this.props.status === '' || this.props.status === '0') {
      return (<CustomLoadingView />)
    } else if (this.props.status === '1') {
      const { data } = this.props;
      return (
        <FlatList
          renderItem={({ item }) => this._renderItem(item)}
          data={data}
          onEndReached={() => this._fetchMoreData()}
          onEndReachedThreshold={0.1}
          refreshing={false}
          onRefresh={() => this._OnRefresh()}
          keyExtractor={(item) => item.id} />
      )
    } else if (this.props.status === '-1') {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text>{this.props.data}</Text>
          <CustomReLoad
            onClick={() => { this._fetchData(); }} />
        </View>
      )
    }
  }


  /**2018.1.18封印*/
  // render() {
  //   console.log(this.props);
  //   if (this.state.loading === '0') {
  //     return (<CustomLoadingView />)
  //   } else if (this.state.loading === '1') {
  //     return (
  //       <FlatList
  //         renderItem={({ item }) => this._renderItem(item)}
  //         data={this.state.moreData}
  //         extraData={this.state.headerData}
  //         onEndReached={() => this._fetchMoreData()}
  //         onEndReachedThreshold={0.1}
  //         refreshing={false}
  //         onRefresh={() => this._OnRefresh()}
  //         keyExtractor={(item) => item.id} />
  //     )
  //   } else if (this.state.loading === '-1') {
  //     return (
  //       <View style={{ justifyContent: 'center' }}>
  //         <CustomReLoad
  //           onClick={() => { this._fetchData(); this.setState({ loading: '0' }) }} />
  //       </View>
  //     )
  //   }
  // }

  _OnRefresh() {
    this._fetchData()
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

function mapStoreToProps(store) {
  return {
    status: store.fetch.recommendPage.status,
    data: store.fetch.recommendPage.data,
  }
}

export default connect(mapStoreToProps)(Recommend);


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
