/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import UserStorage from './userStorage';
import { connect } from 'react-redux';
import UShare from './share/share';
import SharePlatform from './share/sharePlatform';
import ShareDialog from './share/sharedialog'
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
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
    }
  }
  // 第三方登录
  _login() {
    !this.props.isLoggedIn ? this.setState({ isShowModal: true }) : null;
  }
  // 分享
  _shareApp() {
    UShare.share('标题', '内容', 'http://baidu.com', 'http://dev.umeng.com/images/tab2_1.png',
      SharePlatform.QQ, (message) => {
        message: '分享成功、分享失败、取消分享'
      });
  }

  render() {
    const { isLoggedIn, data, status } = this.props
    // const img = this.state.isLogin ? require('../imgs/icon/mine/icon.jpg') : require('../imgs/icon/ic_empty.png');
    const img = isLoggedIn ? { uri: data.userAvatar } : require('../imgs/icon/ic_empty.png');
    const userName = isLoggedIn ? data.userName : '点击头像区登录'
    return (
      <View >
        {/* 头像区 */}
        <TouchableOpacity style={styles.topHolder}
          activeOpacity={1}
          onPress={() => this._login()}>
          <Image style={styles.headerImg} source={img} />
          <View>
            <Text style={styles.headerUsername}>{userName}</Text>
            {/* <Text style={styles.headerUserintru}>点击头像进行登录</Text> */}
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
            <TouchableOpacity style={styles.itemTxt}
              onPress={() => this._shareApp()}>
              <Text >分享</Text>
            </TouchableOpacity>
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
        {/* 登录／分享Modal */}
        <ShareDialog isCanShowModal={this.state.isShowModal} />
      </View >
    );
  }
}

function mapStoreToProps(store) {
  return {
    status: store.login.status,
    isLoggedIn: store.login.isLoggedIn,
    data: store.login.data,
  };
}

export default connect(mapStoreToProps)(Mine);

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

  topHolder: {
    height: 200,
    width: width,
    backgroundColor: '#00C5CD',
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
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
});
