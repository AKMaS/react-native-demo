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
  Dimensions
} from 'react-native';
import CustomImg from './customview/customImg';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';

const TestMoreDataUrl = 'https://akmas.github.io/comic/fakedata/fakedata2.json';
export default class Rank extends Component {
  static navigationOptions = {
    tabBarLabel: '排行榜',
  }

  constructor(props) {
    super(props);
    this.state = {
      headerData: [],
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
        let [no1, no2, no3] = data;
        let [r1, r2, r3, ...restdata] = data;
        this.setState({
          headerData: [no1, no2, no3],
          moreData: this.state.moreData.concat(restdata),
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
          ListHeaderComponent={() => this._renderHeader()}
          data={this.state.moreData}
          extraData={this.state.headerData}
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

  _renderHeader() {
    let [no1, no2, no3] = this.state.headerData;
    if (no1 === undefined) {
      return <View></View>
    } else {
      return (
        //最外层
        <View style={{ margin: 5, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#ffffff' }}>
          <View style={{ flex: 1, alignItems: 'center', }}>
            <Text style={{ color: '#ffab64', fontSize: 16, fontWeight: '900', }}>NO.2</Text>
            <CustomImg img={{ uri: no2.icon }} style={{ height: 150, width: 120 }} />
            <Text style={{ fontSize: 12 }}>{no2.name}</Text>
          </View>
          {/*每个条目 */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: '#ff7370', fontSize: 16, fontWeight: '900', }}>NO.1</Text>
            <CustomImg img={{ uri: no1.icon }} style={{ height: 200, width: 120 }} />
            <Text style={{ fontSize: 12 }}>{no1.name}</Text>
          </View>
          {/*每个条目 */}

          {/*每个条目 */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: '#ffd500', fontSize: 16, fontWeight: '900', }}>NO.3</Text>
            <CustomImg img={{ uri: no3.icon }} style={{ height: 130, width: 120 }} />
            <Text style={{ fontSize: 12 }}>{no3.name}</Text>
          </View>
        </View>
      );
    }

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
