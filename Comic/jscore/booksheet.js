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
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  DatePickerAndroid,
  Linking,
  Alert
} from 'react-native';
import { connect } from 'react-redux';


class BookSheet extends Component {
  static navigationOptions = {
    tabBarLabel: '书架',
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/selected/booksheet_selected.png')}
        /> :
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/normal/booksheet_normal.png')}
        />
    ),
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps:' + nextProps.isLoggedIn)
    if (nextProps.isLoggedIn) {
      return true
    }
    return false
  }

  render() {
    const { isLoggedIn } = this.props
    console.log('booksheet' + isLoggedIn)
    if (!isLoggedIn) {
      Alert.alert('请先登录', '',
        [{
          text: '确定', onPress: () =>
            this.props.navigation.navigate('Mine')
        }]
      )
      return (
        <View>
          <Text>登录 </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>登录成功</Text>
        </View>
      )
    }


  }
}

function mapStoreToProps(store) {
  return {
    status: store.login.status,
    isLoggedIn: store.login.isLoggedIn,
    data: store.login.user,
  };
}


export default connect(mapStoreToProps)(BookSheet);

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  tabicon: {
    width: 60,
    height: 60,
  },
});
