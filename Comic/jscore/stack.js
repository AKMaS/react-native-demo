/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MyTab from './tabbar';
import MoreItems from './inhome/moreitems';
import Prime from './inhome/prime';
import Info from './information';
import Rank from './inhome/ranking';
import Recommend from './inhome/recommend';

export default MyStack = StackNavigator({
  // 对应界面名称
  TabBar: {
    screen: MyTab,
    navigationOptions: {
      header: null,
    },
  },
  MoreItems: {
    screen: MoreItems,
  },
  Prime: {
    screen: Prime,
    
  },
  Rank: { screen: Rank },
  Recommend: { screen: Recommend },

}, {
    headerMode: 'screen',
  });
