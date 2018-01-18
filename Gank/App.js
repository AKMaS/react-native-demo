/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image,
  Dimensions
} from 'react-native';
import {
  Scene,
  Router,
  Drawer,
  Stack,
  Tabs,
  Text,
  Overlay,
} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import Images from './jscore/resources/Images'
import DrawerCom from './jscore/component/Drawer'
import TabIcons from './jscore/component/TabIcon'
import Newest from './jscore/newest'
import Search from './jscore/search'
import Girls from './jscore/girls'
import WebView from './jscore/component/webview'
import CustomNavBar from './jscore/customview/customnavbar'

const { width, height } = Dimensions.get('window');
class App extends Component {
  render() {

    return (
      <Router

      >
        <Scene key='root'>
          {/* 抽屉 */}
          <Drawer
            hideNavBar
            key='drawer' //唯一标识
            contentComponent={DrawerCom}//抽屉内布局
            // hideDrawerButton={true}
            drawerIcon={<Icon name='md-menu' size={30} />}
            drawerWidth={width * 2 / 3}
            drawerOpenRoute='DrawerOpen' //maybe these 3 are missing so the problem
            drawerCloseRoute='DrawerClose'
            drawerToggleRoute='DrawerToggle'
          >
            <Scene  >
              < Tabs
                hideNavBar
                key='tabbar' //唯一标识
                icon={TabIcons} //自定义的tabicon显示方式
                tabBarPosition='bottom' //自定义tabBar的位置，默认android  顶部
                showLabel={true} //是否显示文字
                lazy={true} >
                {/* <Scene key='new' component={Start}
                  normalImage={Images.Home_Normal}
                  selectedImage={Images.Home_Selected} />
                <Scene key='test' component={Test}
                  normalImage={Images.Hot_Normal}
                  selectedImage={Images.Hot_Selected} /> */}
                <Scene key='newest' component={Newest}
                  tabBarLabel='最新' hideNavBar={true}
                />
                <Scene key='search' component={Search}
                  hideNavBar={true}
                  tabBarLabel='搜索'
                />
                <Scene key='girls' component={Girls}
                  hideNavBar={true}
                  tabBarLabel='妹子图' />
              </Tabs >
            </Scene>
          </Drawer>
          {/* 公共的WebView */}
          <Scene key='webview' component={WebView}
            hideNavBar={true} />
        </Scene>
      </Router >
    );
  }
  _onMenuClick() {
    console.log('right menu clicked')
  }
}

AppRegistry.registerComponent('Gank', () => App);

