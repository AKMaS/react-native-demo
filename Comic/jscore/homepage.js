/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  backHan,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Prime from './inhome/prime';
import Ranking from './inhome/ranking';
import Vip from './inhome/vip';
import Recommend from './inhome/recommend';

const TabInHome = TabNavigator({
  PrimeTab: {
    screen: Prime,
  },
  RankingTab: {
    screen: Ranking,
  },
  RecommendTab: {
    screen: Recommend,
  },
  VipTab: {
    screen: Vip,
  }
}, {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      scrollEnabled: false,
      style: { backgroundColor: '#fddb27' },
      labelStyle: { color: 'black', fontSize: 10, marginBottom: -2 },
      indicatorStyle: {
        height: 1,
        backgroundColor:'red'
      },
    },
  });


export default TabInHome;
// class Tab extends Component {

//   render() {

//     return (
//       <TabInHome />);
//   }
// }

// export default Tab;