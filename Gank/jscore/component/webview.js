import React, { Component } from 'react'
import {
    View,
    WebView,
    Text,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import CustomNavBar from '../customview/customnavbar'
let gestureHandlers
var startY, endY
export default class WebViewComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        gestureHandlers = {
            onStartShouldSetResponder: (e) => {
                // console.log("start(X,Y):" + e.nativeEvent.pageX + ':' + e.nativeEvent.pageY);
                // console.log("start");
                startY = e.nativeEvent.pageY;
                return true
            },
            onMoveShouldSetResponder: (e) => {
                // console.log("move begin"); 
                return true
            },
            onResponderGrant: (e) => {
                // console.log("grant(X,Y):" + e.nativeEvent.pageX + ':' + e.nativeEvent.pageY);
            },
            onResponderMove: (e) => {
                // console.log("moving");
                // console.log("moving(X,Y):" + e.nativeEvent.pageX + ':' + e.nativeEvent.pageY);
                if (e.nativeEvent.pageY - startY > 60) {
                    ToastAndroid.show('下滑出现NavBar', ToastAndroid.SHORT);
                    console.log('下滑出现NavBar')
                    return;
                }
                if (e.nativeEvent.pageY - startY < 60) {
                    ToastAndroid.show('下推隐藏NavBar', ToastAndroid.SHORT);

                }
            },
            onResponderRelease: (e) => {
                // console.log("release");
                // console.log("release(X,Y):" + e.nativeEvent.pageX + ':' + e.nativeEvent.pageY);
            }
        }
    }
    render() {
        const { data } = this.props;
        return (

            <View style={{ flex: 1 }}  {...gestureHandlers}>
                <CustomNavBar />
                <WebView
                    style={{ flex: 1 }}
                    automaticallyAdjustContentInsets={true}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    source={{ uri: data }}
                />
            </View>
        )
    }

}