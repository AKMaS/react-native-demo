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
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CustomImg from './customImg';

export default class CustomList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FlatList
        style={{ width: 400, marginTop: 10, marginBottom: 5, backgroundColor: '#ffffff' }}
        renderItem={({ item }) => this._renderItem(item)}
        data={this.props.dayData}
        ListHeaderComponent={() => this._renderHeader()}
        keyExtractor={(item) => item.id}
        numColumns={3}
        horizontal={false}
      />
    );
  }
  _renderHeader() {
    return (
      <View style={styles.listheader}>
        <Text style={[styles.headerTitle, { flex: 1 }]}>{this.props.dayTitle}</Text>
        <CustomBtn
          text='更多'
          img={require('../../../imgs//icon/more.png')}
          onClick={() => this.props.navigation.navigate('MoreItems', { title: this.props.dayTitle })}
        />
      </View >
    );
  }
  _renderItem(item) {
    return (
      <View style={styles.comic}>
        <CustomImg style={styles.comicIcon} img={{ uri: item.icon }} />
        <Text style={styles.comicTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.comicAuthor} numberOfLines={1}>{item.author}</Text>
      </View>
    );
  }
}
export class CustomBtn extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => this.props.onClick()}>
        <Text style={styles.headerTitle}>更多</Text>
        <Image resizeMode='cover' style={{ width: 25, height: 25 }} source={require('../../../imgs//icon/more.png')} />
      </TouchableOpacity>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  listheader: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  comic: {
    width: width / 3,
    justifyContent: 'space-between',
    marginLeft: 5,
  },

  comicIcon: {
    width: width / 3 - 10,
    height: 200,
  },
  comicTitle: {
    fontSize: 10,
  },
  comicAuthor: {
    fontSize: 8,
  },
});