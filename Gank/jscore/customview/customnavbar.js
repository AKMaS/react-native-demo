import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
export default class CustomNavBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                height: 40,
            }}>
                <Icon name='md-arrow-back' size={30} onPress={() => Actions.pop()} />
                <Icon name='md-more' size={30} />
            </View>
        )
    }

}