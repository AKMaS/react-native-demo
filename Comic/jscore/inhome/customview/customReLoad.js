/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';



export default class CustomReLoad extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={() => this.props.onClick()}>
        <Image resizeMode='cover' style={{ width: 120, height: 140 }} source={require('../../../imgs/icon/ic_err.png')} />
        <Text style={styles.headerTitle}>重新加载</Text>
      </TouchableOpacity>
    );
  }
}
const  styles = StyleSheet.create({
  headerTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
});



