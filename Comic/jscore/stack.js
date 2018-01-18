/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Mine from './mine'
import MyTab from './tabbar';
import MoreItems from './inhome/moreitems';
import Prime from './inhome/prime';
import Info from './information';
import Rank from './inhome/ranking';
import Recommend from './inhome/recommend';
import BookSheet from './booksheet';
import InfoDetailPage from './detail/infodetailpage';
import ComicDetailPage from './detail/comicdetailpage';
import ComicReadPage from './detail/comicreadpage';
import codePush from 'react-native-code-push';
import home from './homepage';
import { connect } from 'react-redux';

const MyStack = StackNavigator({
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
  InfoDetail: { screen: InfoDetailPage },
  ComicDetail: { screen: ComicDetailPage },
  ComicRead: { screen: ComicReadPage, navigationOptions: { header: null } },
  Mine: { screen: Mine, navigationOptions: { header: null }, },
  // BookSheet:{ screen: BookSheet, navigationOptions: { header: null }, },
}, {
    headerMode: 'screen',
  });

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
MyStack = codePush(codePushOptions)(MyStack);


export default MyStack;



