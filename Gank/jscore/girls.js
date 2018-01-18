
/**
 * 使用 AutoResponisve 和VirtualizedList实现瀑布流式布局
 * 可能由于是 ‘使用AutoResponisve包裹的布局’作为VirtualizedList的一个‘Item’存在，所以要设置VirtualizedList的getItemCount=1。
 * 否则为出现重复
 * 还存在性能问题...
 * 使用modal实现点击查看大图
 * */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    VirtualizedList,
    Dimensions,
    Image,
    ToastAndroid,
    TouchableOpacity,
    Modal,
    BackHandler,
    Platform,
    AppConfig
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import AutoResponisve from 'autoresponsive-react-native';
const GirlsUrl = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/';
const { width, height } = Dimensions.get('window');
export default class Girls extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            girlData: [],
            refresh: false,
            page: 1,
            first: true,
            isModalVisible: false,
            modalImg: ''
        }
    }
    componentDidMount() {
        this._fetchData()
        if (Platform.OS === 'android')
            BackHandler.addEventListener('hardwareBackPress', () => {
                // this.setState({ isModalVisible: false })
                console.log('backPressed')
                return true;
            });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            this.setState({ isModalVisible: false })
            console.log('backPressed')
            return true;
        });
    }

    _renderImageItem(data) {
        return data.map((item, i) => {
            let imgHeight, imgWidth
            // 根据下标设置不同的高度
            imgHeight = i % 3 === 0 ? 200 : 300
            imgWidth = width / 2 - 20
            return (
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.5}
                    onPress={() => this._onClick(item)}
                    style={{
                        height: imgHeight,
                        width: imgWidth,
                    }}>
                    <Image
                        style={{
                            height: imgHeight,
                            width: imgWidth,
                        }}
                        source={{ uri: item.url + `?imageView2/1/h/${imgHeight}/w/${Math.ceil(imgWidth)}` }} />
                </TouchableOpacity>
            )
        });
    }
    render() {
        return (
            <View
                style={{ flex: 1, }}>
                <VirtualizedList
                    keyExtractor={(item, index) => index}//必须的？
                    getItemCount={() => 1}//必须的？
                    getItem={(data, i) => data[i]}//必须的？
                    renderItem={() => this._renderItem()}
                    data={this.state.girlData}
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.refresh}
                    onEndReached={() => this._fetchMoreData()}
                    onEndReachedThreshold={1}
                />
                <Modal
                    visible={this.state.isModalVisible}
                    animationType='fade'
                    onRequestClose={() => this.setState({ isModalVisible: false })}
                    onShow={() => console.log('onShow')}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            console.log('close')
                            this.setState({ isModalVisible: false })
                        }
                        }
                        onLongPress={() => {
                            console.log('stored')
                            this._downloadImg(this.state.modalImg)
                            // this.setState({ isModalVisible: false })
                        }}
                    >
                        <Image
                            style={{ width: width, height: height }}
                            source={{ uri: this.state.modalImg }}
                        />
                    </TouchableOpacity>
                </Modal>
            </View >
        );
    }
    _renderItem() {
        return (
            <AutoResponisve itemMargin={10}
                style={{ height: height }}>
                {this._renderImageItem(this.state.girlData)}
            </AutoResponisve>
        )
    }
    _fetchMoreData() {
        this._fetchData()
    }
    _onRefresh() {
        this._fetchData(1)
    }
    // page==1刷新
    _fetchData(page) {
        if (page == 1) {
            this.setState({
                refresh: true,
                loadMore: false
            })
            fetch(GirlsUrl + this.state.page)
                .then(response => response.json())
                .then(data => this.setState({
                    girlData: data.results,
                    refresh: false,
                    loadMore: false,
                }))
        } else {
            if (this.state.first) {
                this.setState({ first: false })
                return
            }

            this.setState({
                refresh: false,
                loadMore: true,
                page: this.state.page + 1,
            })
            fetch(GirlsUrl + this.state.page)
                .then(response => response.json())
                .then(data => this.setState({
                    girlData: this.state.girlData.concat(data.results),
                    refresh: false,
                    loadMore: false,
                }))
            console.log('meizi:' + this.state.girlData.length)

        }

    }
    _onClick(item) {
        this.setState({
            isModalVisible: true,
            modalImg: item.url
        })
    }
    _downloadImg(url) {
        let fielname = url.substring(url.lastIndexOf('/'))
        let path = RNFetchBlob.fs.dirs.DCIMDir + '/gank/' + fielname
        RNFetchBlob
            .config({ filecache: true, path: path })
            .fetch('GET', url)
            .then((res) => {
                ToastAndroid.show('stored succeed filepath:' + res.path(), ToastAndroid.SHORT)
            })
            .catch(e => console.log('stored failed err:' + e))
    }
}

