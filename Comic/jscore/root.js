/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { BackHandler, Platform, ToastAndroid } from 'react-native';
import MyStack from './stack';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import configureStore from './redux/store/store';
import SplashScreen from 'react-native-splash-screen'

let { store, persistor } = configureStore();
export default class Root extends Component {

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => this._onBackAndroidPress())
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hanrwareBackPress', () => this._onBackAndroidPress())
  }

  componentDidMount() {
    SplashScreen.hide();
  }
  render() {

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MyStack />
        </PersistGate>
      </Provider>
    );
  }
  _onBackAndroidPress() {
    if (this.lastBackPress && this.lastBackPress + 2000 > Date.now()) {
      BackHandler.exitApp()
    }
    this.lastBackPress = Date.now()
    ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
    return true;
  }
}

