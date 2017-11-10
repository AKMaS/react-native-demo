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
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';


export default class BookSheet extends Component {
  static navigationOptions = {
    tabBarLabel: '书架',
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/selected/booksheet_selected.png')}
        /> :
        <Image
          resizeMode='center'
          source={require('../imgs/icon/tabicon/normal/booksheet_normal.png')}
        />

    ),
  }

  constructor(props) {
    super(props);
    this.state = {
      readData: [],
      modalFinishVisible: false,
      modalHelpVisible: false,
    }
  }
  componentDidMount() {
    // const title =this.props.navigation
    this._fetchData();
  }

  _fetchData() {

    var readUrl = 'http://a121.baopiqi.com/api/mh/getCartoonChapter.php?number=45856&id=485&page=0&limit=1000000';
    fetch(readUrl).then(response => response.json())
      .then(data => this.setState({ readData: data, }))
      .catch(e => console.log(e)).done();
  }

  render() {
    return (


      <View>
        <FlatList
          data={this.state.readData}
          keyExtractor={(item) => item.page}
          renderItem={({ item }) => this._renderItem(item)}
          pagingEnabled={true}
          refreshing={false}
          horizontal={true}
          onEndReachedThreshold={0}
          initialNumToRender={1}
          getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
          onEndReached={(distanceFromEnd) => {
            this.setState({ modalFinishVisible: true });
            console.log(distanceFromEnd)
          }}
        />

        <Modal
          animationType='none'
          transparent={true}
          onRequestClose={() => this._changeModal()}
          visible={this.state.modalFinishVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ height: height / 5, width: width / 2, backgroundColor: '#ffffff' }}>
              < View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text>sdfskskljfsk</Text>
              </View>
            </View>
          </View>
        </Modal >
      </View>
    );
  }
  _changeModal() {
    this.setState({ modalHelpVisible: false, modalFinishVisible: false });
  }
  _renderItem(item) {
    return (
      <Image
        style={{ width: width / 2, height: height / 2 }}
        source={{ uri: item.icon }} />
    );
  }
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  tabicon: {
    width: 60,
    height: 60,
  },
});
