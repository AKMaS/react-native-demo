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
  View, FlatList,
  BackHandler,
  ToastAndroid,
  NetInfo,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CustomLoadingView from './inhome/customview/customLoadingview'

const HomeUrl = 'http://a121.baopiqi.com/api/mh/getCartoonHomePageAll.php?';
export default class Mine extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/selected/mine_selected.png')}
        /> :
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/normal/mine_normal.png')}
        />
    ),
  }

  constructor(props) {
    super(props);
    this.state = {
      daySwiperData: [],
      loading: true,
      isConnected: null,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ loading: false })
    },
      3000);
    //检测网络是否连接
    NetInfo.isConnected.fetch().done((isConnected) => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });
  }


  render() {

    return (
      <CustomLoadingView
        animating={this.state.loading} />
    );
  }
}
