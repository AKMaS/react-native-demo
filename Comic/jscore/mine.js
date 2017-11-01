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

} from 'react-native';
import Swiper from 'react-native-swiper';

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

    };
  }
  render() {


    return (
      <View style={{ width: 500, height: 500 }}>

      </View >

    );
  }


}
