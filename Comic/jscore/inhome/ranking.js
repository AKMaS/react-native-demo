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

import { connect } from 'react-redux';

import fetchdataactions from '../redux/action/fetchdataactions';
import CustomImg from './customview/customImg';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';

const TestMoreDataUrl = 'https://akmas.github.io/comic/fakedata/fakedata2.json';
class Rank extends Component {
  static navigationOptions = {
    tabBarLabel: '排行榜',
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchWrongData() {
  }

  _fetchData() {
    const { fetchListData } = fetchdataactions
    this.props.dispatch(fetchListData(TestMoreDataUrl, 'RANK'))
  }
  render() {
    if (this.props.status === '0') {
      return (<CustomLoadingView />)
    } else if (this.props.status === '1') {
      const [no1, no2, no3] = this.props.data;
      let [r1, r2, r3, ...restdata] = this.props.data;

      const headerData = [no1, no2, no3];

      return (
        <FlatList
          renderItem={({ item }) => this._renderItem(item)}
          ListHeaderComponent={() => this._renderHeader()}
          data={restdata}
          extraData={headerData}
          keyExtractor={(item) => item.id} />
      )
    } else if (this.props.status === '-1') {
      return (
        <View style={{ justifyContent: 'center' }}>
          <CustomReLoad
            onClick={() => this._fetchData()} />
        </View>
      )
    }
    return (<CustomLoadingView />)
  }

  _renderHeader() {
    const [no1, no2, no3] = this.props.data;
    if (false) {
      return <View></View>
    } else {
      return (
        //最外层
        <View style={{ margin: 5, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#ffffff' }}>
          <View style={{ flex: 1, alignItems: 'center', }}>
            <Text style={{ color: '#ffab64', fontSize: 16, fontWeight: '900', }}>NO.2</Text>
            <CustomImg params={{
              img: { uri: no2.icon }, style: { height: 150, width: 120 }
              , navigation: this.props.navigation, id: no2.id
            }} />
            <Text style={{ fontSize: 12 }} numberOfLines={1}>{no2.name}</Text>
          </View>
          {/*每个条目 */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: '#ff7370', fontSize: 16, fontWeight: '900', }}>NO.1</Text>

            <CustomImg params={{
              img: { uri: no1.icon }, style: { height: 200, width: 120 },
              navigation: this.props.navigation, id: no1.id
            }} />
            <Text style={{ fontSize: 12 }}>{no1.name}</Text>
          </View>
          {/*每个条目 */}

          {/*每个条目 */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: '#ffd500', fontSize: 16, fontWeight: '900', }}>NO.3</Text>
            <CustomImg params={{
              img: { uri: no3.icon }, style: { height: 130, width: 120 }
              , navigation: this.props.navigation, id: no3.id
            }} />
            <Text style={{ fontSize: 12 }}>{no3.name}</Text>
          </View>
        </View>
      );
    }

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
    status: store.fetch.rankPage.status,
    data: store.fetch.rankPage.data,
  }
}

export default connect(mapStoreToProps)(Rank);


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
