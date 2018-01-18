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
import { connect } from 'react-redux';

import DayListView from './customview/customlist';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';
import fetchdataactions from '../redux/action/fetchdataactions';

const TestMoreDataUrl = 'https://akmas.github.io/comic/fakedata/fakedata2.json';
class VIP extends Component {
  static navigationOptions = {
    tabBarLabel: 'vip',
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
    // fetch(TestMoreDataUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //vip1
    //     let [v1, v2, v3, v4, v5, v6] = data;
    //     [v1, v2, v3, v4, v5, v6, ...kickVip1] = data;
    //     //vip2
    //     let [va, vb, vc, vd, ve, vf] = kickVip1;
    //     [va, vb, vc, vd, ve, vf, ...kickVip2] = kickVip1;
    //     //vip3
    //     let [vg, vh, vi, vj, vk, vl] = kickVip2;
    //     this.setState({
    //       moreDataVip1: [v1, v2, v3, v4, v5, v6],
    //       moreDataVip2: [va, vb, vc, vd, ve, vf],
    //       moreDataVip3: [vg, vh, vi, vj, vk, vl],
    //       loading: '1',
    //     })
    //   }
    //   ).catch(e => this.setState({ loading: '-1' }))
    const { fetchListData } = fetchdataactions
    this.props.dispatch(fetchListData(TestMoreDataUrl, 'VIP'))
  }
  render() {
    if (this.props.status === '0' || this.props.status === '') {
      return (<CustomLoadingView />)
    } else if (this.props.status === '1') {
      let moreDataVip1 = this.props.data.slice(0, 6)
      let moreDataVip2 = this.props.data.slice(6, 12)
      let moreDataVip3 = this.props.data.slice(12, 18)
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <DayListView dayTitle='VIP王牌' dayData={moreDataVip1} navigation={this.props.navigation} />
          <DayListView dayTitle='VIP热卖' dayData={moreDataVip2} navigation={this.props.navigation} />
          <DayListView dayTitle='VIP推荐' dayData={moreDataVip3} navigation={this.props.navigation} />
        </ScrollView>
      );
    } else if (this.props.status === '-1') {
      return (
        <View style={{ justifyContent: 'center' }}>
          <CustomReLoad
            onClick={() => { this._fetchData(); }} />
        </View>
      )
    }
  }
  /**2018.1.18封印 */
  // render() {
  //   if (this.state.loading === '0') {
  //     return (<CustomLoadingView />)
  //   } else if (this.state.loading === '1') {
  //     return (
  //       <ScrollView showsVerticalScrollIndicator={false}>
  //         <DayListView dayTitle='VIP王牌' dayData={this.state.moreDataVip1} navigation={this.props.navigation} />
  //         <DayListView dayTitle='VIP热卖' dayData={this.state.moreDataVip2} navigation={this.props.navigation} />
  //         <DayListView dayTitle='VIP推荐' dayData={this.state.moreDataVip3} navigation={this.props.navigation} />
  //       </ScrollView>
  //     );
  //   } else if (this.state.loading === '-1') {
  //     return (
  //       <View style={{ justifyContent: 'center' }}>
  //         <CustomReLoad
  //           onClick={() => { this._fetchData(); this.setState({ loading: '0' }) }} />
  //       </View>
  //     )
  //   }
  // }
}
function mapStoreToProps(store) {
  return {
    status: store.fetch.vipPage.status,
    data: store.fetch.vipPage.data,
  }
}

export default connect(mapStoreToProps)(VIP);


