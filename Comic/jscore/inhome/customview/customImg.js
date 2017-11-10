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
  TouchableOpacity,
} from 'react-native';

export default class CustomImg extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this._onClick()}>
        <Image
          style={this.props.params.style}
          source={require('../../../imgs/icon/ic_empty.png')}>
          <Image
            style={this.props.params.style}
            source={this.props.params.img} />
        </Image>
      </TouchableOpacity >
    );
  }
  _onClick() {
    this.props.params.navigation.navigate('ComicDetail', { title: '漫画介绍', id: this.props.params.id });
  }
}