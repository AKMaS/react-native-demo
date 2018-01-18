import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ImageBackground,
    StyleSheet,
} from 'react-native'
import Images from '../resources/Images'
import Colors from '../resources/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import RoundRECT from '../customview/roundrect'

//抽屉里的内容写在这里      
export default class DrawerComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* user-profile */}
                <ImageBackground
                    source={Images.Drawer_header}
                    style={styles.drawer_header}>
                    <Image
                        style={styles.drawer_userprofile}
                        source={Images.user_profile} />
                </ImageBackground>
                <View style={styles.drawer_holder}>
                    {/* action-button */}
                    <View style={styles.drawer_menuHolder}>
                        <RoundRECT iconName='md-menu' backgroundColor={Colors.lightBlue}
                            description='首页内容展示顺序' />
                        <RoundRECT iconName='md-color-palette' backgroundColor={Colors.orangeRed}
                            description='主题颜色' />
                        <RoundRECT iconName='md-moon' backgroundColor={Colors.purple}
                            description='夜间模式' />
                    </View >
                    <View style={styles.drawer_menuHolder}>
                        <RoundRECT iconName='md-text' backgroundColor={Colors.limeGreen} description='反馈' />
                        <RoundRECT iconName='md-share' backgroundColor={Colors.orange} description='分享' />
                    </View>
                </View>
                {/*appVersion&thanks*/}
                <Text style={styles.drawer_version}>version:0.0.1</Text>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    drawer_holder: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    drawer_header: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawer_menuHolder: {
        marginTop: 10,
        backgroundColor: 'white'
    },

    drawer_userprofile: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    drawer_item: {
        flexDirection: 'row',
    },
    drawer_version: {
        marginLeft: 10,
        color: Colors.lightgray,
    }
})
