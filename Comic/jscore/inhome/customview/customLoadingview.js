/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

export default class CustomLoadingView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ alignItems: 'center', }}>
        <ActivityIndicator
          animating={this.props.animating}
          size={50} />
        <Text>加载中...</Text>
      </View >
    );
  }
}