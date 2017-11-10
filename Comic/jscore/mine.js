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

export default class Mine extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }

  _login() {
    if (this.state.isLogin) { return; }
    this.timer = setTimeout(() => {
      ToastAndroid.show('登录成功', ToastAndroid.SHORT);
      this.setState({ isLogin: true });
    }, 1000);
  }

  componentWillUnMount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const img = this.state.isLogin ? require('../imgs/icon/mine/icon.jpg') : require('../imgs/icon/ic_empty.png');
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
            <Text style={styles.itemTxt}>赏个好评吧</Text>
          </View>
          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/share.png')} />
            <Text style={styles.itemTxt}>分享给好友</Text>
          </View>
          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/forum.png')} />
            <Text style={styles.itemTxt}>求书反馈</Text>
          </View>

          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/weixin.png')} />
            <Text style={styles.itemTxt}>添加关注</Text>
          </View>
          <View style={styles.itemHolder}>
            <Image style={styles.itemImg} source={require('../imgs/icon/mine/chilun.png')} />
            <Text style={styles.itemTxt}>设置</Text>
          </View>
        </View>
      </View >
    );
  }
}
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
    fontSize: 12,
    marginLeft: 15,
  },

});
