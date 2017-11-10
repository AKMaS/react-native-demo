/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  WebView,
  Animated,
  Dimensions,
} from 'react-native';

export default class InfoDetailPage extends Component {
  //动态修改更多页面的 导航栏 标题 headerTitle
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Text></Text>,
    // headerTitle: navigation.state.params.title,
    headerTitle: <Animated.Text numberOfLines={1}>{navigation.state.params.title}</Animated.Text>,
    headerStyle: {
      elevation: 0,
      height: 50,
      backgroundColor: '#fddb27',
      // backgroundColor:'transparent',
    },
    headerTitleStyle: {
      fontSize: 12,
      fontWeight: '500',
      alignSelf: 'center',
    },
  })

  constructor(props) {
    super(props);
  }

  render() {

    const { title, id } = this.props.navigation.state.params;
    return (
      <View style={{ width: width, height: height, }}>

        <WebView
          style={{ flex: 1 }}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
          automaticallyAdjustContentInsets={true}
          source={{ uri: `http://manhua007.com/index.php/Index/zxdetail1/id/${id}.html` }}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
