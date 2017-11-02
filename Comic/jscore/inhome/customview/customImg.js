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
} from 'react-native';

export default class CustomImg extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        style={this.props.style}
        source={require('/Users/king/Documents/workspace/reactnative/Comic/imgs/icon/ic_empty.png')}>
        <Image
          style={this.props.style}
          source={this.props.img} />
      </Image>
    );
  }
}