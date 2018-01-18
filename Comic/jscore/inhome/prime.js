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
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import DayListView from './customview/customlist';
import CustomLoadingView from './customview/customLoadingview'
import CustomReLoad from './customview/customReLoad';
import fetchdataactions from '../redux/action/fetchdataactions';
import CodePush from 'react-native-code-push';
const HomeUrl = 'http://a121.baopiqi.com/api/mh/getCartoonHomePageAll.php?';
import JPushModule from 'jpush-react-native';
import { connect } from 'react-redux';
class Prime extends Component {

  static navigationOptions = {
    tabBarLabel: '精品',
    
    swipeEnabled: true,
  }
  constructor(props) {
    super(props);
  }
  // CodePush 
  _checkOut() {
    //访问慢,不稳定
    CodePush.checkForUpdate('iTat0367SAe9LjUW-VEL1eR4HNp3661d761a-790b-45d4-b5ad-f2bd1ad39f41').then((update) => {
      if (!update) {
        console.log('已是最新版');
      }
      if (update) {
        // Alert.alert("提示","已是最新版本--",[
        //     {text:"Ok", onPress:()=>{
        //         console.log("点了OK");
        //     }}
        // ]);
        console.log('更新');
        CodePush.sync({
          installMode: CodePush.InstallMode.IMMEDIATE,
          deploymentKey: 'iTat0367SAe9LjUW-VEL1eR4HNp3661d761a-790b-45d4-b5ad-f2bd1ad39f41',
          updateDialog: {
            optionalIgnoreButtonLabel: '稍后',
            optionalInstallButtonLabel: '后台更新',
            optionalUpdateMessage: '有新版本了，是否更新？\n',
            title: '更新提示',
            appendReleaseDescription: true,//是否显示更新说明
            descriptionPrefix: '更新说明:',

          },
          installMode: CodePush.InstallMode.IMMEDIATE
        }, null, (pro) => {
          console.log(pro);
        }, null);
      }
    });
  }
  componentDidMount() {
    // this._checkOut();
    //集成jpush跳转到activity
    JPushModule.notifyJSDidLoad((resultCode) => {
    });

    JPushModule.addReceiveOpenNotificationListener((map) => {
      JPushModule.jumpToPushActivity("SecondActivity");
    });

    //适用redux更新状态
    this._fetchData();
  }

  componentWillUnmount() {
    //清除计时器
    this.timer && clearTimeout(this.timer);
    //清除jpush注册的监听时间
    JPushModule.removeReceiveCustomMsgListener(() => console.log('removeReceiveCustomMsgListener'));
    JPushModule.removeReceiveNotificationListener(() => console.log('removeReceiveNotificationListener'));
    JPushModule.removeReceiveOpenNotificationListener(() => console.log('removeReceiveOpenNotificationListener'));
    JPushModule.removeGetRegistrationIdListener(() => console.log('removeGetRegistrationIdListener'));
    JPushModule.clearAllNotifications();

  }

  _fetchData() {
    const { fetchListData } = fetchdataactions
    this.props.dispatch(fetchListData(HomeUrl, 'PRIME'))
  }

  render() {
    if (this.props.status === '0') {
      return (<CustomLoadingView />)
    } else if (this.props.status === '1') {
      return (
        <View>
          <StatusBar
            backgroundColor='#fddb27' />
          <ScrollView showsVerticalScrollIndicator={false}>
            {this._returnSwiper()}
            {this._returnClassifyView()}
            <DayListView dayTitle='今日推荐' dayData={this.props.data.boutiques.boutique} navigation={this.props.navigation} />
            <DayListView dayTitle='今日最新' dayData={this.props.data.news.new} navigation={this.props.navigation} />
            <DayListView dayTitle='今日热门' dayData={this.props.data.rankings.ranking} navigation={this.props.navigation} />
          </ScrollView>
        </View>
      );
    } else if (this.props.status === '-1') {
      return (
        <View style={{ justifyContent: 'center' }}>
          <CustomReLoad
            onClick={() => { this._fetchData() }} />
        </View>
      )
    }
    return (<CustomLoadingView />)
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
    const daySwiperData = this.props.data.carousel_figure;

    var views = daySwiperData.map((item, i) =>
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
  }
}

function mapStoreToProps(store) {
  return {
    status: store.fetch.primePage.status,
    data: store.fetch.primePage.data,
  }
}


export default connect(mapStoreToProps)(Prime);

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

