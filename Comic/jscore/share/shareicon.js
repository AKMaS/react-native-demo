/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import UShare from '../share/share'
import { connect } from 'react-redux';
import SharePlatform from '../share/sharePlatform'
import { _logInSucc } from '../redux/action/loginactions';

class ShareIcon extends Component {
  render() {
    switch (this.props.platform) {
      case SharePlatform.QQ:
        var img = require('../../imgs/icon/shareicon/umeng_socialize_qq.png')
        break;
      case SharePlatform.QQZONE:
        var img = require('../../imgs/icon/shareicon/umeng_socialize_qzone.png')
        break;
      case SharePlatform.SINA:
        var img = require('../../imgs/icon/shareicon/umeng_socialize_sina.png')
        break;
    }
    return (
      <TouchableOpacity
        style={styles.imageHolder}
        onPress={() => this._onClickShare()}>
        <Image
          style={styles.image} resizeMode='contain'
          source={img} />
      </TouchableOpacity>
    )
  }
  _onClickShare() {
    this.props.onClick();
    const platform = this.props.platform;
    /*** 第三方登录
           * 参数：登录平台、登录结果回调
           * 结果参数:'userId: ' 用户id
                     'accessToken: token
                     'userName: ' 用户昵称
                     'userGender: ' 用户性别
                     'userAvatar: ' 用户头像
    */
    UShare.authLogin(platform, (result) => {
      // code: 0成功、1失败、2取消
      console.log(result)
      if (result.code === 0) {
        this.props.dispatch(_logInSucc({
          userName: result.userName,
          userAvatar: result.userAvatar
        }))
      } else {
        ToastAndroid.show('登录失败', ToastAndroid.SHORT);
      }
    });
  }
}

export default connect()(ShareIcon);

const styles = StyleSheet.create({
  imageHolder: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8
  },
});