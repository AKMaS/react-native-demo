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
  View
} from 'react-native';


export default class BookSheet extends Component {
  static navigationOptions = {
    tabBarLabel: '书架',
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/selected/booksheet_selected.png')}
        /> :
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/normal/booksheet_normal.png')}
        />

    ),
  }


  render() {
    return (
      <CustomImage />
    );
  }
}
export class CustomImage extends Component {

  render() {
    return (
      <Image
        style={{ width: 200, height: 100 }}
        source={require('/Users/king/Documents/workspace/reactnative/Comic/imgs/icon/ic_empty.png')}>
        <Image
          style={{ width: 200, height: 100 }}
          source={{ uri: 'http://img3.tebiekandian.com/imgv/11e47449f6b52d48908a498a62abafea.jpg' }} />
      </Image>
    );
  }
}


const styles = StyleSheet.create({
  tabicon: {
    width: 60,
    height: 60,
  },
});
