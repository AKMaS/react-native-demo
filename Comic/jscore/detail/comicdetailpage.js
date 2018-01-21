/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  WebView,
  Animated,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import CollectBookActions from '../redux/action/collectbookactions'
import CustomLoadingView from '../inhome/customview/customLoadingview';
import CustomReLoad from '../inhome/customview/customReLoad';
import CustomCollapseText from '../inhome/customview/customcollapseText';
// 导入native module
import Jump2ReadPage from '../nativemodules/jump2readpage';
// 漫画详情页接口
const Comic_DetailUrl = 'http://a121.baopiqi.com/api/mh/getCartoonInfo.php?id=';

class ComicDetailPage extends Component {
  //动态修改更多页面的 导航栏 标题 headerTitle
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Text></Text>,
    headerTitle: navigation.state.params.title,
    // headerTitle: <Animated.Text numberOfLines={1}>{navigation.state.params.title}</Animated.Text>,
    headerStyle: {
      elevation: 0,
      height: 50,
      backgroundColor: '#fddb27',
    },
    headerTitleStyle: {
      fontSize: 12,
      fontWeight: '500',
      alignSelf: 'center',
    },
  })

  constructor(props) {
    super(props);
    this.state = {
      detailData: {},
      detailcomic: [],
      loading: '0',
    }
    console.log(this.props)
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    fetch(Comic_DetailUrl + this.props.navigation.state.params.id)
      .then((response) => response.json())
      .then(data => this.setState({ detailData: data, detailcomic: data.chapter, loading: '1' }))
      .catch(e => this.setState({ loading: '-1' })).done();
  }

  _renderItem(item) {
    return (
      <TouchableOpacity style={{ flex: 1 }}
        onPress={() => this._navigate2ReadPage(item.number, item.name)}>
        <Text style={styles.listItemStyle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  _navigate2ReadPage(index, name) {

    // 跳转到React Native的阅读详情页，不会做
    // this.props.navigation.navigate('ComicRead', {
    //   chapter: this.state.detailcomic,
    //   id: this.state.detailData.id,
    //   order: page,
    // });
    let readurl = `http://a121.baopiqi.com/api/mh/getCartoonChapter.php?number=${index}&id=${this.props.navigation.state.params.id}&page=0&limit=1000000`;
    // 试试跳转到Native
    Jump2ReadPage.just2ReadPage(readurl, name);
  }

  render() {
    console.log(this.state.loading)
    if (this.state.loading === '0') {
      return <CustomLoadingView />
    } else if (this.state.loading === '1') {
      // { id, name,icon }
      const comic = {
        id: this.props.navigation.state.params.id,
        name: this.state.detailData.name,
        icon: this.state.detailData.icon,
        status: true,
      }
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {/* 头部封面 */}
          <View style={{ flexDirection: 'row', backgroundColor: '#fddb27' }}>
            <Image style={{ width: 100, height: 120 }} source={{ uri: this.state.detailData.icon }} />
            {/* 头部标题 */}
            <View style={{ marginLeft: 6 }}>
              <Text style={{ color: 'black', fontSize: 20, marginTop: 5 }}>{this.state.detailData.name}</Text>
              <Text style={{ color: '#6699ff', fontSize: 12, marginTop: 5 }}>{this.state.detailData.author}</Text>
              <Text style={{ fontSize: 12, marginTop: 5 }}>{this.state.detailData.state}</Text>
              {/* 开始阅读按钮 */}
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity
                  onPress={() => this._navigate2ReadPage(1)}>
                  <Text style={{ marginTop: 5, backgroundColor: '#66cc99' }}>开始阅读</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._add2BookSheet(comic)}>
                  <Text style={{ marginTop: 5, backgroundColor: '#66cc99', marginLeft: 10 }}>收藏</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* 简介 */}
          <View>
            <Text>作品简介</Text>
            <CustomCollapseText text={this.state.detailData.introduction} />
          </View>
          {/* 分割线 */}
          <Text style={styles.separateLine}> </Text>
          {/*目录 */}
          <View style={styles.menuHolder}>
            <Text style={{ color: 'black', fontSize: 20 }}>目录</Text>
            <TouchableOpacity style={{ alignSelf: 'flex-end', }} onPress={() => this.setState({ detailcomic: this.state.detailcomic.reverse() })}>
              <Text style={{ fontSize: 14, }}>倒序查看</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.separateLine} />
          <FlatList
            style={{ marginTop: 2 }}
            data={this.state.detailData.chapter}
            numColumns={2}
            horizontal={false}
            keyExtractor={item => item.order}
            renderItem={({ item }) => this._renderItem(item)} />
        </View >
      );
    } else {
      return (
        <View style={{ justifyContent: 'center' }}>
          <CustomReLoad
            onClick={() => { this._fetchData(); this.setState({ loading: '0' }) }} />
        </View>)
    }
  }
  _add2BookSheet(comic) {

    this.props.dispatch(CollectBookActions(comic))
  }
}

function mapStoreToProps(store) {
  console.log('xxxxxxxx')
  console.log(store.collected)
  return {
    collected: store.collected,
  };
}

export default connect(mapStoreToProps)(ComicDetailPage)

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  listItemStyle: {
    margin: 5,
    height: 30,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 15,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  separateLine: {
    backgroundColor: '#e9e9ef',
    height: 1,
    width: width
  },
  menuHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },

});