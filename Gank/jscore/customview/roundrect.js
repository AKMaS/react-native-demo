import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import propTypes from 'prop-types'
import Colors from '../resources/Colors'
const { width, height } = Dimensions.get('window')
export default class RoundRECT extends Component {
    //属性类型检查
    static propTypes = {
        description: propTypes.string.isRequired,//图标右侧的文字？
        iconName: propTypes.string.isRequired,//图标名称
        iconColor: propTypes.string.isRequired,//图标颜色
        backgroundColor: propTypes.string.isRequired,//图标背景。默认白色
    }
    // 默认属性值
    static defaultProps = {
        // iconName: 'logo-google',
        backgroundColor: '#000000',
        iconColor: '#ffffff'
    }
    render() {
        const { iconColor, backgroundColor, iconName, description } = this.props;
        return (
            <View style={styles.holder}>
                {/* 右侧小图标 */}
                <View style={[styles.roundIcon, { backgroundColor: backgroundColor }]}>
                    <Icon name={iconName} size={16} color={iconColor} />
                </View>
                {/* 文字描述 */}
                <View style={{ flex: 1, }}>
                    <Text style={styles.description}>{description}</Text>
                    <View style={{ height: 0.8, backgroundColor: Colors.lightgray }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    holder: {
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
    },
    roundIcon: {
        width: 20,
        height: 20,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        color: 'black',
    },

})