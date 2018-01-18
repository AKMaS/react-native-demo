import React, { Component } from 'react';
import { Text, TouchableOpacity ,AppRegistry} from 'react-native';
import JPushModule from 'jpush-react-native';

export default class second extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text>skfjsdkfjskfo</Text>
    );
  }
}

AppRegistry.registerComponent('SecondActivity', () => second);

