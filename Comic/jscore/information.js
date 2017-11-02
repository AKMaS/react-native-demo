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
  View,
  Button,
  ScrollView,
} from 'react-native';


export default class Information extends Component {
  static navigationOptions = {
    tabBarLabel: '资讯',
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/selected/information_selected.png')}
        /> :
        <Image
          source={require('../imgs/icon/tabicon/normal/information_normal.png')}
          resizeMode='center' />

    ),
  }
  render() {
  
    return (
      <ScrollView>
        <Text>资讯</Text>
        <Button onPress={() => {
          this.props.navigation.navigate('MoreItems')
        }}
          title="Open Drawer" /></ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  tabicon: {
    width: 60,
    height: 60,
  },
});
