import React, { Component } from 'react'
import {
    View,
    Image,
} from 'react-native'

const TabIcons = (props) => {
    // console.log(props)
    return (
        <View>
            <Image
                style={{ width: 34, height: 34 }}
                resizeMode='contain'
                source={props.focused ?
                    props.selectedImage : props.normalImage}
            />
        </View>
    )
}
export default TabIcons
