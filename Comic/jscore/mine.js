/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import UserStorage from './userStorage';
import { connect } from 'react-redux';
import { logIn } from './redux/action/loginactions'
class Mine extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/selected/mine_selected.png')}
        /> :
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/normal/mine_normal.png')}
        />
    ),
  }

  _login() {
    !this.props.isLoggedIn ? this.props.dispatch(logIn()) : null;
  }

  render() {
    // const img = this.state.isLogin ? require('../imgs/icon/mine/icon.jpg') : require('../imgs/icon/ic_empty.png');
    const img = this.props.isLoggedIn ? require('../imgs/icon/mine/icon.jpg') : require('../imgs/icon/ic_empty.png');
    return (
      <View >
        {/* 头像区 */}
        <TouchableOpacity style={styles.topHolder}
          activeOpacity={1}
          onPress={() => this._login()}>
          <Image style={styles.headerImg} source={img} />
          <View>
            <Text style={styles.headerUsername}>点击头像进行登录</Text>
            <Text style={styles.headerUserintru}>点击头像进行登录</Text>
          </View>
        </TouchableOpacity>
        {/* 列表区 */}
        <View>
          <View style={styles.itemHolder}>
            <Image
              style={styles.itemImg}
              source={require('../imgs/icon/mine/report.png')} />
            <View style={styles.itemTxt}>
              <Text >赏个好评</Text>
            </View>
          </View>
          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/share.png')} />
            <View style={styles.itemTxt}>
              <Text >分享</Text>
            </View>
          </View>
          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/forum.png')} />
            <View style={styles.itemTxt}>
              <Text >反馈</Text>
            </View>
          </View>

          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/weixin.png')} />
            <View style={styles.itemTxt}>
              <Text >关注</Text>
            </View>
          </View>
          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/chilun.png')} />
            <View style={styles.itemTxt}>
              <Text >设置</Text>
            </View>
          </View>
        </View>
      </View >
    );
  }
}

function mapStoreToProps(store) {
  return {
    status: store.login.status,
    isLoggedIn: store.login.isLoggedIn,
    data: store.login.user,
  };
}

export default connect(mapStoreToProps)(Mine);

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

  topHolder: {
    height: 200,
    width: width,
    backgroundColor: '#616161',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImg: {
    width: 80,
    height: 80,
    marginLeft: 20,
    marginRight: 10,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  headerUsername: {
    color: 'white',
  },
  headerUserintru: {
    color: '#b1b1b1',
    marginTop: 5,
    fontSize: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemHolder: {
    marginTop: 10,
    flexDirection: 'row',
  },
  itemImg: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  itemTxt: {
    marginLeft: 15,
    justifyContent: 'center',
  },
});
