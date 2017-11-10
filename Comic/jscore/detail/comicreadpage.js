/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,

} from 'react-native';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
export default class ComicReadPage extends Component {

  //动态修改更多页面的 导航栏 标题 headerTitle
  // static navigationOptions = ({ navigation }) => ({
  //   headerRight: <Text></Text>,
  //   headerStyle: {
  //     elevation: 0,
  //     height: 50,
  //     backgroundColor: '#fddb27',
  //   },
  //   headerTitleStyle: {
  //     fontSize: 12,
  //     fontWeight: '500',
  //     alignSelf: 'center',
  //   },
  // }) 



  constructor(props) {
    super(props);
    this.state = {
      readData: [],
      order: this.props.navigation.state.params.order,
      horizontal: true,
      modalHelpVisible: false,
      modalFinishVisible: false,
      currentPage: 0,
    };
  }

  componentDidMount() {
    // const title =this.props.navigation
    this._fetchData();
  }

  _fetchData() {
    var { chapter, id } = this.props.navigation.state.params;
    var readUrl = `http://a121.baopiqi.com/api/mh/getCartoonChapter.php?
    number=${chapter[this.state.order - 1].number}&id=${id}&page=0&limit=1000000`;

    fetch(readUrl).then(response => response.json())
      .then(data => this.setState({ readData: data, }))
      .catch(e => console.log(e)).done();
    console.log(readUrl);
  }

  _fetchNextChapter() {

    this.setState({
      order: this.state.order++,
      currentPage: this.state.currentPage - this.state.currentPage,
      modalFinishVisible: false,
    });

    var { chapter, id } = this.props.navigation.state.params;
    var readUrl = `http://a121.baopiqi.com/api/mh/getCartoonChapter.php?
    number=45854&id=${id}&page=0&limit=1000000`;
    console.log(readUrl);
    console.log(this.state.order + '--sss-' + this.state.currentPage);

    fetch(readUrl).then(response => response.json())
      .then(data => this.setState({ readData: data, currentPage: 0, }))
      .catch(e => console.log(e)).done();

    this.refs.myscroll.scrollTo({ y: this.state.currentPage * height });
  }

  render() {

    var views = this.state.readData.map((item, i) =>
      <Image
        key={i}
        resizeMode='cover'
        source={{ uri: item.icon }}
        style={{ width: width, height: height }} />)
    return (
      <View>
        {/* 导航的遮罩 */}
        <Modal
          animationType='none'
          transparent={true}
          onRequestClose={() => this._changeModal()}
          visible={this.state.modalHelpVisible}>
          <TouchableOpacity style={{ flex: 1 }}
            onPress={() => this.setState({ modalHelpVisible: false })}>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between',
              backgroundColor: '#000000', opacity: 0.4
            }}>
              <View style={{ flexDirection: 'row' }}>
                <TextBtn style={styles.textBtn} title='返回' onClick={() => this.props.navigation.goBack()} />
                <Text style={{ fontSize: 20, margin: 5, color: 'white' }}>
                  {this.props.navigation.state.params.title}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextBtn style={styles.textBtn} title='纵向展示' onClick={() => this._changeOri()} />
                <TextBtn style={styles.textBtn} title='帮助' onClick={() => console.log('click the help button')} />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* 漫画区 */}
        {/* <FlatList
          data={this.state.readData}
          keyExtractor={(item) => item.page}
          renderItem={({ item }) => this._renderItem(item)}
          pagingEnabled={true}
          refreshing={false}
          onEndReachedThreshold={0}
          onTouchEnd={() => this.setState({ modalHelpVisible: !this.state.modalHelpVisible })}
          onEndReached={() => this.setState({ modalFinishVisible: true })}
        /> */}

        <ScrollView
          ref='myscroll'

          getItemLayout={(index) => index}
          horizontal={this.state.horizontal}
          onScrollEndDrag={(e) => this._onScrollAnimationEnd(e)}
          onTouchEnd={() => this.setState({ modalHelpVisible: !this.state.modalHelpVisible })}
          pagingEnabled={true}>
          {views}
        </ScrollView>
        {/* 提示 */}
        <Modal
          animationType='none'
          transparent={true}
          onRequestClose={() => this._changeModal()}
          visible={this.state.modalFinishVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ height: height / 5, width: width / 2, backgroundColor: '#ffffff' }}>
              < View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                <TextBtn style={styles.textBtn2} title='返回' onClick={() => this.props.navigation.goBack()} />
                <TextBtn style={styles.textBtn2} title='继续下一章' onClick={() => this._fetchNextChapter()} />
              </View>
            </View>
          </View>
        </Modal >
      </View >
    );
  }

  _renderItem(item) {
    return (
      <Image
        resizeMode='cover'
        style={{ width: width, height: height }}
        source={{ uri: item.icon }} />
    );
  }

  _goToNextChapter() {


  }

  _changeModal() {
    this.setState({ modalHelpVisible: false, modalFinishVisible: false });
  }

  _changeOri() {
    //改变scrollview 方向
    this.setState({ modalHelpVisible: false, horizontal: !this.state.horizontal });
    //跳转到改变方向前的页码
    this.timmer = setTimeout(() => this.state.horizontal ? this.refs.myscroll.scrollTo({ x: (this.state.currentPage) * width }) :
      this.refs.myscroll.scrollTo({ y: this.state.currentPage * height }), 100);
  }

  _onScrollAnimationEnd(e) {
    if (this.state.horizontal) {
      // 求出当前的页码
      var currentPage = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
      this.setState({
        currentPage: currentPage,
      });
      console.log(this.state.currentPage + '---' + this.state.readData.length);
      // if (this.state.currentPage === this.state.readData.length - 1) {
      if (this.state.currentPage === 2) {
        console.log('看完这张了');
        this.setState({ modalFinishVisible: true, });
      }
    } else {
      // 求出当前的页码
      var currentPage = Math.round(e.nativeEvent.contentOffset.y / e.nativeEvent.layoutMeasurement.height);
      this.setState({
        currentPage: currentPage,
      });
    }
  }
}

export class TextBtn extends Component {
  // { fontSize: 20, margin: 5, color: 'white' }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}>
        <Text style={this.props.style}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textBtn: {
    fontSize: 20,
    margin: 5,
    color: 'white'
  },
  textBtn2: {
    fontSize: 18,
    margin: 5,
    color: 'black'
  },
});

