/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import SharePlatform from '../share/sharePlatform'
const { width, height } = Dimensions.get('window');
import ShareIcon from './shareicon'

class ShareDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isVisible: this.props.isCanShowModal,
    };
  }
  // nextProps改变,赋值state
  componentWillReceiveProps(nextProps) {

    this.setState({ isVisible: nextProps.isCanShowModal });
  }

  render() {
    return (
      <View >
        {/* 登录／分享Modal */}
        <Modal
          animationType='slide'
          transparent={true}
          style={{ height: 100, width: 300 }}
          visible={this.state.isVisible}
          onRequestClose={() => this._closeDialog()}>
          <TouchableOpacity
            activeOpacity={0}
            style={styles.container} onPress={() => this._closeDialog()} />
          {this._renderDialog()}
        </Modal>
      </View >
    );
  }
  // 关闭
  _closeDialog() {
    this.setState({
      isVisible: false,
    })

  }

  _renderDialog() {
    return (
      <View style={styles.modalStyle}>
        <Text style={styles.dialogTitle}>选择登录方式</Text>
        <View style={{ marginHorizontal: 5, height: 0.5, backgroundColor: 'gray' }}></View>
        {/* 列表 */}
        <View style={{ flexDirection: 'row' }}>
          <ShareIcon platform={SharePlatform.QQ} onClick={() => this._closeDialog()} />
          <ShareIcon platform={SharePlatform.QQZONE} onClick={() => this._closeDialog()} />
          <ShareIcon platform={SharePlatform.SINA} onClick={() => this._closeDialog()} />
        </View>
      </View >
    )
  }
}

export default ShareDialog

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalStyle: {
    position: "absolute",
    top: height - 200,
    left: 0,
    width: width,
    height: 200,
    backgroundColor: '#ffffff'
  },

  dialogTitle: {
    fontSize: 16,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
});