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
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import DayListView from './customview/customlist';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';

const HomeUrl = 'http://a121.baopiqi.com/api/mh/getCartoonHomePageAll.php?';

export default class Prime extends Component {

  static navigationOptions = {
    tabBarLabel: '精品',
  }
  constructor(props) {
    super(props);

    this.state = {
      visibleSwiper: false,
      //轮播图数据
      daySwiperData: [],
      //每日推荐 每日更新 每日排行数据
      dayRecommendData: [],
      dayNewData: [],
      dayRankingData: [],
      loading: '0',
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
    }, 0);
    this._fetchData();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }


  _fetchWrongData() {
    this.setState({ loading: '-1' });
  }

  _fetchData() {
    fetch(HomeUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          daySwiperData: data.carousel_figure,
          dayRecommendData: data.boutiques.boutique,
          dayNewData: data.news.new,
          dayRankingData: data.rankings.ranking,
          loading: '1',
        })
      }).catch(e => this.setState({ loading: '-1' }));
  }

  render() {
    if (this.state.loading === '0') {
      return (<CustomLoadingView />)
    } else if (this.state.loading === '1') {
      return (
        <View>
          <StatusBar
            backgroundColor='#fddb27' />
          <ScrollView showsVerticalScrollIndicator={false}>
            {this._returnSwiper()}
            {this._returnClassifyView()}
            <DayListView dayTitle='今日推荐' dayData={this.state.dayRecommendData} navigation={this.props.navigation} />
            <DayListView dayTitle='今日最新' dayData={this.state.dayNewData} navigation={this.props.navigation} />
            <DayListView dayTitle='今日热门' dayData={this.state.dayRankingData} navigation={this.props.navigation} />
          </ScrollView>
        </View>
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
  //分类
  _returnClassifyView() {
    return (
      //外部横向布局
      <View style={styles.horizontal} >
        <Image
          style={styles.classifyImg}
          source={require('../../imgs//icon/horizontal/group1.png')} />
        <Image
          style={styles.classifyImg}
          source={require('../../imgs//icon/horizontal/group2.png')} />
        <Image
          style={styles.classifyImg}
          source={require('../../imgs//icon/horizontal/group3.png')} />
        <Image
          style={styles.classifyImg}
          source={require('../../imgs//icon/horizontal/group4.png')} />
      </View>
    );
  }
  // 如何在嵌套的reactnavigation中使用 react-native-swiper：
  // https://github.com/react-community/react-navigation/issues/1572
  _returnSwiper() {
    if (this.state.visibleSwiper) {
      var views = this.state.daySwiperData.map((item, i) =>
        <Image
          key={i}
          resizeMode='cover'
          source={{ uri: item.icon }}
          style={{ width: 500, height: 400 }}
        />
      )
      return (
        <View style={{ height: height / 3 }}>
          <Swiper
            dotColor={'white'}
            activeDotColor={'#FF0A0A'}
            autoplay={true}
            horizontal={true}
            loop={true}
            bounces={true}
            removeClippedSubviews={false}>
            {views}
          </Swiper>
        </View>
      )
    } else {
      return (<View></View>);
    }
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  horizontal: {
    width: width,
    backgroundColor: '#ffffffff',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  classifyImg: {
    width: 80,
    height: 80,
  },
});


