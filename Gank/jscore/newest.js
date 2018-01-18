
import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux'

import Colors from './resources/Colors'
const newGank = 'http://gank.io/api/data/all/20/1'
export default class ContentPage extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            newData: [],
        }
    }
    componentDidMount() {
        this._fetchData()
    }
    render() {
        return (
            <View>
                <Text>{this.state.newData.length}</Text>
                <FlatList
                    data={this.state.newData}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => this._renderItem(item)}
                />
            </View>
        );
    }
    _renderItem(item) {
        return (
            // Item 容器
            <TouchableOpacity style={{ backgroundColor: 'white', marginLeft: 2, marginRight: 2, marginBottom: 5 }}
                onPress={() => this._onCLick(item)} >
                {/* 描述 */}
                <Text style={{ color: 'black', fontSize: 14 }}>{item.desc}</Text>
                {/* 类型 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10, backgroundColor: Colors.orange }}>{item.type}</Text>
                    <Text style={{ fontSize: 10 }}>{item.who}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _fetchData() {
        fetch(newGank)
            .then(response => response.json())
            .then(data => this.setState({
                newData: data.results,
            }))
            .catch(e => console.log('fetchData:' + e))
    }
    _onCLick(item) {
        Actions.jump('webview', item.url);
    }
}



