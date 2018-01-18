
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default class Search extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyWord: '',
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>搜索界面</Text>
                {/* 搜索框 */}
                <View style={{
                    flexDirection: 'row', height: 48,
                    alignItems: 'center',
                    paddingRight: 5,
                    paddingLeft: 5,
                    justifyContent: 'space-around', backgroundColor: 'red'
                }}>
                    {/* AppIcon */}
                    <Image style={{
                        width: 64,
                        height: 24,
                        resizeMode: 'center'
                    }}
                        source={require('../imgs/tabicons/normal/mine_normal.png')} />
                    {/* 组合搜索框 */}
                    <View style={{
                        flexDirection: 'row',
                        height: 40,
                        flex: 1,
                        borderRadius: 5,
                        backgroundColor: 'white'
                    }}>
                        <Icon name='md-search' size={30}
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft: 6,
                            }} />
                        <TextInput
                            placeholder='你，想要得到什么?'
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                this.setState({
                                    searchKeyWord: text,
                                })
                            }}
                            onsubmitEditing={() => this._googleIt()}
                            style={{
                                flex: 1,
                                marginLeft: 6,
                                padding: 0,
                                marginRight: 12,
                                fontSize: 14,
                            }} />
                    </View>
                </View>
            </View>
        );
    }

    _googleIt() {

    }
}

