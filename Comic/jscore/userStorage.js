/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

export default class UserStorage extends Component {

  static get(key) {
    return AsyncStorage.getItem(key).then(value => {
      return value;
    });
  }

  static save(key, value) {
    return AsyncStorage.setItem(key, value);
  }

  static delete(key) {
    return AsyncStorage.removeItem(key);
  }

}
