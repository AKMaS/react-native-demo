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

    if (nextProps.isLoggedIn) {
      return true
    }
    return false
  }

  render() {
    const { isLoggedIn, collected } = this.props

    if (!isLoggedIn) {
      Alert.alert('请先登录', '',
        [{
          text: '确定', onPress: () =>
            this.props.navigation.navigate('Mine')
        }]
      )
      return (
        <View>
          <Text>未登录 </Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={{ width: 500, height: 500 }}>
          {this._renderCollectedItem()}
        </ScrollView>
      )
    }
  }
  _renderCollectedItem() {
    const { collected } = this.props

    console.log(collected)
    // return (
    //   collected.data.map((item, i) =>
    //     <View style={styles.comicHolder} key={i}>
    //       <Image style={styles.comicIcon} source={{ uri: item.icon }} />
    //       <Text>{item.name}</Text>
    //     </View>
    //   )
    // )

  }
}

function mapStoreToProps(store) {
  // console.log('mapStoreToProps')
  // console.log(store.collected)
  return {
    status: store.login.status,
    isLoggedIn: store.login.isLoggedIn,
    data: store.login.user,
    collected: store.collected,
  };
}

export default connect(mapStoreToProps)(BookSheet);

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  tabicon: {
    width: 60,
    height: 60,
  },
  comicHolder: {
    margin: 5,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  comicIcon: {
    width: 100,
    height: 160,
  },
});
