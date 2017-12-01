
不知名笔记啊
===========
在react-native中使用[react-navigation](https://reactnavigation.org)时，如果要实现顶部和底部TabNavigator嵌套时，可能会发生内部内容不显示或者内部导航不能正常滑动等状况，暂时的解决办法是：
### 第一步
外部的导航栏设置属性如下:`animationEnabled: false,swipeEnabled: false,scrollEnabled: false,`
```javascript
{
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: true,
    backBehavior: 'none',
    tabBarOptions: {
      showIcon: true,
      iconStyle: { height: 30, width: 30 },
      scrollEnabled: false,
      style: { width: width, backgroundColor: 'white' },
      labelStyle: { color: 'black', fontSize: 10, marginBottom: -2 },
      indicatorStyle: {
        height: 0
      },
    }
```
### 第二步
内部导航栏设置:`animationEnabled: true,scrollEnabled: false,`
```javascript
const TabInHome = TabNavigator({
  PrimeTab: {
    screen: Prime,
  },
  RankingTab: {
    screen: Ranking,
  },
  RecommendTab: {
    screen: Recommend,
  },
  VipTab: {
    screen: Vip,
  }
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      scrollEnabled: false,
      style: { backgroundColor: '#fddb27' },
      labelStyle: { color: 'black', fontSize: 10, marginBottom: -2 },
      indicatorStyle: {
        height: 10
      },
    },
  });
```
并将内部导航栏这样导出： 
```javascript
export default class Tab extends Component {
  render() {
    return (
      <TabInHome />
    );
  }
}
```
