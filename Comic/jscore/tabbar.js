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
  View,
  Dimensions,
  Image,
} from 'react-native';

import HomePage from './homepage';
import BookSheet from './booksheet';
import Informaiton from './information';
import Mine from './mine';
import { TabNavigator } from 'react-navigation';

const { width, height } = Dimensions.get('window');

export default Tab = TabNavigator({

  Home: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ focused }) => (
        focused ?
          <Image
            resizeMode='center'
            source={require('../imgs/icon/tabicon/selected/home_selected.png')}
          /> :
          <Image
            resizeMode='center'
            source={require('../imgs/icon/tabicon/normal/home_normal.png')}
          />
      ),
    },
  },
  BookSheet: {
    screen: BookSheet,
  },
  Informaiton: {
    screen: Informaiton,
  },
  Mine: {
    screen: Mine,
  },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      iconStyle: { height: 30, width: 30 },
      scrollEnabled: false,
      style: { width: width, backgroundColor: 'white' },
      labelStyle: { color: 'black', fontSize: 10, marginBottom: -2 },
      indicatorStyle: {
        height: 0
      },
    },
  });

