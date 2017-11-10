/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class CustomCollapseText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    }
  }

  render() {
    return (
      <View>
        <Text style={{ width: width }} numberOfLines={this.state.isCollapsed ? 2 : null} >{this.props.text}</Text>
        <TouchableOpacity
          style={{ alignItems: 'flex-end' }}
          onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed })} >
          <Text style={{ color: '#8ee5ee' }}>展开</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
