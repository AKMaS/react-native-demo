

react-navigation实现顶部和底部TabNavigator嵌套时，会发生内部内容不显示或者内部导航不能正常滑动，暂时的解决办法是：
外部的导航栏设置属性如下  animationEnabled: false,
                     swipeEnabled: false,
		     scrollEnabled: false,
内部导航栏设置：animationEnabled: true,
             scrollEnabled: false,
并将内部导航栏这样导出： 
//这样暂时解决嵌套滑动的问题
export default class Tab extends Component {
  render() {
    return (
      <TabInHome />
    );
  }
}
