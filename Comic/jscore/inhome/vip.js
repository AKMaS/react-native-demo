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
  ScrollView,
} from 'react-native';
import DayListView from './customview/customlist';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';

const TestMoreDataUrl = 'https://akmas.github.io/comic/fakedata/fakedata2.json';
export default class Vip extends Component {
  static navigationOptions = {
    tabBarLabel: 'vip',
  }

  constructor(props) {
    super(props);
    this.state = {
      moreDataVip1: [],
      moreDataVip2: [],
      moreDataVip3: [],
      loading: '0',
    };
  }

  componentDidMount() {
    this._fetchWrongData();
  }

  _fetchWrongData() {
    this.setState({ loading: '-1' });
  }

  _fetchData() {
    fetch(TestMoreDataUrl)
      .then((response) => response.json())
      .then((data) => {
        //vip1
        let [v1, v2, v3, v4, v5, v6] = data;
        [v1, v2, v3, v4, v5, v6, ...kickVip1] = data;
        //vip2
        let [va, vb, vc, vd, ve, vf] = kickVip1;
        [va, vb, vc, vd, ve, vf, ...kickVip2] = kickVip1;
        //vip3
        let [vg, vh, vi, vj, vk, vl] = kickVip2;
        this.setState({
          moreDataVip1: [v1, v2, v3, v4, v5, v6],
          moreDataVip2: [va, vb, vc, vd, ve, vf],
          moreDataVip3: [vg, vh, vi, vj, vk, vl],
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <DayListView dayTitle='VIP王牌' dayData={this.state.moreDataVip1} navigation={this.props.navigation} />
          <DayListView dayTitle='VIP热卖' dayData={this.state.moreDataVip2} navigation={this.props.navigation} />
          <DayListView dayTitle='VIP推荐' dayData={this.state.moreDataVip3} navigation={this.props.navigation} />
        </ScrollView>
      );
    } else if (this.state.loading === '-1') {
      return (
        <View style={{ justifyContent: 'center' }}>
          <CustomReLoad
            onClick={() => { this._fetchData(); this.setState({ loading: '0' }) }} />
        </View>
      )
    }
  }
}

